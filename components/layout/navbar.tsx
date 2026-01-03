"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/services/auth.actions";
import { Language } from "@/lib/translations/language";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

import { PreferencesMenubar } from "../toggle";
interface INavbar {
  session: { isAuth: boolean; isAdmin: boolean };
  lang: Language;
}

interface INavItem {
  href: string;
  lable: string;
}

const publicNavItems: INavItem[] = [
  { href: "/", lable: "На головну" },
  { href: "/about", lable: "Про мене" },
  { href: "/resources", lable: "Матеріали" },
  { href: "/blog", lable: "Блог" },
  { href: "/courses", lable: "Курси" },
];

const privateNavItems: INavItem[] = [{ href: "/my-courses", lable: "Мої курси" }];

export const Navbar = ({ session, lang }: INavbar) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await logoutAction();
    router.push("/login");
    setOpen(false);
  }

  return (
    <nav className="fixed z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Yoga With Chicasol
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <div className="hidden lg:flex">
              {publicNavItems.map((item) => (
                <Link href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent cursor-pointer my-1 mx-0.5 ${pathname === item.href ? "bg-accent" : ""}`}
                  key={item.href}
                >
                  {item.lable}
                </Link>
              ))}
            </div>
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="hidden md:flex lg:hidden px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent cursor-pointer">
                  Меню
                </MenubarTrigger>
                <MenubarContent>
                  {publicNavItems.map((item) => (
                    <MenubarItem
                      className={`cursor-pointer my-1 ${pathname === item.href ? "bg-accent" : ""}`}
                      key={item.href}
                      asChild
                    >
                      <Link href={item.href}>{item.lable}</Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>

              {session.isAuth && (
                <Link
                  href="/my-courses"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent cursor-pointer my-1 ${pathname === "/my-courses" ? "bg-accent" : ""}`}
                >
                  Мої курси
                </Link>
              )}

              {session.isAdmin && (
                <Link
                  href="/admin"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent cursor-pointer my-1 ${pathname === "/admin" ? "bg-accent" : ""}`}
                >
                  Admin
                </Link>
              )}
            </Menubar>

            <PreferencesMenubar lang={lang} />

            {session.isAuth ? (
              <Button variant="outline" onClick={handleLogout}>
                Вихід
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Вхід</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Реєстрація</Link>
                </Button>
              </>
            )}
          </div>
          {session.isAuth && (
            <Link
              href="/my-courses"
              className={`md:hidden px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent cursor-pointer my-1 ${pathname === "/my-courses" ? "bg-accent" : ""}`}
            >
              Мої курси
            </Link>
          )}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="cursor-pointer" asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5 " />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="flex flex-col p-0">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Yoga with Chicasol</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-auto px-3 py-4 space-y-1">
                  <NavSection title="Меню">
                    {publicNavItems.map((item) => (
                      <MobileNavItem
                        key={item.href}
                        {...item}
                        isActive={pathname === item.href}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                  </NavSection>

                  {session.isAdmin && (
                    <NavSection title="Навчання">
                      <MobileNavItem
                        href="/my-courses"
                        lable="Мои курсы"
                        isActive={pathname === "/my-courses"}
                        onClick={() => setOpen(false)}
                      />
                    </NavSection>
                  )}

                  {session.isAdmin && (
                    <NavSection title="Admin">
                      <MobileNavItem
                        href="/admin"
                        lable="Dashboard"
                        isActive={pathname === "/admin"}
                        onClick={() => setOpen(false)}
                      />
                    </NavSection>
                  )}

                  <div className="flex justify-end pt-4">
                    <PreferencesMenubar lang={lang} />
                  </div>
                </div>

                <div className="border-t p-4">
                  {session.isAuth ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Вийти
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="ghost">
                        <Link href="/login" onClick={() => setOpen(false)}>
                          Вхід
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register" onClick={() => setOpen(false)}>
                          Реєстрація
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1 ">
      <p className="px-3 py-2 border-b text-xs font-semibold text-primary uppercase">{title}</p>
      {children}
    </div>
  );
}

interface IMobileNavItem {
  href: string;
  lable: string;
  isActive: boolean;
  onClick: () => void;
}

function MobileNavItem({ href, lable, isActive, onClick }: IMobileNavItem) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-md px-6 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      {lable}
    </Link>
  );
}
