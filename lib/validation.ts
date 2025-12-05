import { z } from "zod";
import { tz } from "./translations/language";

export async function createEmailValidation() {
  const invalid = await tz("email", "invalid");
  const required = await tz("email", "required");
  const tooLong = await tz("email", "tooLong");

  return z.email(invalid).min(1, required).max(255, tooLong).toLowerCase().trim();
}

export async function createPasswordValidation() {
  const tooShort = await tz("password", "tooShort");
  const tooLong = await tz("password", "tooLong");
  const oneUpper = await tz("password", "oneUpper");
  const oneLower = await tz("password", "oneLower");
  const oneDigit = await tz("password", "oneDigit");
  const oneSpecial = await tz("password", "oneSpecial");

  return z
    .string()
    .min(8, tooShort)
    .max(128, tooLong)
    .regex(/[A-Z]/, oneUpper)
    .regex(/[a-z]/, oneLower)
    .regex(/[0-9]/, oneDigit)
    .regex(/[^A-Za-z0-9]/, oneSpecial);
}

export async function createCodeValidation() {
  const length = await tz("code", "length");
  const numbers = await tz("code", "numbers");

  return z.string().length(6, length).regex(/^\d+$/, numbers);
}

export async function createNameValidation() {
  const tooLong = await tz("name", "tooLong");
  const invalid = await tz("name", "invalid");

  return z
    .string()
    .max(50, tooLong)
    .regex(/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ'\-\s]+$/, invalid)
    .trim()
    .optional();
}

export async function createPhoneValidation() {
  const tooShort = await tz("phone", "tooShort");
  const tooLong = await tz("phone", "tooLong");
  const invalid = await tz("phone", "invalid");

  return z
    .string()
    .min(19, tooShort)
    .max(19, tooLong)
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, invalid)
    .optional();
}

export async function createEmailSchema() {
  return z.object({
    email: await createEmailValidation(),
  });
}

export async function createVerifyCodeSchema() {
  return z.object({
    email: await createEmailValidation(),
    code: await createCodeValidation(),
  });
}

export async function createLoginSchema() {
  const passwordRequired = await tz("password", "required");

  return z.object({
    email: await createEmailValidation(),
    password: z.string().min(1, passwordRequired),
  });
}

export async function createCompleteRegistrationSchema() {
  const passwordConfirmRequired =
    (await tz("password", "confirmRequired")) || "Підтвердження паролю обов'язкове";
  const passwordsMatch = (await tz("password", "passwordsMatch")) || "Паролі не співпадають";

  return z
    .object({
      email: await createEmailValidation(),
      password: await createPasswordValidation(),
      confirmPassword: z.string().min(1, passwordConfirmRequired),
      firstName: await createNameValidation(),
      lastName: await createNameValidation(),
      phone: await createPhoneValidation(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: passwordsMatch,
      path: ["confirmPassword"],
    });
}

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

  const firstError = error.issues[0]?.message || "Validation error";

  return {
    success: false,
    error: firstError,
    fieldErrors,
  };
}

export type EmailFormData = z.infer<z.ZodObject<{ email: z.ZodString }>>;
export type CodeFormData = z.infer<
  z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
  }>
>;
export type LoginFormData = z.infer<
  z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
  }>
>;
export type CompleteFormData = z.infer<
  z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    firstName?: z.ZodOptional<z.ZodString>;
    lastName?: z.ZodOptional<z.ZodString>;
    phone?: z.ZodOptional<z.ZodString>;
  }>
>;
