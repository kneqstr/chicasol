"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getLanguage() {
  const cookieStore = await cookies();
  return (cookieStore.get("lang")?.value as "ua" | "ru") || "ua";
}

export async function setLanguage(lang: "ua" | "ru") {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang, { path: "/", maxAge: 365 * 24 * 3600 });
  revalidatePath("/", "layout");
}
