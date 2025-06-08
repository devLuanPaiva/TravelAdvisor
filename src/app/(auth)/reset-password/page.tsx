"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useRouter,useSearchParams } from "next/navigation";
import { MotionProgressBar } from "@/components/ui/progress";
import { AuthSection } from "@/components/template/AuthSection";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await resetPassword(null, formData);

      if (result.success) {
        setMessage(result.message || "Senha redefinida com sucesso");
        setMessageType("success");
        setTimeout(() => {
          router.push("/sign-in");
        }, 1500);
      } else {
        setMessage(result.message || "Erro ao redefinir senha");
        setMessageType("error");
      }
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Erro desconhecido");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) return (
    <AuthSection title="Erro" description="Token não fornecido.">
      <p className="text-red-500">Token não fornecido na URL.</p>
    </AuthSection>
  );

  return (
    <AuthSection title="Recuperar Senha" description="Informe sua nova senha abaixo">
      {isLoading && <MotionProgressBar />}
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <input type="hidden" name="token" value={token ?? ""} />
        <Input
          name="newPassword"
          placeholder="Nova Senha"
          type="password"
          required
          autoComplete="password"
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processando..." : "Enviar"}
        </Button>
      </form>
      <Link href="/sign-in" className="text-sm text-gray-600 mt-4 block">Voltar</Link>
      
      {message && (
        <div className={`w-full mt-4 text-center text-xs p-2 rounded-md font-semibold ${
          messageType === "success" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {message}
        </div>
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