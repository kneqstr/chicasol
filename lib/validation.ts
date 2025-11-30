import { z } from "zod";

export const emailValidation = z
  .email("Введіть коректний email")
  .min(1, "Email обов'язковий")
  .max(255, "Email занадто довгий")
  .toLowerCase()
  .trim();

export const passwordValidation = z
  .string()
  .min(8, "Пароль повинен бути не менше 8 символів")
  .max(128, "Пароль занадто довгий")
  .regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру")
  .regex(/[a-z]/, "Пароль повинен містити хоча б одну малу літеру")
  .regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
  .regex(/[^A-Za-z0-9]/, "Пароль повинен містити хоча б один спеціальний символ");

export const codeValidation = z
  .string()
  .length(6, "Код повинен складатись з 6 цифр")
  .regex(/^\d+$/, "Код повинен містити тільки цифри");

export const nameValidation = z
  .string()
  .max(50, "Занадто довге значення")
  .regex(/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ'\-\s]+$/, "Може містити тільки літери, апостроф та дефіс")
  .trim()
  .optional();

export const phoneValidation = z
  .string()
  .min(10, "Телефон повинен містити не менше 10 цифр")
  .max(15, "Телефон занадто довгий")
  .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Невірний формат телефону")
  .optional();

export const EmailSchema = z.object({
  email: emailValidation,
});

export const VerifyCodeSchema = z.object({
  email: emailValidation,
  code: codeValidation,
});

export const CompleteRegistrationSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Підтвердження паролю обов'язкове"),
    firstName: nameValidation,
    lastName: nameValidation,
    phone: phoneValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Пароль обов'язковий"),
});

export function handleZodError(error: z.ZodError): {
  success: false;
  error: string;
  fieldErrors: Record<string, string>;
} {
  const fieldErrors: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0] as string;
    fieldErrors[field] = issue.message;
  });

  const firstError = error.issues[0]?.message || "Помилка валідації";

  return {
    success: false,
    error: firstError,
    fieldErrors,
  };
}

export type CodeFormData = z.infer<typeof VerifyCodeSchema>;
export type EmailFormData = z.infer<typeof EmailSchema>;
export type CompleteFormData = z.infer<typeof CompleteRegistrationSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;
