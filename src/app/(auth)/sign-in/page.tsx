"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleSignIn } from "@/components/auth/GoogleSigIn";
import { MotionProgressBar } from "@/components/ui/progress";
import { AuthSection } from "@/components/template/AuthSection";

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState("sign-in");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setIsLoading(true);
    try {
      if (mode === "sign-in") {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        router.push("/home");
      } else if (mode === "sign-up") {
        const response = await fetch("/api/sign-up", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message ?? "Erro ao registrar");
        }
        setMode("sign-in");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <AuthSection title={mode === "sign-in" ? "Entrar" : "Registrar-se"}
>
      <GoogleSignIn />
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground text-xs sm:text-sm lg:text-base">
            Ou continue com seu email
          </span>
        </div>
      </div>
      {isLoading && <MotionProgressBar />}

      <form className="space-y-4 w-full flex flex-col items-center pb-6" onSubmit={handleSubmit}>
        {mode === "sign-up" && (
          <Input
            name="name"
            placeholder="Nome"
            type="text"
            required
            autoComplete="name"
          />
        )}
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="current-password"
        />
        <Link href="/forgot-password" className="text-xs sm:text-sm lg:text-base text-gray-500 hover:text-gray-700 self-end text-right">Esqueci minha senha</Link>
        <Button className="w-full" type="submit">
          {mode === "sign-in" ? "Entrar" : "Registrar-se"}
        </Button>
      </form>
      <div className="text-center mt-3">
        <button
          onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
          className="text-xs sm:text-sm lg:text-base text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {mode === "sign-in"
            ? "Não possui conta? Registrar"
            : "Já possui conta? Entrar"}
        </button>
      </div>
    </AuthSection>
  );
}
