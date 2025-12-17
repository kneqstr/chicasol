// actions/payment.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Purchase from "@/models/purchase.model";
import UserCourse from "@/models/usercourse.model";
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

// Функция для получения базового URL из заголовков
async function getBaseUrl(): Promise<string> {
  try {
    // Получаем заголовки
    const headersList = await headers();

    // Пробуем получить host из заголовков
    const host = headersList.get("host");
    const xForwardedHost = headersList.get("x-forwarded-host");
    const xForwardedProto = headersList.get("x-forwarded-proto");

    // Используем host из заголовков или x-forwarded-host
    const serverHost = xForwardedHost || host;

    if (!serverHost) {
      // Fallback к переменной окружения если нет заголовков
      return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    }

    let protocol = "https";
    if (xForwardedProto) {
      protocol = xForwardedProto;
    } else if (process.env.NODE_ENV === "development") {
      protocol = "http";
    }

    // Собираем URL
    const baseUrl = `${protocol}://${serverHost}`;

    console.log("Dynamic base URL calculation:", {
      host,
      xForwardedHost,
      xForwardedProto,
      calculatedUrl: baseUrl,
    });

    return baseUrl;
  } catch (error) {
    console.error("Error getting base URL:", error);
    // Fallback на переменную окружения
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  }
}

export async function createPayment({ courseId }: CreatePaymentParams) {
  try {
    // Проверяем авторизацию
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    // Верифицируем токен
    const payload = await verifyAccessToken(accessToken);
    const userId = payload.sub;

    await connectDB();

    // Проверяем, есть ли уже покупка
    const existingPurchase = await Purchase.findOne({
      user: userId,
      course: courseId,
      status: { $in: ["paid", "pending"] },
    });

    if (existingPurchase) {
      if (existingPurchase.status === "paid") {
        redirect("/my-courses");
      }
      // Если pending, можно обновить или создать новую
    }

    // Получаем данные курса
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Получаем данные пользователя
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Генерируем orderReference
    const orderReference = generateOrderReference(userId, courseId);

    // Создаем запись о покупке
    const purchase = await Purchase.create({
      user: userId,
      course: courseId,
      amount: course.price,
      currency: PAYMENT_CURRENCY,
      status: "pending",
      wayforpayOrderReference: orderReference,
    });

    // Получаем базовый URL динамически
    const baseUrl = await getBaseUrl();
    console.log("Using base URL:", baseUrl);

    // Парсим URL для получения домена
    let merchantDomainName: string;
    try {
      const url = new URL(baseUrl);
      merchantDomainName = url.hostname;
    } catch {
      // Fallback если не удалось распарсить
      merchantDomainName = process.env.NEXT_PUBLIC_APP_URL
        ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname
        : "localhost";
    }

    // Формируем запрос для WayForPay
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
      returnUrl: `${baseUrl}/payment/return`,
      serviceUrl: `${baseUrl}/api/wayforpay/callback`,
      merchantTransactionSecureType: "AUTO",
      paymentSystems: "card;privat24;googlePay;applePay",
      defaultPaymentSystem: "card",
    };

    // Генерируем подпись
    const merchantSignature = generatePurchaseSignature(paymentRequest);
    paymentRequest.merchantSignature = merchantSignature;

    // Возвращаем данные для формы
    return {
      success: true,
      wayforpayUrl: WAYFORPAY_CONFIG.WAYFORPAY_URL,
      formData: paymentRequest,
      purchaseId: purchase._id.toString(),
    };
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error("Failed to create payment. Please try again.");
  }
}
