"use client";

import { ExitRegistration } from "@/services/auth.actions";
import { useRouter } from "next/navigation";

export default function ExitButton({ email }: { email: string }) {
  const router = useRouter();

  async function handleExit(formData: FormData) {
    const result = await ExitRegistration(formData);
    if (result.success) {
      router.replace("/register");
    }
  }

  return (
    <form action={handleExit}>
      <input type="hidden" name="email" value={email} />

      <button
        type="submit"
        className="w-full mt-4 text-gray-500 cursor-pointer underline hover:text-gray-600 text-sm p-0 bg-transparent border-none"
      >
        Отменить регистрацию
      </button>
    </form>
  );
}
