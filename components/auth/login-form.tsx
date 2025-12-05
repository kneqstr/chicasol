"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/services/auth.actions";
import { BaseResult } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { AuthCard } from "./auth-card";
import { GoogleButton } from "./google-button";

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
    <AuthCard title="Вхід" description="Увійдіть у свій акаунт для продовження">
      <form action={formAction} className="space-y-4">
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
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center space-x-1">
            <label htmlFor="password" className="text-sm font-medium">
              Пароль
            </label>

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="•••••"
            />
          </div>
        </div>

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

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Або продовжити через</span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleButton label="Увійти через Google" />
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
