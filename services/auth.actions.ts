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
  createCompleteRegistrationSchema,
  EmailFormData,
  createEmailSchema,
  handleZodError,
  LoginFormData,
  createLoginSchema,
  createVerifyCodeSchema,
} from "@/lib/validation";
import { t } from "@/lib/translations/language";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateVereficationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationCodeAction(formData: FormData): Promise<BaseResult> {
  try {
    await connectDB();

    const payload = Object.fromEntries(formData) as EmailFormData;
    const EmailSchema = await createEmailSchema();
    const { email } = EmailSchema.parse(payload);

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return {
        success: false,
        error: await t("registration", "userExists"),
      };
    }

    const verificationCode = generateVereficationCode();
    await redis.setex(`verification${email}`, 15 * 60, verificationCode);

    const { error } = await resend.emails.send({
      from: "Ame <me@support.pokroviteli.online>",
      to: [email],
      subject: await t("email", "verificationSubject"),
      react: EmailTemplate({ firstName: verificationCode }),
    });

    if (error) {
      return {
        success: false,
        error: await t("registration", "sendError"),
      };
    }

    return {
      success: true,
      message: await t("registration", "codeSent"),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    return {
      success: false,
      error: await t("common", "somethingWentWrong"),
    };
  }
}

export async function verifyCodeAction(formData: FormData): Promise<BaseResult> {
  try {
    const payload = Object.fromEntries(formData) as CodeFormData;
    const VerifyCodeSchema = await createVerifyCodeSchema();
    const { email, code } = VerifyCodeSchema.parse(payload);

    const storedCode = await redis.get(`verification${email}`);

    if (!storedCode) {
      return {
        success: false,
        error: await t("registration", "codeExpired"),
      };
    }
    if (storedCode !== code) {
      return {
        success: false,
        error: await t("registration", "invalidCode"),
      };
    }

    await redis.del(`verification${email}`);

    await redis.setex(`pending-registration${email}`, 30 * 60, "pending");

    return {
      success: true,
      message: await t("registration", "emailVerified"),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }

    return {
      success: false,
      error: await t("common", "somethingWentWrong"),
    };
  }
}

export async function completeRegistrationAction(formData: FormData): Promise<BaseResult> {
  try {
    await connectDB();

    const payload = Object.fromEntries(formData) as CompleteFormData;

    const CompleteRegistrationSchema = await createCompleteRegistrationSchema();
    const { email, password, firstName, lastName, phone } =
      CompleteRegistrationSchema.parse(payload);

    const pendingRegistration = await redis.get(`pending-registration${email}`);
    if (!pendingRegistration) {
      return {
        success: false,
        error: await t("registration", "sessionExpired"),
      };
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return {
        success: false,
        error: await t("registration", "userExists"),
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
      message: await t("registration", "success"),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    return {
      success: false,
      error: await t("common", "somethingWentWrong"),
    };
  }
}

export async function loginAction(prevState: BaseResult, formData: FormData): Promise<BaseResult> {
  await connectDB();
  const payload = Object.fromEntries(formData) as LoginFormData;
  const LoginSchema = await createLoginSchema();
  try {
    const { email, password } = LoginSchema.parse(payload);
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: await t("login", "invalidCredentials"),
        email,
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        success: false,
        error: await t("login", "invalidPassword"),
        email,
      };
    }

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

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleZodError(error);
    }
    return {
      success: false,
      error: await t("common", "somethingWentWrong"),
    };
  }
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
}
