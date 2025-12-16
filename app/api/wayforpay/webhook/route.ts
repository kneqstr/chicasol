import { NextRequest, NextResponse } from "next/server";
import Purchase from "@/models/purchase.model";
import UserCourse from "@/models/userscourse.model";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // WayForPay всегда отправляет JSON
    const data = await request.json();

    const { orderReference, transactionStatus, transactionId } = data;

    console.log(`Processing webhook: ${orderReference}, status: ${transactionStatus}`);

    // Находим покупку
    const purchase = await Purchase.findOne({ wayforpayOrderReference: orderReference });
    if (!purchase) {
      console.error("Purchase not found:", orderReference);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Если уже оплачено - просто подтверждаем
    if (purchase.status === "paid") {
      return new NextResponse("ok", { status: 200 });
    }

    // Обрабатываем статус
    if (transactionStatus === "Approved") {
      purchase.status = "paid";
      purchase.wayforpayTransactionId = transactionId;
      purchase.paidAt = new Date();
      await purchase.save();

      // Даем доступ к курсу (если еще нет)
      const existingAccess = await UserCourse.findOne({
        user: purchase.user,
        course: purchase.course,
      });

      if (!existingAccess) {
        await UserCourse.create({
          user: purchase.user,
          course: purchase.course,
          purchasedAt: new Date(),
        });
      }

      console.log(`✅ Purchase ${orderReference} PAID`);
    } else {
      // Любой другой статус = failed
      purchase.status = "failed";
      await purchase.save();
      console.log(`❌ Purchase ${orderReference} FAILED: ${transactionStatus}`);
    }

    // WayForPay ожидает plain text ответ
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
