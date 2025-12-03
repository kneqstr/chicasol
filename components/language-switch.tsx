"use client";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { setLanguage } from "@/lib/language";

interface ISwitcherProps {
  lang: "ua" | "ru";
}

export function LanguageSwitcher({ lang }: ISwitcherProps) {
  const [isPending, startTransition] = useTransition();

  const switchLang = (lang: "ua" | "ru") => {
    startTransition(async () => {
      await setLanguage(lang);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {lang === "ua" ? "🇺🇦" : "🇷🇺"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[100px]">
        <DropdownMenuItem onClick={() => switchLang("ua")}>Українська</DropdownMenuItem>

        <DropdownMenuItem onClick={() => switchLang("ru")}>Русский</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
