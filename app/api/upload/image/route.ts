import { NextRequest, NextResponse } from "next/server";
import { uploadToBunnyCDN } from "@/lib/bunny";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }
    const uniquePrefix = Date.now() + Math.round(Math.random() * 100);
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const storagePath = `blog/${uniquePrefix}-${safeName}`;
    const url = await uploadToBunnyCDN(file, storagePath);
    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}