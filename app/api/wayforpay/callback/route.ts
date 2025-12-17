import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Purchase from "@/models/purchase.model";
import UserCourse from "@/models/usercourse.model";
import {
  WayForPayCallbackRequest,
  verifyCallbackSignature,
  generateServiceResponse,
} from "@/lib/wayforpay/utils";

export async function POST(request: NextRequest) {
  try {
    const data: WayForPayCallbackRequest = await request.json();
    const isValidSignature = verifyCallbackSignature(data);
    if (!isValidSignature) {
      const errorResponse = generateServiceResponse(data.orderReference, "decline");
      return NextResponse.json(errorResponse);
    }
    await connectDB();
    const purchase = await Purchase.findOne({
      wayforpayOrderReference: data.orderReference,
    });
    if (!purchase) {
      const errorResponse = generateServiceResponse(data.orderReference, "decline");
      return NextResponse.json(errorResponse);
    }
    let newStatus: "pending" | "paid" | "failed" | "expired" = "pending";
    switch (data.transactionStatus) {
      case "Approved":
        newStatus = "paid";
        purchase.paidAt = new Date();
        purchase.wayforpayTransactionId = data.orderReference;
        const existingUserCourse = await UserCourse.findOne({
          user: purchase.user,
          course: purchase.course,
        });
        if (existingUserCourse) {
          existingUserCourse.isActive = true;
          await existingUserCourse.save();
        } else {
          await UserCourse.create({
            user: purchase.user,
            course: purchase.course,
            purchasedAt: new Date(),
            progress: 0,
            completedLessons: [],
            isCompleted: false,
            isActive: true,
          });
        }
        break;
      case "Declined":
        newStatus = "failed";
        break;
      case "Refunded":
        newStatus = "failed";
        const userCourse = await UserCourse.findOne({
          user: purchase.user,
          course: purchase.course,
        });
        if (userCourse) {
          userCourse.isActive = false;
          await userCourse.save();
        }
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
    const responseData = generateServiceResponse(data.orderReference, "accept");
    return NextResponse.json(responseData);
  } catch (error) {
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
