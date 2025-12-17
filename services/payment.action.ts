"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Purchase from "@/models/purchase.model";
import Course from "@/models/course.model";
import User from "@/models/user.model";
import {
  generatePurchaseSignature,
  generateOrderReference,
  WayForPayPurchaseRequest,
} from "@/lib/wayforpay/utils";
import { WAYFORPAY_CONFIG, PAYMENT_CURRENCY, PAYMENT_LANGUAGE } from "@/lib/wayforpay/config";

interface CreatePaymentParams {
  courseId: string;
}

export async function createPayment({ courseId }: CreatePaymentParams) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
      redirect("/login");
    }
    const payload = await verifyAccessToken(accessToken);
    const userId = payload.sub;
    await connectDB();
    const existingPurchase = await Purchase.findOne({
      user: userId,
      course: courseId,
      status: { $in: ["paid", "pending"] },
    });
    if (existingPurchase) {
      if (existingPurchase.status === "paid") {
        redirect("/my-courses");
      }
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return { success: false };
    }
    const user = await User.findById(userId);
    if (!user) {
      return { success: false };
    }
    const orderReference = generateOrderReference(userId, courseId);
    const purchase = await Purchase.create({
      user: userId,
      course: courseId,
      amount: course.price,
      currency: PAYMENT_CURRENCY,
      status: "pending",
      wayforpayOrderReference: orderReference,
    });
    const merchantDomainName = process.env.NEXT_PUBLIC_APP_URL
      ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname
      : "localhost";
    const paymentRequest: WayForPayPurchaseRequest = {
      merchantAccount: WAYFORPAY_CONFIG.MERCHANT_ACCOUNT,
      merchantDomainName,
      orderReference,
      orderDate: Math.floor(Date.now() / 1000),
      amount: course.price,
      currency: PAYMENT_CURRENCY,
      productName: [`Курс: ${course.name}`],
      productPrice: [course.price],
      productCount: [1],
      clientFirstName: user.firstName,
      clientEmail: user.email,
      clientPhone: user.phone,
      language: PAYMENT_LANGUAGE,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/return`,
      serviceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/wayforpay/callback`,
      merchantTransactionSecureType: "AUTO",
      paymentSystems: "card;privat24;googlePay;applePay",
      defaultPaymentSystem: "card",
    };
    const merchantSignature = generatePurchaseSignature(paymentRequest);
    paymentRequest.merchantSignature = merchantSignature;
    return {
      success: true,
      wayforpayUrl: WAYFORPAY_CONFIG.WAYFORPAY_URL,
      formData: paymentRequest,
      purchaseId: purchase._id.toString(),
    };
  } catch (error) {
    return { success: false };
  }
}
