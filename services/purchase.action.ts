"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Course from "@/models/course.model";
import Purchase from "@/models/purchase.model";
import UserCourse from "@/models/userscourse.model";
import { connectDB } from "@/lib/db";

const MERCHANT_ACCOUNT = process.env.WAYFORPAY_MERCHANT_ACCOUNT || "test_merch_n1";
const MERCHANT_SECRET = process.env.WAYFORPAY_SECRET_KEY || "flk3409refn54t54t*FNJRET";
const WAYFORPAY_URL = "https://secure.wayforpay.com/pay";

function generateSignature(data: (string | number)[]): string {
  return crypto.createHmac("md5", MERCHANT_SECRET).update(data.join(";")).digest("hex");
}

export async function createCoursePayment(courseId: string) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const course = await Course.findById(courseId);
  if (!course || !course.isPublished) {
    redirect("/courses");
  }

  // Проверяем, есть ли уже доступ
  const existingAccess = await UserCourse.findOne({
    user: user._id,
    course: course._id,
  });

  if (existingAccess) {
    redirect("/my-courses");
  }

  // Генерируем уникальный orderReference
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const orderReference = `course_${course._id}_${user._id}_${timestamp}_${random}`;

  // Удаляем старые pending покупки
  await Purchase.deleteMany({
    user: user._id,
    course: course._id,
    status: "pending",
  });

  // Создаем новую покупку
  await Purchase.create({
    user: user._id,
    course: course._id,
    amount: course.price,
    currency: "UAH",
    wayforpayOrderReference: orderReference,
    status: "pending",
  });

  const amount = course.price.toFixed(2);
  const orderDate = Math.floor(timestamp / 1000);
  const domain = process.env.NEXT_PUBLIC_APP_URL!.replace(/^https?:\/\//, "");

  // Генерируем подпись
  const signature = generateSignature([
    MERCHANT_ACCOUNT,
    domain,
    orderReference,
    orderDate,
    amount,
    "UAH",
    course.title.uk,
    1,
    amount,
  ]);

  return {
    action: WAYFORPAY_URL,
    fields: {
      merchantAccount: MERCHANT_ACCOUNT,
      merchantDomainName: domain,
      merchantAuthType: "SimpleSignature",
      merchantSignature: signature,

      orderReference,
      orderDate: orderDate.toString(),
      amount,
      currency: "UAH",

      productName: course.title.uk,
      productCount: "1",
      productPrice: amount,

      language: "UA",
      // ВАЖНО: Теперь редиректим на API для обработки POST
      returnUrl: "https://app.pokroviteli.online/api/payment/return",
      serviceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/wayforpay/webhook`,
      clientEmail: user.email,
      clientFirstName: user.firstName,
    },
  };
}
