"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { authTranslations, zodTranslations } from "./auth-translations";

export type Language = "uk" | "ru";
export type Category = "common" | "registration" | "login" | "validation" | "email";
export type ZodCategory = "email" | "password" | "code" | "name" | "phone";

export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  return (cookieStore.get("lang")?.value as Language) || "uk";
}

export async function setLanguage(lang: Language): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang, { path: "/", maxAge: 365 * 24 * 3600 });
  revalidatePath("/", "layout");
}

export async function tz<T extends ZodCategory>(
  category: T,
  key: keyof (typeof zodTranslations)[T],
): Promise<string> {
  const lang = await getLanguage();

  const translationObj = zodTranslations[category];
  const translation = translationObj[key as keyof typeof translationObj] as {
    uk: string;
    ru: string;
  };

  if (!translation || typeof translation !== "object" || !(lang in translation)) {
    console.warn(`Translation not found: ${String(category)}.${String(key)}`);
    return `${String(category)}.${String(key)}`;
  }

  return translation[lang];
}

export async function t<T extends Category>(
  category: T,
  key: keyof (typeof authTranslations)[T],
): Promise<string> {
  const lang = await getLanguage();

  const translationObj = authTranslations[category];
  const translation = translationObj[key as keyof typeof translationObj] as {
    uk: string;
    ru: string;
  };

  if (!translation || typeof translation !== "object" || !(lang in translation)) {
    console.warn(`Translation not found: ${String(category)}.${String(key)}`);
    return `${String(category)}.${String(key)}`;
  }

  return translation[lang];
}
