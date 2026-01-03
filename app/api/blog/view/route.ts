import { NextRequest, NextResponse } from "next/server";
import { updateViews } from "@/services/blog.actions";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  await updateViews(slug);
  return NextResponse.json({ ok: true });
}
