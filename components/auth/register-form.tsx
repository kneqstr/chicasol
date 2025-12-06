"use client";

import { sendVerificationCodeAction } from "@/services/auth.actions";
import { BaseResult } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { AuthCard } from "./auth-card";
import { GoogleButton } from "./google-button";

export default function RegisterPage() {
  const initialState: BaseResult = { success: false, error: undefined, email: undefined };
  const [state, formAction, isPending] = useActionState(sendVerificationCodeAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success(state.message);
      router.push("/verify");
    }
  }, [state, router]);

  return (
    <AuthCard title="Регистрация" description="Введите email">
      <form action={formAction}>
        <div className="space-y-4">
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
        </div>
        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
            Войти в свой аккаунт
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
            <GoogleButton label="Зарегистрироваться через Google" />
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
