import VerifyPage from "@/components/auth/verify-form";

const Verify = () => {
  return <VerifyPage />;
};

export default Verify;

// "use client";

// import { verifyCodeAction } from "@/services/auth.actions";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { BaseResult } from "@/types/auth";

// export default function VerifyPage() {
//   const [state, setState] = useState<BaseResult>({
//     success: false,
//     error: undefined,
//     message: undefined,
//   });
//   const [email, setEmail] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const savedEmail = sessionStorage.getItem("registrationEmail");
//       if (savedEmail) {
//         setEmail(savedEmail);
//       } else {
//         router.push("/register");
//       }
//     }, 0);

//     return () => clearTimeout(timer);
//   }, [router]);

//   async function handleSubmit(formData: FormData) {
//     const result = await verifyCodeAction(formData);
//     setState(result);
//     if (result.success) {
//       router.push("/complete-register");
//     }
//   }

//   if (!email) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">Загрузка...</div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md p-8 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Подтверждение email</h1>

//         <p className="text-gray-600 text-center mb-6">
//           Мы отправили 6-значный код на <strong>{email}</strong>
//         </p>

//         {state.error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
//             {state.error}
//           </div>
//         )}

//         <form action={handleSubmit}>
//           <input type="hidden" name="email" value={email} />

//           <div className="mb-6">
//             <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
//               Код подтверждения
//             </label>
//             <input
//               id="code"
//               name="code"
//               type="text"
//               required
//               maxLength={6}
//               pattern="[0-9]{6}"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
//               placeholder="000000"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Подтвердить
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <Link href="/register" className="text-blue-600 hover:text-blue-800 text-sm">
//             Вернуться к регистрации
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }
