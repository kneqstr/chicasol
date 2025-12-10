import { verifyAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Admin() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  const { roles } = await verifyAccessToken(accessToken);
  const parsedRoles = JSON.parse(roles);

  try {
    if (!parsedRoles.includes("admin")) {
      redirect("/");
    }
  } catch {
    redirect("/login");
  }
  return (
    <div className="mt-20">
      <Link href="/admin/blog">blog</Link>
    </div>
  );
}
