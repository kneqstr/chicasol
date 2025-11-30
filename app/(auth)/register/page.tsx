"use client";

import { sendVerificationCodeAction } from "@/services/auth.actions";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BaseResult } from "@/types/auth";

export default function RegisterPage() {
  const [state, setState] = useState<BaseResult>({
    success: false,
    error: undefined,
    message: undefined,
  });
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await sendVerificationCodeAction(formData);
    setState(result);
    if (result.success) {
      sessionStorage.setItem("registrationEmail", email);
      router.push("/verify");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>

        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            Код подтверждения отправлен на ваш email
          </div>
        )}

        <form action={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Получить код подтверждения
          </button>
        </form>

        <div className="mt-6">
          <a
            href="/api/oauth/google"
            className="mt-4 w-full flex items-center justify-center py-2 border rounded hover:bg-gray-100"
          >
            Увійти через Google
          </a>
        </div>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
            Уже есть аккаунт? Войдите
          </Link>
        </div>
      </div>
    </main>
  );
}
