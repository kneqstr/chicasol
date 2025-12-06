import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VerifyPage from "@/components/auth/verify-form";
import { redis } from "@/lib/redis";

export default async function Verify() {
  const cookieStore = await cookies();
  const email = cookieStore.get("verification_email")?.value;

  if (!email) redirect("/register");

  const storedCode = await redis.get(`verification${email}`);

  if (!storedCode) redirect("/register");

  return <VerifyPage email={email} />;
}
