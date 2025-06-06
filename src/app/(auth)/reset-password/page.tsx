"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import logo from "@/assets/blackLogo.png";
import { resetPassword } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction] = React.useActionState(resetPassword, null);

  if (!token) return null

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-5">
      <article className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <header className="w-full flex flex-col items-center mb-6">
          <div className="w-full flex justify-center mb-4 space-x-2.5 gap-2.5">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-left">
              Recuperação de Senha
            </h1>
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={100}
              className="h-10 w-10"
            />
          </div>
        </header>
        <form action={formAction} className="space-y-4 w-full">
          <Input
            name="password"
            placeholder="Nova Senha"
            type="password"
            required
            autoComplete="password"
          />

          <Button type="submit" className="w-full">Enviar</Button>
        </form>
        <Link href="/sign-in" className="text-sm text-gray-600 mt-4 block">Voltar</Link>
        {state?.message && (
          <p
            className={`mt-4 font-semibold text-xs ${state.success ? "text-green-500" : "text-red-500"
              }`}
          >
            {state.message}
          </p>
        )}
      </article>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
