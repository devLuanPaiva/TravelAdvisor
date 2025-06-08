'use client';
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/actions";
import { MotionProgressBar } from "@/components/ui/progress";
import { AuthSection } from "@/components/template/AuthSection";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      const response = await requestPasswordReset(email);
      if (response.success) {
        setMessage(response.message || "Solicitação enviada com sucesso.");
        setMessageType("success");
      } else {
        setMessage(response.message || "Erro ao solicitar recuperação de senha.");
        setMessageType("error");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || "Erro inesperado");
      } else {
        setMessage("Erro inesperado");
      }
      setMessageType("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 2500);
    }
  };

  return (
    <AuthSection title="Recuperar Senha" description="Informe seu email abaixo para recuperar sua senha" message={message} messageType={messageType}>
      {isLoading && <MotionProgressBar />}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processando..." : "Enviar"}
        </Button>
      </form>

      <Link href="/sign-in" className="text-sm text-gray-600 mt-4 block">Voltar</Link>
    </AuthSection>
  );
}
