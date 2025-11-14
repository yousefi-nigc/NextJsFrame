import { db } from "./db";
import { randomBytes } from "crypto";
import { hashPassword } from "./password";

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists",
      };
    }

    // Generate a unique ID for the user
    const userId = randomBytes(16).toString("hex");
    
    // Hash the password using scrypt (Better Auth format)
    const passwordHash = await hashPassword(password);
    
    // Create user in database
    const user = await db.user.create({
      data: {
        id: userId,
        email,
        name,
        emailVerified: false,
        role: "user",
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

    return { success: true, user };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "admin";
}

