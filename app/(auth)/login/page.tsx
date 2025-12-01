"use client";
import { loginAction } from "@/services/auth.actions";
import { useState } from "react";
import { BaseResult } from "@/types/auth";

export default function LoginPage() {
  const [state, setState] = useState<BaseResult>({
    success: false,
    error: undefined,
    message: undefined,
  });

  async function handleSubmit(formData: FormData) {
    const result = await loginAction(formData);
    if (result) {
      setState(result);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
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
      <form action={handleSubmit} className="w-full max-w-sm p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Вхід</h1>

        {state.error && <p className="text-red-500 mb-2">{state.error}</p>}

        <label className="block mb-2">Email</label>
        <input name="email" type="email" required className="w-full p-2 border rounded mb-4" />

        <label className="block mb-2">Пароль</label>
        <input
          name="password"
          type="password"
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button type="submit" className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700">
          Увійти
        </button>

        <a href="/register" className="block text-center text-sm text-blue-600 mt-3">
          Створити акаунт
        </a>

        <a
          href="/api/oauth/google"
          className="mt-4 w-full flex items-center justify-center py-2 border rounded hover:bg-gray-100"
        >
          Увійти через Google
        </a>
      </form>
    </main>
  );
}
