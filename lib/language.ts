"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getLanguage() {
  const cookieStore = await cookies();
  return (cookieStore.get("lang")?.value as "uk" | "ru") || "uk";
}

export async function setLanguage(lang: "uk" | "ru") {
  const cookieStore = await cookies();
  cookieStore.set("lang", lang, { path: "/", maxAge: 365 * 24 * 3600 });
  revalidatePath("/", "layout");
}
