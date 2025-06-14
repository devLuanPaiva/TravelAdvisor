import db from "@/lib/db/db";
import NextAuth from "next-auth";
import { signInSchema } from "@/lib/schema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const adapter = PrismaAdapter(db);
const handler = NextAuth({
  adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validated = signInSchema.parse(credentials);
        const user = await db.user.findUnique({
          where: { email: validated.email },
        });
        if (!user) throw new Error("Usuário não encontrado.");
        if (!user.emailVerified) {
          throw new Error("E-mail não verificado. Verifique seu e-mail antes de fazer login.");
        }
        if (user.password !== validated.password) {
          throw new Error("Credenciais inválidas.");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
