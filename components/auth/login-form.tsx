"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/services/auth.actions";
import { BaseResult } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const initialState: BaseResult = { success: false, error: undefined, email: undefined };

  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      router.push(callbackUrl);
    }
  }, [state, router, callbackUrl]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Вхід</CardTitle>
          <CardDescription className="text-center">
            Увійдіть у свій акаунт для продовження
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

            {/* EMAIL */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={state.email}
                  placeholder="your@email.com"
                  className="pr-10"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Пароль
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="h-4 w-4" /> Приховати
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" /> Показати
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="•••••"
                  className="pr-10"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Завантаження...
                </>
              ) : (
                "Увійти"
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Створити акаунт
              </Link>
            </div>
          </form>

          {/* OR */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Або продовжити через
                </span>
              </div>
            </div>

            {/* GOOGLE */}
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/api/oauth/google")}
                type="button"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Увійти через Google
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
