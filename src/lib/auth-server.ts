import { auth } from "./auth";
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  
  // Get all cookies and create a cookie header string
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const session = await auth.api.getSession({
    headers: {
      cookie: cookieHeader,
    },
  });

  return session;
}

