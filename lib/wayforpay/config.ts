export const WAYFORPAY_CONFIG = {
  MERCHANT_ACCOUNT: process.env.WAYFORPAY_MERCHANT_ACCOUNT || "test_merch_n1",
  MERCHANT_SECRET: process.env.WAYFORPAY_MERCHANT_SECRET || "flk3409refn54t54t*FNJRET",
  WAYFORPAY_URL: process.env.WAYFORPAY_URL || "https://secure.wayforpay.com/pay",
  API_URL: process.env.WAYFORPAY_API_URL || "https://api.wayforpay.com/api",
} as const;

export const PAYMENT_CURRENCY = "UAH";
export const PAYMENT_LANGUAGE = "ua";
