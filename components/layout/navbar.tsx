"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import { logoutAction } from "@/services/auth.actions";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "../language-switch";

interface INavbar {
  session: { isAuth: boolean; isAdmin: boolean };
  lang: "uk" | "ru";
}
interface INavItem {
  href: string;
  lable: string;
}

const publicNavItems: INavItem[] = [
  { href: "/", lable: "На гловну" },
  { href: "/about", lable: "Про мене" },
  { href: "/resources", lable: "Матерiали" },
  { href: "/blog", lable: "Блог" },
  { href: "/courses", lable: "Курси" },
];
const privateNavItems: INavItem[] = [{ href: "/course", lable: "Мої курси" }];

export const Navbar = ({ session, lang }: INavbar) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  async function handleLogout() {
    await logoutAction();
    router.push("/login");
  }
  return (
    <nav className="fixed z-50 w-full border-b bg-background/95 backdrop-blur supports-\[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center font-bold text-xl">
            Yoga With Chicasol
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              {publicNavItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "whitespace-nowrap",
                    pathname === item.href && "bg-accent text-accent-foreground",
                  )}
                >
                  <Link href={item.href}>{item.lable}</Link>
                </Button>
              ))}
              {session.isAuth &&
                privateNavItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "whitespace-nowrap",
                      pathname === item.href && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Link href={item.href}>{item.lable}</Link>
                  </Button>
                ))}
              {session.isAdmin && (
                <Button
                  asChild
                  variant={pathname === "/admin" ? "secondary" : "ghost"}
                  className={cn(
                    "whitespace-nowrap",
                    pathname === "/admin" && "bg-accent text-accent-foreground",
                  )}
                >
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              <ModeToggle />
              <LanguageSwitcher lang={lang} />
            </div>
            <div className="flex items-center space-x-2">
              {session.isAuth ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Вихід
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost" className="whitespace-nowrap">
                    <Link href="/login">Вхід</Link>
                  </Button>
                  <Button asChild className="whitespace-nowrap">
                    <Link href="/register">Реєстрація</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <div className="flex flex-col space-y-4 mt-8">
                  {publicNavItems.map((item) => (
                    <MobileNavItem
                      key={item.href}
                      href={item.href}
                      lable={item.lable}
                      isActive={pathname === item.href}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}

                  {session.isAuth &&
                    privateNavItems.map((item) => (
                      <MobileNavItem
                        key={item.href}
                        href={item.href}
                        lable={item.lable}
                        isActive={pathname === item.href}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}
                  {session.isAdmin && (
                    <Button
                      asChild
                      variant={pathname === "/admin" ? "secondary" : "ghost"}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "whitespace-nowrap",
                        pathname === "/admin" && "bg-accent text-accent-foreground",
                      )}
                    >
                      <Link href="/admin">Admin</Link>
                    </Button>
                  )}
                  <div className="flex items-center justify-end space-x-2 mx-4">
                    <ModeToggle />
                    <LanguageSwitcher lang={lang} />
                  </div>
                  <div className="border-t pt-4 mt-4 mx-4">
                    {session.isAuth ? (
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-start cursor-pointer"
                      >
                        Вийти
                      </Button>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button asChild variant="ghost" className="justify-start">
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            Вхід
                          </Link>
                        </Button>
                        <Button asChild className="justify-start">
                          <Link href="/register" onClick={() => setIsOpen(false)}>
                            Реєстрація
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

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
      className={cn(
        "flex items-center mx-4 py-2 px-4 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-foreground/70 hover:text-foreground hover:bg-accent/50",
      )}
      onClick={onClick}
    >
      {lable}
    </Link>
  );
}
