import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";

export default async function Home() {
  const session = await getSession();

  // Redirect to dashboard if logged in, otherwise to login
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
