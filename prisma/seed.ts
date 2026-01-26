// Load dotenv first, before any Prisma imports
// import { config } from "dotenv";
// config({ path: ".env" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
import { randomBytes, scrypt } from "crypto";

// Create Prisma client for seeding
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

export const db = new PrismaClient({ adapter });
// Hash password function (matching Better Auth's format)
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const N = 16384; // cost factor (2^14)
  const r = 8; // block size
  const p = 1; // parallelization

  // Use scrypt with callback (matching src/lib/password.ts)
  const hash = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N, r, p }, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });

  // Better Auth format: $scrypt$N$r$p$salt$hash
  const saltBase64 = salt.toString("base64");
  const hashBase64 = hash.toString("base64");

  return `$scrypt$${N}$${r}$${p}$${saltBase64}$${hashBase64}`;
}

async function main() {
  console.log("🌱 Seeding database...");

  // Check if admin already exists
  const existingAdmin = await db.user.findUnique({
    where: { email: "admin@gastop.com" },
    include: { accounts: true },
  });

  if (existingAdmin) {
    // Check if account has correct providerId
    const credentialAccount = existingAdmin.accounts.find(
      (acc: { providerId: string }) => acc.providerId === "credential"
    );

    if (!credentialAccount) {
      // Check if there's an account with wrong providerId
      const wrongAccount = existingAdmin.accounts.find(
        (acc: { providerId: string }) => acc.providerId === "email"
      );

      if (wrongAccount) {
        // Update the account to use correct providerId and password hash
        console.log("🔧 Fixing account providerId and password hash...");
        const passwordHash = await hashPassword("admin123");
        await db.account.update({
          where: { id: wrongAccount.id },
          data: {
            providerId: "credential",
            password: passwordHash,
          },
        });
        console.log("✅ Account fixed!");
        return;
      } else {
        // Create missing credential account
        console.log("🔧 Creating missing credential account...");
        const passwordHash = await hashPassword("admin123");
        const accountId = randomBytes(16).toString("hex");
        await db.account.create({
          data: {
            id: accountId,
            accountId: existingAdmin.email,
            providerId: "credential",
            userId: existingAdmin.id,
            password: passwordHash,
          },
        });
        console.log("✅ Credential account created!");
        return;
      }
    }

    // Check if password hash is in correct format (starts with $scrypt$)
    if (
      credentialAccount.password &&
      !credentialAccount.password.startsWith("$scrypt$")
    ) {
      console.log("🔧 Fixing password hash format...");
      const passwordHash = await hashPassword("admin123");
      await db.account.update({
        where: { id: credentialAccount.id },
        data: { password: passwordHash },
      });
      console.log("✅ Password hash fixed!");
      return;
    }

    console.log("✅ Admin user already exists with correct account");
    return;
  }

  // Create admin user
  try {
    // Generate a unique ID for the user
    const userId = randomBytes(16).toString("hex");

    // Hash the password using scrypt (Better Auth format)
    const passwordHash = await hashPassword("admin123");

    // Create user in database
    const user = await db.user.create({
      data: {
        id: userId,
        email: "admin@gastop.com",
        name: "Admin User",
        emailVerified: true,
        role: "admin",
      },
    });

    // Create account with password
    const accountId = randomBytes(16).toString("hex");

    await db.account.create({
      data: {
        id: accountId,
        accountId: user.email,
        providerId: "credential",
        userId: user.id,
        password: passwordHash,
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@gastop.com");
    console.log("🔑 Password: admin123");
    console.log("⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });