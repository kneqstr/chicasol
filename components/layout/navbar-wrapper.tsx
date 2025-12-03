import { getSession } from "@/lib/auth";
import { Navbar } from "./navbar";
import { getLanguage } from "@/lib/translations/language";

export async function NavbarWrapper() {
  const session = await getSession();
  const lang = await getLanguage();

  return <Navbar session={session} lang={lang} />;
}
