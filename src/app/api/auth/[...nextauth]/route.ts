import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
const handler = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedCredentials = schema.parse(credentials);

                const user = await db.user.findFirst({
                    where: {
                        email: validatedCredentials.email,
                        password: validatedCredentials.password,
                    },
                });

                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                return user;
            },
        }),
    ],
});

export { handler as GET, handler as POST };