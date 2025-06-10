"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { Suspense, useState } from "react";
import { MotionProgressBar } from "@/components/ui/progress";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthSection } from "@/components/template/AuthSection";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Loading from "@/components/shared/Loading";

function CodeVerification() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const email = searchParams.get("email");
  if (!email) {
    return (
      <AuthSection title="Erro" description="E-mail não fornecido.">
        <p className="text-red-500">E-mail não fornecido na URL.</p>
      </AuthSection>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setMessageType(null);

    const formattedCode = `${code.slice(0, 3)}-${code.slice(3, 6)}`;
    try {
      const res = await fetch("/api/validation", {
        method: "POST",
        body: JSON.stringify({ email, code: formattedCode }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Cadastro confirmado!");
        setMessageType("success");
        setTimeout(() => {
          router.push("/sign-in");
        }, 1000);
      } else {
        setMessage(data.message ?? "Código inválido.");
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
    <AuthSection
      title="Verificar Código"
      description="Informe o código de verificação abaixo"
      message={message}
      messageType={messageType}
    >
      {isLoading && <MotionProgressBar />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="space-y-4 w-full flex justify-center items-center flex-col"
      >
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processando..." : "Enviar"}
        </Button>
      </form>
      <Link href="/sign-in" className="text-sm text-gray-600 mt-4 block">
        Voltar
      </Link>
    </AuthSection>
  );
}

export default function VerificarCodigoPage() {
  return (
    <Suspense fallback={<Loading message="Carregando..." />}>
      <CodeVerification />
    </Suspense>
  );
}
