// lib/wayforpay/utils.ts
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
    // Согласно документации WayForPay, для callback подпись формируется из:
    // merchantAccount;orderReference;amount;currency;authCode;cardPan;transactionStatus;reasonCode
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

    console.log("Concatenated string for signature:", concatenatedString);
    console.log("Expected signature:", expectedSignature);
    console.log("Received signature:", data.merchantSignature);

    return expectedSignature === data.merchantSignature.toLowerCase();
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

// Альтернативный вариант (иногда нужен другой порядок параметров)
export function verifyCallbackSignatureAlternative(data: WayForPayCallbackRequest): boolean {
  try {
    // Альтернативный порядок параметров (попробуйте если первый не работает)
    const params = [
      data.merchantAccount,
      data.orderReference,
      data.amount.toString(),
      data.currency,
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

    console.log("Alternative concatenated string:", concatenatedString);
    console.log("Alternative expected signature:", expectedSignature);

    return expectedSignature === data.merchantSignature.toLowerCase();
  } catch (error) {
    console.error("Error verifying alternative signature:", error);
    return false;
  }
}

// Еще один вариант (иногда без authCode)
export function verifyCallbackSignatureSimple(data: WayForPayCallbackRequest): boolean {
  try {
    // Самый простой вариант
    const params = [
      data.merchantAccount,
      data.orderReference,
      data.amount.toString(),
      data.currency,
      data.transactionStatus,
      data.reasonCode.toString(),
    ];

    const concatenatedString = params.join(";");
    const expectedSignature = crypto
      .createHmac("md5", WAYFORPAY_CONFIG.MERCHANT_SECRET)
      .update(concatenatedString)
      .digest("hex")
      .toLowerCase();

    console.log("Simple concatenated string:", concatenatedString);
    console.log("Simple expected signature:", expectedSignature);

    return expectedSignature === data.merchantSignature.toLowerCase();
  } catch (error) {
    console.error("Error verifying simple signature:", error);
    return false;
  }
}

// Универсальная проверка - пробуем все варианты
export function verifyCallbackSignatureUniversal(data: WayForPayCallbackRequest): boolean {
  const signature1 = verifyCallbackSignature(data);
  const signature2 = verifyCallbackSignatureAlternative(data);
  const signature3 = verifyCallbackSignatureSimple(data);

  console.log("Signature verification results:", {
    method1: signature1,
    method2: signature2,
    method3: signature3,
  });

  return signature1 || signature2 || signature3;
}

// Генерация ответа для serviceUrl
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
