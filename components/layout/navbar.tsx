"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/services/auth.actions";

interface NavbarProps {
  session: { isAuth: boolean };
}

interface NavItem {
  href: string;
  label: string;
  isPrivate?: boolean;
}

const publicNavItems: NavItem[] = [{ href: "/", label: "Главная" }];

const privateNavItems: NavItem[] = [{ href: "/course", label: "Course" }];

export function Navbar({ session }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-\[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
            <span>Yoga with chicasol</span>
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
                  <Link href={item.href}>{item.label}</Link>
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
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
            </div>

            <div className="flex items-center space-x-2">
              {session.isAuth ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Выйти
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost" className="whitespace-nowrap">
                    <Link href="/login">Войти</Link>
                  </Button>
                  <Button asChild className="whitespace-nowrap">
                    <Link href="/register">Регистрация</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="cursor-pointer">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Menu className="h-5 w-5 " />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] ">
                <SheetTitle className="text-lg font-semibold my-2 flex justify-center">
                  Навигация по сайту
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground mb-4 flex justify-center">
                  Меню навигации по разделам сайта
                </SheetDescription>

                <div className="flex flex-col space-y-4 ">
                  {publicNavItems.map((item) => (
                    <MobileNavItem
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      isActive={pathname === item.href}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}

                  {session.isAuth &&
                    privateNavItems.map((item) => (
                      <MobileNavItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        isActive={pathname === item.href}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}

                  <div className="border-t pt-4 mt-4 mx-4">
                    {session.isAuth ? (
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-start  cursor-pointer"
                      >
                        Выйти
                      </Button>
                    ) : (
                      <div className="flex flex-col  space-y-2">
                        <Button asChild variant="ghost" className="justify-start">
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            Войти
                          </Link>
                        </Button>
                        <Button asChild className="justify-start">
                          <Link href="/register" onClick={() => setIsOpen(false)}>
                            Регистрация
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
}

interface MobileNavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function MobileNavItem({ href, label, isActive, onClick }: MobileNavItemProps) {
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
      {label}
    </Link>
  );
}
