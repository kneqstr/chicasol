"use client";

import { BaseResult } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { completeRegistrationAction } from "@/services/auth.actions";
import { Check } from "lucide-react";
import { AuthCard } from "./auth-card";
import { AnimatedErrorInput } from "./animated-input";
import { PhoneInput } from "./phone-input";

export default function CompletePage() {
  const initialState: BaseResult = {
    success: false,
    error: undefined,
    email: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    fieldErrors: {},
  };
  const [state, formAction, isPending] = useActionState(completeRegistrationAction, initialState);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const rules = {
    minLength: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
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
      sessionStorage.removeItem("registrationEmail");
      toast.success(state.message);
      router.push("/");
    }
  }, [state, router]);

  return (
    <AuthCard title="Запоните поля">
      <form action={formAction} className="space-x-4">
        <input type="hidden" name="email" value={email} />
        <div className="flex flex-col space-y-2  w-full justify-between">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4">
            <AnimatedErrorInput
              name="firstName"
              label="Имя"
              value={firstName}
              onChange={setFirstName}
              error={state.fieldErrors?.firstName}
              isPending={isPending}
            />

            <AnimatedErrorInput
              name="lastName"
              label="Фамилия"
              value={lastName}
              onChange={setLastName}
              error={state.fieldErrors?.lastName}
              isPending={isPending}
            />
          </div>
          <PhoneInput
            name="phone"
            value={phone}
            onChange={setPhone}
            error={state.fieldErrors?.phone}
          />
          <AnimatedErrorInput
            name="password"
            label="Пароль"
            value={password}
            onChange={setPassword}
            type={showPassword ? "text" : "password"}
            error={state.fieldErrors?.password}
            isPending={isPending}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((s) => !s)}
          />

          <div className="mt-2 space-y-1 text-xs">
            <PasswordRule ok={rules.minLength} text="Минимум 8 символов" />
            <PasswordRule ok={rules.upper} text="Хотя бы одна заглавная буква" />
            <PasswordRule ok={rules.lower} text="Хотя бы одна строчная буква" />
            <PasswordRule ok={rules.number} text="Хотя бы одна цифра" />
            <PasswordRule ok={rules.special} text="Хотя бы один спецсимвол" />
          </div>
          <AnimatedErrorInput
            name="confirmPassword"
            label="Пароль"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type={showPassword ? "text" : "password"}
            error={state.fieldErrors?.password}
            isPending={isPending}
          />
          <Button type="submit" className="w-full my-4" disabled={isPending}>
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Завантаження...
              </>
            ) : (
              "Завершить регистрацию"
            )}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}

function PasswordRule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check
        className={`h-4 w-4 transition ${
          ok ? "text-green-600 opacity-100" : "text-gray-300 opacity-50"
        }`}
      />
      <span className={`transition ${ok ? "text-green-700 font-medium" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );
}
