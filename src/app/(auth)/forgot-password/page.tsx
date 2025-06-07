"use client";
import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthSection } from "@/components/template/AuthSection";

const requestPasswordResetWithForm = async (
  prevState: unknown,
  formData: FormData
) => {
  const emailValue = formData.get("email");
  const email = typeof emailValue === "string" ? emailValue : "";
  return await requestPasswordReset(email);
};

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(
    requestPasswordResetWithForm,
    null
  );

  return (
    <AuthSection title="Recuperar Senha" description="Informe seu email abaixo para recuperar sua senha">
      <form action={formAction} className="space-y-4 w-full">
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
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
