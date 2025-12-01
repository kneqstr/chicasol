"use server";
import redis from "@/lib/redis";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import {
  clearAuthCookies,
  createAccessToken,
  createRefreshToken,
  hashToken,
  setAuthCookies,
} from "@/lib/auth";
import { connectDB } from "@/lib/db";
import sessionModel from "@/models/session.model";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { BaseResult } from "@/types/auth";
import {
  CodeFormData,
  CompleteFormData,
  CompleteRegistrationSchema,
  EmailFormData,
  EmailSchema,
  handleZodError,
  LoginFormData,
  LoginSchema,
  VerifyCodeSchema,
} from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateVereficationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationCodeAction(formData: FormData): Promise<BaseResult> {
  try {
    await connectDB();

    const payload = Object.fromEntries(formData) as EmailFormData;
    const { email } = EmailSchema.parse(payload);

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return {
        success: false,
        error: "Користувач з таким емейлом вже існує",
      };
    }

    const verificationCode = generateVereficationCode();

    await redis.setex(`verification${email}`, 15 * 60, verificationCode);

    const { error } = await resend.emails.send({
      from: "Ame <me@support.pokroviteli.online>",
      to: [email],
      subject: "Verification codes",
      react: EmailTemplate({ firstName: verificationCode }),
    });

    if (error) {
      return {
        success: false,
        error: "Помилка при надсиланні коду. Спробуйте пізніше.",
      };
    }

    return {
      success: true,
      message: "Код підтвердження надіслано на ваш email",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Введiть корректний email",
      };
    }
    return {
      success: false,
      error: "Сталася помилка. Спробуйте пізніше",
    };
  }
}

export async function verifyCodeAction(formData: FormData): Promise<BaseResult> {
  try {
    const payload = Object.fromEntries(formData) as CodeFormData;
    const { email, code } = VerifyCodeSchema.parse(payload);

    const storedCode = await redis.get(`verification${email}`);

    if (!storedCode) {
      return {
        success: false,
        error: "Код застарів чи не існує. Запитайте новий код.",
      };
    }
    if (storedCode !== code) {
      return {
        success: false,
        error: "Невірний код підтвердження",
      };
    }

    await redis.del(`verification${email}`);

    await redis.setex(`pending-registration${email}`, 30 * 60, "pending");

    return {
      success: true,
      message: "Email успішно підтверджено",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Невірний формат коду",
      };
    }

    return {
      success: false,
      error: "Сталася помилка. Спробуйте пізніше.",
    };
  }
}

export async function completeRegistrationAction(formData: FormData): Promise<BaseResult> {
  try {
    await connectDB();

    const payload = Object.fromEntries(formData) as CompleteFormData;

    const { email, password, firstName, lastName, phone } =
      CompleteRegistrationSchema.parse(payload);

    const pendingRegistration = await redis.get(`pending-registration${email}`);
    if (!pendingRegistration) {
      return {
        success: false,
        error: "Сесія реєстрації закінчилася. Почніть знову.",
      };
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return {
        success: false,
        error: "Користувач з таким емейлом вже існує",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      isVerified: true,
    });

    const accessToken = await createAccessToken({
      sub: user._id.toString(),
      email: user.email,
    });

    const refreshToken = await createRefreshToken({
      sub: user._id.toString(),
    });

    const hashedRefreshToken = await hashToken(refreshToken);

    await sessionModel.create({
      user: user._id,
      refreshToken: hashedRefreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    });

    await setAuthCookies({ accessToken, refreshToken });
    await redis.del(`pending-registration${email}`);
    return {
      success: true,
      message: "Реєстрація успішно завершена",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { error: errorMessage, fieldErrors } = handleZodError(error);
      return {
        success: false,
        error: errorMessage,
        fieldErrors,
      };
    }
    return {
      success: false,
      error: "Сталася помилка. Спробуйте пізніше.",
    };
  }
}

export async function loginAction(formData: FormData): Promise<BaseResult> {
  await connectDB();

  const payload = Object.fromEntries(formData) as LoginFormData;

  const { email, password, callbackUrl } = LoginSchema.parse(payload);

  if (!email || !password) return { success: false, error: "Заповнiть поля" };

  const user = await User.findOne({ email });
  if (!user) return { success: false, error: "Даннi форми не вiдповiднi" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { success: false, error: "Даннi форми не вiдповiднi" };

  const accessToken = await createAccessToken({ sub: user._id.toString(), email: user.email });
  const refreshToken = await createRefreshToken({ sub: user._id.toString() });

  const hashedRefreshToken = await hashToken(refreshToken);

  await sessionModel.create({
    user: user._id,
    refreshToken: hashedRefreshToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  });

  await setAuthCookies({ accessToken, refreshToken });
  redirect(callbackUrl);
}

export async function logoutAction() {
  await connectDB();
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (refreshToken) {
    const hashedRefreshToken = await hashToken(refreshToken);
    await sessionModel.updateOne({ refreshToken: hashedRefreshToken }, { revoked: true });
  }
  await clearAuthCookies();
  redirect("/login");
}
