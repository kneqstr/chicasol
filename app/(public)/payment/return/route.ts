// app/payment/return/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Парсим данные из формы WayForPay
    const orderReference = formData.get("orderReference") as string;
    const transactionStatus = formData.get("transactionStatus") as string;
    const reason = formData.get("reason") as string;

    console.log("Payment return data:", {
      orderReference,
      transactionStatus,
      reason,
    });

    // В зависимости от статуса редиректим
    if (transactionStatus === "Approved") {
      // Успешная оплата - редирект на мои курсы
      console.log("Payment successful, redirecting to /my-courses");
      return NextResponse.redirect(new URL("/my-courses", request.url));
    } else {
      // Отмена или ошибка - редирект на страницу курсов
      console.log("Payment failed/cancelled, redirecting to /courses");
      const redirectUrl = new URL("/courses", request.url);

      // Можно добавить параметры для показа сообщения
      if (reason) {
        redirectUrl.searchParams.set("payment_error", encodeURIComponent(reason));
      }

      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Payment return error:", error);
    return NextResponse.redirect(new URL("/courses", request.url));
  }
}

// Обработка GET запроса (если кто-то попал сюда напрямую)
export async function GET(request: NextRequest) {
  console.log("Direct access to payment return");
  return NextResponse.redirect(new URL("/courses", request.url));
}
