import db from "@/lib/db/db";
import NextAuth from "next-auth";
import { v4 as uuid } from "uuid";
import { schema } from "@/lib/schema";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { encode as defaultEncode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const adapter = PrismaAdapter(db);
const handler = NextAuth({
    adapter,
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
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const validatedCredentials = schema.parse(credentials);

                const user = await db.user.findUnique({
                    where: { email: validatedCredentials.email }
                });


                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user ID found in token");
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });

                if (!createdSession) {
                    throw new Error("Failed to create session");
                }

                return sessionToken;
            }
            return defaultEncode(params);
        },
    },
});

export { handler as GET, handler as POST };