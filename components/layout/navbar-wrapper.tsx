import { getSession } from "@/lib/auth";
import { Navbar } from "./navbar";

export async function NavbarWrapper() {
  const session = await getSession();

  return <Navbar session={session} />;
}
