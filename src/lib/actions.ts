'use server';
import db from "@/lib/db/db";
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';
import { schema } from "@/lib/schema";
import executeAction from "./executeAction";
import { resend } from "./email/resend";

const signUp = async (formData: FormData) => {
    return executeAction({
        actionFn: async () => {
            const name = formData.get("name")?.toString();
            const email = formData.get("email")?.toString();
            const password = formData.get("password")?.toString();

            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const validatedData = schema.parse({ email, password });

            const existingUser = await db.user.findUnique({
                where: { email: validatedData.email.toLowerCase() }
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const newUser = await db.user.create({
                data: {
                    name,
                    email: validatedData.email.toLowerCase(),
                    password: validatedData.password,
                },
            });

            return newUser;
        },
        successMessage: "Signed up successfully",
    });
};
const requestPasswordReset = async (email: string) => {
    return executeAction({
        actionFn: async () => {
            const user = await db.user.findUnique({
                where: { email: email.toLowerCase() }
            });

            if (!user) {
                throw new Error("No user found with this email");
            }

            const resetToken = uuidv4();
            const resetTokenExpiry = addHours(new Date(), 1);

            await db.user.update({
                where: { email: email.toLowerCase() },
                data: {
                    resetToken,
                    resetTokenExpiry
                }
            });
            const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
            await resend.emails.send({
                from: 'onboarding@traveladvisor.com',
                to: email ?? '',
                subject: 'Redefinição de senha',
                html: `
                    <p>Olá, ${user.name ?? "usuário"}!</p>
                    <p>Você solicitou a redefinição de senha. Clique no link abaixo para continuar:</p>
                    <p><a href="${resetLink}">Redefinir Senha</a></p>
                    <p>Este link expira em 1 hora.</p>
                `
            })

            return { email: user.email };
        },
        successMessage: "If an account exists with this email, you'll receive a password reset link"
    });
};
const resetPassword = async (prevState: unknown, formData: FormData) => {
    const token = formData.get("token")?.toString();
    const newPassword = formData.get("newPassword")?.toString();

    if (!token || !newPassword) {
        return {
            success: false,
            message: "Token and new password are required",
        };
    }

    return executeAction({
        actionFn: async () => {
            const user = await db.user.findFirst({
                where: {
                    resetToken: token,
                    resetTokenExpiry: { gt: new Date() }
                }
            });

            if (!user) {
                throw new Error("Invalid or expired token");
            }

            const validatedPassword = schema.parse({ password: newPassword }).password;

            await db.user.update({
                where: { id: user.id },
                data: {
                    password: validatedPassword,
                    resetToken: null,
                    resetTokenExpiry: null
                }
            });

            return { success: true };
        },
        successMessage: "Password updated successfully"
    });
};

export { signUp, requestPasswordReset, resetPassword };