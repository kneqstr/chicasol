"use client";

import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useTransition } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Language, setLanguage } from "@/lib/translations/language";
import { cn } from "@/lib/utils";

interface PreferencesMenubarProps {
  lang: Language;
}

export function PreferencesMenubar({ lang }: PreferencesMenubarProps) {
  const { setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const switchLang = (nextLang: Language) => {
    startTransition(async () => {
      await setLanguage(nextLang);
    });
  };

  return (
    <Menubar
      className="
        border-none bg-transparent p-0
        flex items-center gap-1 
      "
    >
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            "flex items-center gap-2",
            "rounded-md px-2 py-1.5",
            "text-sm font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            "data-[state=open]:bg-accent",
            "cursor-pointer",
          )}
        >
          <Sun className="h-4 w-4 dark:hidden" />
          <Moon className="h-4 w-4 hidden dark:block" />
        </MenubarTrigger>

        <MenubarContent align="end" className="min-w-40">
          <MenubarItem onClick={() => setTheme("light")} className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </MenubarItem>

          <MenubarItem onClick={() => setTheme("dark")} className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem onClick={() => setTheme("system")} className="cursor-pointer">
            <Monitor className="mr-2 h-4 w-4" />
            System
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            "flex items-center gap-2",
            "rounded-md px-2 py-1.5",
            "text-sm font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            "data-[state=open]:bg-accent",
            "cursor-pointer",
          )}
        >
          <span className="text-base leading-none">{lang === "uk" ? "🇺🇦" : "🇷🇺"}</span>
        </MenubarTrigger>

        <MenubarContent align="end" className="min-w-40">
          <MenubarItem
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => switchLang("uk")}
          >
            🇺🇦 Українська
          </MenubarItem>

          <MenubarItem
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => switchLang("ru")}
          >
            🇷🇺 Русский
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
