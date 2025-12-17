import crypto from "crypto";
import { WAYFORPAY_CONFIG } from "./config";

export interface WayForPayPurchaseRequest {
  merchantAccount: string;
  merchantDomainName: string;
  merchantTransactionSecureType?: string;
  merchantSignature?: string;
  orderReference: string;
  orderDate: number;
  amount: number;
  currency: string;
  productName: string[];
  productPrice: number[];
  productCount: number[];
  clientFirstName?: string;
  clientLastName?: string;
  clientEmail?: string;
  clientPhone?: string;
  language?: string;
  returnUrl?: string;
  serviceUrl?: string;
  paymentSystems?: string;
  defaultPaymentSystem?: string;
}

export interface WayForPayCallbackRequest {
  merchantAccount: string;
  orderReference: string;
  merchantSignature: string;
  amount: number;
  currency: string;
  authCode: string;
  cardPan: string;
  transactionStatus: "Approved" | "Refunded" | "Declined" | "Expired" | "Pending";
  reason: string;
  reasonCode: number;
  fee: number;
  paymentSystem: string;
  acquirerBankName?: string;
  cardProduct?: string;
  clientName?: string;
  email?: string;
  phone?: string;
  createdDate: number;
  processingDate: number;
  [key: string]: string | number | undefined;
}

export interface WayForPayServiceCallbackResponse {
  orderReference: string;
  status: "accept" | "decline";
  time: number;
  signature: string;
  transactionStatus?: string;
  reason?: string;
  reasonCode?: number;
}

export function generateSignature(params: string[]): string {
  const concatenatedString = params.join(";");
  return crypto
    .createHmac("md5", WAYFORPAY_CONFIG.MERCHANT_SECRET)
    .update(concatenatedString)
    .digest("hex");
}

export function generatePurchaseSignature(request: WayForPayPurchaseRequest): string {
  const params = [
    request.merchantAccount,
    request.merchantDomainName,
    request.orderReference,
    request.orderDate.toString(),
    request.amount.toString(),
    request.currency,
    ...request.productName,
    ...request.productCount.map((count) => count.toString()),
    ...request.productPrice.map((price) => price.toString()),
  ];
  return generateSignature(params);
}

export function verifyCallbackSignature(data: WayForPayCallbackRequest): boolean {
  try {
    const params = [
      data.merchantAccount,
      data.orderReference,
      data.amount.toString(),
      data.currency,
      data.authCode,
      data.cardPan,
      data.transactionStatus,
      data.reasonCode.toString(),
    ];
    const concatenatedString = params.join(";");
    const expectedSignature = crypto
      .createHmac("md5", WAYFORPAY_CONFIG.MERCHANT_SECRET)
      .update(concatenatedString)
      .digest("hex")
      .toLowerCase();
    return expectedSignature === data.merchantSignature.toLowerCase();
  } catch (error) {
    return false;
  }
}

export function generateServiceResponse(
  orderReference: string,
  status: "accept" | "decline" = "accept",
): WayForPayServiceCallbackResponse {
  const responseTime = Math.floor(Date.now() / 1000);
  const responseData: WayForPayServiceCallbackResponse = {
    orderReference,
    status,
    time: responseTime,
    signature: "",
  };
  const params = [responseData.orderReference, responseData.status, responseData.time.toString()];
  responseData.signature = generateSignature(params);
  return responseData;
}

export function generateOrderReference(userId: string, courseId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `ORDER_${userId}_${courseId}_${timestamp}_${random}`;
}
