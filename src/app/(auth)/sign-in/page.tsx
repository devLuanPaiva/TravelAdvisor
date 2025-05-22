import Link from "next/link";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import executeAction from "@/lib/executeAction";
import { Button } from "@/components/ui/button";
import { GoogleSignIn } from "@/components/auth/GoogleSigIn";
import { getServerSession } from "next-auth";

export default async function SignInPage() {
  // const session = await getServerSession();
  // if (session) redirect("/home");

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-center mb-6">Entrar</h1>
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
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server";
            await executeAction({
              actionFn: async () => {
                await signIn("credentials", formData);
              },
            });
          }}
        >
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
            Acessar
          </Button>
        </form>
        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-up">Não possui conta? Registrar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
