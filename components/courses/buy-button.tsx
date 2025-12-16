"use client";

import { createCoursePayment } from "@/services/purchase.action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function BuyButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const buy = async () => {
    startTransition(async () => {
      try {
        const payment = await createCoursePayment(courseId);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = payment.action;
        form.style.display = "none";

        Object.entries(payment.fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error("Payment error:", error);
        router.push("/my-courses");
      }
    });
  };

  return (
    <button
      onClick={buy}
      disabled={pending}
      className="px-6 py-3 rounded-xl bg-black text-white disabled:opacity-50"
    >
      {pending ? "Переходимо до оплати..." : "Купити курс"}
    </button>
  );
}
