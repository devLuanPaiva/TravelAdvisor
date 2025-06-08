"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { AuthSection } from "@/components/template/AuthSection";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction] = React.useActionState(resetPassword, null);

  if (!token) return (
    <AuthSection title="Erro" description="Token não fornecido.">
      <p className="text-red-500">Token não fornecido na URL.</p>
    </AuthSection>
  )

  return (
    <AuthSection title="Recuperar Senha" description="Informe sua nova senha abaixo">
      <form action={formAction} className="space-y-4 w-full">
        <input type="hidden" name="token" value={token ?? ""} />
        <Input
          name="newPassword"
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
    </AuthSection>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
