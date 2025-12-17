import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const orderReference = formData.get("orderReference") as string;
    const transactionStatus = formData.get("transactionStatus") as string;
    const reason = formData.get("reason") as string;
    if (transactionStatus === "Approved") {
      return NextResponse.redirect(new URL("/my-courses", request.url));
    } else {
      const redirectUrl = new URL("/courses", request.url);
      if (reason) {
        redirectUrl.searchParams.set("payment_error", encodeURIComponent(reason));
      }
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/courses", request.url));
}
