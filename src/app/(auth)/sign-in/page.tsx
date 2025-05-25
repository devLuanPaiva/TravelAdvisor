"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleSignIn } from "@/components/auth/GoogleSigIn";

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState("sign-in")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

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
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-center mb-6">{mode === "sign-in" ? "Entrar" : "Registrar"} </h1>
        <GoogleSignIn />
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com seu email
            </span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'sign-up' && (
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
          <Button className="w-full" type="submit">
            {mode === "sign-in" ? "Entrar" : "Registrar-se"}
          </Button>
        </form>
        <div className="text-center mt-3">
          <button onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}>
            {mode === "sign-in" ? "Não possui conta? Registrar" : "Já possui conta? Entrar"}
          </button>
        </div>
      </div>
    </section>
  );
}
