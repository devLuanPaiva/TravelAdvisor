import { signUp } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoogleSignIn } from "@/components/auth/GoogleSigIn";
import { getServerSession } from "next-auth";
export default async function SignUpPage() {
  // const session = await getServerSession();
  // if (session) redirect("/home");
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-center mb-6">Criar conta</h1>
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
            try {
              const res = await signUp(formData);

              if (res.success) {
                if (res.redirect) {
                  return;
                }

                redirect("/sign-in");
              } else {
                console.error("Signup failed:", res.message);
              }
            } catch (error) {
              console.error("Signup error:", error);
            }
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
            autoComplete="new-password"
          />
          <Button className="w-full" type="submit">
            Registrar-se
          </Button>
        </form>
        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-in">Já possui conta? Entrar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
