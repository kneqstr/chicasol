import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const orderReference = formData.get("orderReference") as string;
    const transactionStatus = formData.get("transactionStatus") as string;
    const reason = formData.get("reason") as string;

    if (transactionStatus === "Approved") {
      console.log("approved, go to my-courses");
      return NextResponse.redirect(new URL("/my-courses", request.url), { status: 303 });
    } else {
      const redirectUrl = new URL("/courses", request.url);
      if (reason) {
        redirectUrl.searchParams.set("payment_error", encodeURIComponent(reason));
      }
      console.log("not approved, go to courses");
      return NextResponse.redirect(redirectUrl, { status: 303 });
    }
  } catch (error) {
    console.log("just error, go to courses");
    return NextResponse.redirect(new URL("/courses", request.url), { status: 303 });
  }
}
