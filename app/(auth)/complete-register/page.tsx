"use client";

import { completeRegistrationAction } from "@/services/auth.actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BaseResult } from "@/types/auth";

export default function CompleteRegistrationPage() {
  const [state, setState] = useState<BaseResult>({
    success: false,
    error: undefined,
    message: undefined,
    fieldErrors: undefined,
  });
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedEmail = sessionStorage.getItem("registrationEmail");
      if (savedEmail) {
        setEmail(savedEmail);
      } else {
        router.push("/register");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  async function handleSubmit(formData: FormData) {
    const result = await completeRegistrationAction(formData);
    setState(result);

    if (result.success) {
      sessionStorage.removeItem("registrationEmail");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Завершение регистрации</h1>

        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {state.error}
            <h2>{JSON.stringify(state.fieldErrors)}</h2>
          </div>
        )}

        {state.fieldErrors?.phone && (
          <p className="text-red-500 text-sm mt-1">{state.fieldErrors.phone}</p>
        )}

        {state.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            Регистрация успешно завершена! Перенаправляем на главную страницу...
          </div>
        )}

        <form action={handleSubmit}>
          <input type="hidden" name="email" value={email} />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Имя *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Фамилия *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+380123456789"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Подтверждение пароля *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Завершить регистрацию
          </button>
        </form>
      </div>
    </main>
  );
}
