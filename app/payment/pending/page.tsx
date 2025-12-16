"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPendingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderReference = searchParams.get("orderReference");
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!orderReference) {
      router.push("/payment/error?message=Нет номера заказа");
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Проверяем статус снова
          router.push(`/api/payment/verify?orderReference=${orderReference}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderReference, router]);

  return (
    <div className="max-w-2xl mx-auto py-12 mt-20 px-4 text-center">
      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">⏳</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Перевірка оплати</h1>
      <p className="text-gray-600 mb-4">Перевіряємо статус вашого платежу...</p>
      <p className="mb-6">
        Автоматична перевірка через: <span className="font-bold">{count}</span> сек.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => router.push(`/api/payment/verify?orderReference=${orderReference}`)}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Перевірити зараз
        </button>
        <button
          onClick={() => router.push("/my-courses")}
          className="px-6 py-3 border border-gray-300 rounded-lg"
        >
          До моїх курсів
        </button>
      </div>
    </div>
  );
}
