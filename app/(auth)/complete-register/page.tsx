import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CompletePage from "@/components/auth/complete-form";
import { redis } from "@/lib/redis";

export default async function Complete() {
  const cookieStore = await cookies();
  const email = cookieStore.get("verification_email")?.value;

  if (!email) redirect("/register");

  const pendingRegistration = await redis.get(`pending-registration${email}`);

  if (!pendingRegistration) redirect("/verify");

  return <CompletePage email={email} />;
}
