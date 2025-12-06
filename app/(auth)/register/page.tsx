import RegisterPage from "@/components/auth/register-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redis } from "@/lib/redis";

export default async function Register() {
  const cookieStore = await cookies();
  const email = cookieStore.get("verification_email")?.value;

  const code = await redis.get(`verification${email}`);
  const pendingRegistration = await redis.get(`pending-registration${email}`);

  if (code) redirect("/verify");
  if (pendingRegistration) redirect("/complete-register");

  return <RegisterPage />;
}
