"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, CheckCircle } from "lucide-react";
import { createPayment } from "@/services/payment.action";
interface PaymentButtonProps {
  courseId: string;
  coursePrice: number;
  className?: string;
}
export function PaymentButton({ courseId, coursePrice, className = "" }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const paymentError = searchParams.get("payment_error");
    const paymentSuccess = searchParams.get("payment_success");
    if (paymentError) {
      // setError(decodeURIComponent(paymentError));
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("payment_error");
      window.history.replaceState({}, "", newUrl.toString());
    }
    if (paymentSuccess) {
      // setSuccess(decodeURIComponent(paymentSuccess));
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("payment_success");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams]);
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      const result = await createPayment({ courseId });
      if (!result.success) {
        setError("Failed create payment");
        setIsLoading(false);
        return;
      }
      const form = document.createElement("form");
      form.method = "POST";
      form.action = result.wayforpayUrl!;
      form.style.display = "none";
      Object.entries(result.formData!).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              const arrayInput = document.createElement("input");
              arrayInput.type = "hidden";
              arrayInput.name = `${key}[${index}]`;
              arrayInput.value = item.toString();
              form.appendChild(arrayInput);
            });
          } else {
            input.value = value.toString();
            form.appendChild(input);
          }
        }
      });
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Payment failed. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <XCircle className="h-5 w-5 text-red-600 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Помилка оплати</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Оплата успішна!</p>
            <p className="text-sm text-green-600">{success}</p>
          </div>
        </div>
      )}
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Обробка...
          </>
        ) : (
          `Купити за ${coursePrice} ₴`
        )}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Після натискання кнопки вас буде перенаправлено на сторінку безпечної оплати WayForPay
      </p>
    </div>
  );
}
