// app/api/wayforpay/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Purchase from "@/models/purchase.model";
import UserCourse from "@/models/usercourse.model";
import {
  WayForPayCallbackRequest,
  verifyCallbackSignatureUniversal,
  generateServiceResponse,
} from "@/lib/wayforpay/utils";

export async function POST(request: NextRequest) {
  try {
    const data: WayForPayCallbackRequest = await request.json();

    console.log("WayForPay callback received:", JSON.stringify(data, null, 2));

    // Валидируем подпись (универсальный метод)
    const isValidSignature = verifyCallbackSignatureUniversal(data);

    if (!isValidSignature) {
      console.error("Invalid signature in callback. Trying to verify manually...");

      // Логируем все данные для отладки
      console.log("All data for manual verification:", {
        merchantAccount: data.merchantAccount,
        orderReference: data.orderReference,
        amount: data.amount,
        currency: data.currency,
        authCode: data.authCode,
        cardPan: data.cardPan,
        transactionStatus: data.transactionStatus,
        reasonCode: data.reasonCode,
        merchantSecret: process.env.WAYFORPAY_MERCHANT_SECRET?.substring(0, 10) + "...",
      });

      // В тестовом режиме можно временно пропускать проверку подписи
      // ЗАКОММЕНТИРУЙТЕ ЭТУ СТРОКУ В ПРОДАКШЕНЕ!
      const IS_TEST_MODE = process.env.NODE_ENV !== "production";
      if (IS_TEST_MODE) {
        console.warn("⚠️ TEST MODE: Skipping signature verification");
      } else {
        const errorResponse = generateServiceResponse(data.orderReference, "decline");
        return NextResponse.json(errorResponse);
      }
    }

    await connectDB();

    // Находим покупку
    const purchase = await Purchase.findOne({
      wayforpayOrderReference: data.orderReference,
    });

    if (!purchase) {
      console.error("Purchase not found in callback:", data.orderReference);
      const errorResponse = generateServiceResponse(data.orderReference, "decline");
      return NextResponse.json(errorResponse);
    }

    // Обновляем статус покупки
    let newStatus: "pending" | "paid" | "failed" | "expired" = "pending";

    switch (data.transactionStatus) {
      case "Approved":
        newStatus = "paid";
        purchase.paidAt = new Date();
        purchase.wayforpayTransactionId = data.orderReference;

        // Создаем запись UserCourse если еще нет
        const existingUserCourse = await UserCourse.findOne({
          user: purchase.user,
          course: purchase.course,
        });

        if (!existingUserCourse) {
          await UserCourse.create({
            user: purchase.user,
            course: purchase.course,
            purchasedAt: new Date(),
            progress: 0,
            completedLessons: [],
            isCompleted: false,
          });

          console.log("UserCourse created for user:", purchase.user, "course:", purchase.course);
        }
        break;

      case "Declined":
      case "Refunded":
        newStatus = "failed";
        console.log(
          `Payment declined for order ${data.orderReference}: ${data.reason} (code: ${data.reasonCode})`,
        );
        break;

      case "Expired":
        newStatus = "expired";
        break;

      case "Pending":
      default:
        newStatus = "pending";
    }

    purchase.status = newStatus;
    await purchase.save();

    console.log("Purchase updated:", {
      id: purchase._id,
      status: newStatus,
      orderReference: data.orderReference,
      transactionStatus: data.transactionStatus,
    });

    // Формируем успешный ответ для WayForPay
    const responseData = generateServiceResponse(data.orderReference, "accept");

    console.log("Sending response to WayForPay:", responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("WayForPay callback error:", error);

    // В случае ошибки все равно отправляем accept, чтобы WayForPay не пытался повторно
    try {
      const data = (await request.json()) as WayForPayCallbackRequest;
      const errorResponse = generateServiceResponse(data.orderReference, "accept");
      return NextResponse.json(errorResponse);
    } catch {
      const errorResponse = generateServiceResponse("unknown", "accept");
      return NextResponse.json(errorResponse);
    }
  }
}
