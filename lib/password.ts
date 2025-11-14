import { randomBytes, scrypt } from "crypto";

/**
 * Hash password using scrypt (matching Better Auth's format)
 * Better Auth uses Node.js native scrypt with these default parameters
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const N = 16384; // cost factor (2^14)
  const r = 8; // block size
  const p = 1; // parallelization

  // Use scrypt with callback
  const hash = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N, r, p }, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });

  // Better Auth format: $scrypt$N$r$p$salt$hash
  // Using base64 encoding for salt and hash
  const saltBase64 = salt.toString("base64");
  const hashBase64 = hash.toString("base64");

  // Format: $scrypt$N$r$p$salt$hash
  return `$scrypt$${N}$${r}$${p}$${saltBase64}$${hashBase64}`;
}

/**
 * Verify password against a hash (compatible with Better Auth format)
 * @param data - Object containing password and hash to verify against
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyHash(data: {
  password: string;
  hash: string;
}): Promise<boolean> {
  try {
    const { password, hash } = data;
    
    // Parse the hash string: $scrypt$N$r$p$salt$hash
    const parts = hash.split("$");
    
    if (parts.length !== 7 || parts[1] !== "scrypt") {
      throw new Error("Invalid hash format");
    }
    
    const N = parseInt(parts[2], 10);
    const r = parseInt(parts[3], 10);
    const p = parseInt(parts[4], 10);
    const saltBase64 = parts[5];
    const storedHashBase64 = parts[6];
    
    // Decode salt from base64
    const salt = Buffer.from(saltBase64, "base64");
    
    // Hash the provided password with the same parameters and salt
    const computedHash = await new Promise<Buffer>((resolve, reject) => {
      scrypt(password, salt, 64, { N, r, p }, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      });
    });
    
    const computedHashBase64 = computedHash.toString("base64");
    
    // Compare hashes using constant-time comparison to prevent timing attacks
    return constantTimeEqual(computedHashBase64, storedHashBase64);
  } catch (error) {
    // If any error occurs during verification, return false
    return false;
  }
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}