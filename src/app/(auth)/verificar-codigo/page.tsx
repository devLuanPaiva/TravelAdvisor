'use client';
import { AuthSection } from "@/components/template/AuthSection";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp";

function CodeVerification() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const searchParams = useSearchParams();
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

    const email = searchParams.get('email');
    if (!email) {
        return (
            <AuthSection title="Erro" description="E-mail não fornecido.">
                <p className="text-red-500">E-mail não fornecido na URL.</p>
            </AuthSection>
        );
    }

    const handleSubmit = async () => {
        const formattedCode = `${code.slice(0, 3)}-${code.slice(3, 6)}`;
        try {
            const res = await fetch('/api/validation', {
                method: 'POST',
                body: JSON.stringify({ email, code: formattedCode }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            if (data.success) {
                setMessage('Cadastro confirmado!');
                setMessageType('success');
                router.push("/sign-in");
            } else {
                setMessage(data.message ?? 'Código inválido.');
                setMessageType('error');
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message || "Erro inesperado");
            } else {
                setMessage("Erro inesperado");
            }
            setMessageType("error");
        }
    };

    return (
        <AuthSection title="Verificar Código" description="Informe o código de verificação abaixo">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="space-y-4 w-full"
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

                <Button type="submit" className="w-full">
                    Enviar
                </Button>
            </form>

            {message && (
                <div
                    className={`w-full mt-4 text-center text-xs p-2 rounded-md font-semibold ${messageType === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {message}
                </div>
            )}

        </AuthSection>
    );
}

export default function VerificarCodigoPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CodeVerification />
        </Suspense>
    );
}