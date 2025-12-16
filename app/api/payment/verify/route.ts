import { NextRequest, NextResponse } from "next/server";
import Purchase from "@/models/purchase.model";
import { connectDB } from "@/lib/db";

// Обрабатываем GET и POST одним методом
export async function GET(request: NextRequest) {
  return handlePaymentVerification(request);
}

export async function POST(request: NextRequest) {
  return handlePaymentVerification(request);
}

async function handlePaymentVerification(request: NextRequest) {
  try {
    console.log("Payment verification called, method:", request.method);

    await connectDB();

    let orderReference: string | null = null;

    // Пробуем разные способы получения orderReference
    if (request.method === "GET") {
      // Для GET - из query параметров
      const searchParams = request.nextUrl.searchParams;
      orderReference = searchParams.get("orderReference");
    } else if (request.method === "POST") {
      // Для POST - пробуем разные форматы
      const contentType = request.headers.get("content-type");

      if (contentType?.includes("application/x-www-form-urlencoded")) {
        const formData = await request.formData();
        orderReference = formData.get("orderReference") as string;
        console.log("Form data received:", Object.fromEntries(formData.entries()));
      } else if (contentType?.includes("application/json")) {
        const data = await request.json();
        orderReference = data.orderReference;
      } else {
        // Пробуем оба варианта
        try {
          const formData = await request.formData();
          orderReference = formData.get("orderReference") as string;
        } catch {
          try {
            const data = await request.json();
            orderReference = data.orderReference;
          } catch (error) {
            console.error("Could not parse request body:", error);
          }
        }
      }
    }

    console.log("Extracted orderReference:", orderReference);

    if (!orderReference) {
      console.error("No orderReference found");
      return NextResponse.redirect(
        new URL("/payment/error?message=Нет номера заказа", request.url),
      );
    }

    // Проверяем статус покупки
    const purchase = await Purchase.findOne({
      wayforpayOrderReference: orderReference,
    }).populate("course");

    if (!purchase) {
      console.error("Purchase not found:", orderReference);
      return NextResponse.redirect(
        new URL(`/payment/error?message=Заказ не найден: ${orderReference}`, request.url),
      );
    }

    console.log("Purchase found, status:", purchase.status);

    // Редиректим в зависимости от статуса
    if (purchase.status === "paid") {
      console.log("Redirecting to success page");
      return NextResponse.redirect(
        new URL(`/payment/success?orderReference=${orderReference}`, request.url),
      );
    } else if (purchase.status === "pending") {
      console.log("Redirecting to pending page");
      return NextResponse.redirect(
        new URL(`/payment/pending?orderReference=${orderReference}`, request.url),
      );
    } else {
      console.log("Redirecting to error page, status:", purchase.status);
      return NextResponse.redirect(
        new URL(
          `/payment/error?orderReference=${orderReference}&status=${purchase.status}`,
          request.url,
        ),
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.redirect(
      new URL("/payment/error?message=Ошибка проверки платежа", request.url),
    );
  }
}
