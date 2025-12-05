"use client";

import { verifyCodeAction } from "@/services/auth.actions";
import { BaseResult } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import Link from "next/link";
import { AuthCard } from "./auth-card";

export default function VerifyPage() {
  const initialState: BaseResult = { success: false, error: undefined, email: undefined };
  const [state, formAction, isPending] = useActionState(verifyCodeAction, initialState);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleCodeChange = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    setCode(numeric);
  };

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("registrationEmail");
    if (savedEmail) {
      Promise.resolve().then(() => {
        setEmail(savedEmail);
      });
    } else {
      router.push("/register");
    }
  }, [router]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      router.push("/complete-register");
    }
  }, [state, router]);

  return (
    <AuthCard title="Подтверждение email" description={`Мы отправили 6-значный код на ${email}`}>
      <form action={formAction}>
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="code" value={code} />
        <div className="space-y-4">
          <div className="w-full flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={handleCodeChange}
              className="mx-auto"
              inputMode="numeric"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Завантаження...
              </>
            ) : (
              "Отправить код"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-600 hover:text-blue-800 text-sm">
            Вернуться к регистрации
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
