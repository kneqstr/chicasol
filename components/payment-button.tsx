"use client";
import { useState } from "react";
import { createPayment } from "@/services/payment.action";
interface PaymentButtonProps {
  courseId: string;
  coursePrice: number;
  className?: string;
}
export function PaymentButton({ courseId, coursePrice, className = "" }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const result = await createPayment({ courseId });
      if (!result.success) {
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
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
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
