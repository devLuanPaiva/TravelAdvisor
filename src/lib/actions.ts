"use server";
import db from "@/lib/db/db";
import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";
import { schema } from "@/lib/schema";
import executeAction from "./executeAction";
import { resend } from "./email/resend";

import { ZodError } from "zod";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const name = formData.get("name")?.toString();
      const email = formData.get("email")?.toString();
      const password = formData.get("password")?.toString();

      if (!name || !email || !password) {
        throw new Error("Nome, e-mail e senha são obrigatórios");
      }

      try {
        schema.parse({ name, email, password });
      } catch (error) {
        if (error instanceof ZodError) {
          throw new Error(error.errors[0]?.message || "Erro de validação");
        }
        throw error;
      }

      const existingUser = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        throw new Error("Usuário já cadastrado com este e-mail");
      }

      const newUser = await db.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password,
        },
      });

      return newUser;
    },
    successMessage: "Cadastrado com sucesso",
  });
};

const requestPasswordReset = async (email: string) => {
  return executeAction({
    actionFn: async () => {
      const user = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        throw new Error("Não existe usuário com este email");
      }

      const resetToken = uuidv4();
      const resetTokenExpiry = addHours(new Date(), 1);

      await db.user.update({
        where: { email: email.toLowerCase() },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });
      const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
      await resend.emails.send({
        from: "travel@traveladvisor.site",
        to: email ?? "",
        subject: "Redefinição de senha",
        html: `
                    <div style="
                    background: linear-gradient(to bottom right, #101828, #1e2939, #000);
                    padding: 40px;
                    font-family: Arial, sans-serif;
                    color: #ffffff;
                    text-align: center;
                    border-radius: 10px;
                    ">
                        <img 
                            src="${process.env.NEXTAUTH_URL}/logo.png" 
                            alt="Logo" 
                            style="max-width: 160px; margin-bottom: 30px;" 
                        />
                        <h2 style="font-size: 24px; margin-bottom: 20px;">Olá, ${user.name ?? "usuário"}!</h2>
                        <p style="font-size: 16px; margin-bottom: 20px;">
                            Você solicitou a redefinição de senha da sua conta.
                        </p>
                        <p style="font-size: 16px; margin-bottom: 30px;">
                            Clique no botão abaixo para redefinir sua senha. Este link expira em 1 hora.
                        </p>
                        <a 
                            href="${resetLink}" 
                            style="
                            background-color: #ffffff;
                            color: #000000;
                            padding: 12px 24px;
                            border-radius: 6px;
                            text-decoration: none;
                            font-weight: bold;
                            "
                        >
                            Redefinir Senha
                        </a>
                        <p style="margin-top: 40px; font-size: 12px; color: #cccccc;">
                            Se você não solicitou essa alteração, ignore este e-mail.
                        </p>
                    </div>
            `,
      });

      return { email: user.email };
    },
    successMessage: "O link de redefinição de senha foi enviado para ele.",
  });
};
const resetPassword = async (prevState: unknown, formData: FormData) => {
  const token = formData.get("token")?.toString();
  const newPassword = formData.get("newPassword")?.toString();

  if (!token || !newPassword) {
    return {
      success: false,
      message: "Token e senha obrigatórios",
    };
  }

  return executeAction({
    actionFn: async () => {
      const user = await db.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: { gt: new Date() },
        },
      });

      if (!user) {
        throw new Error("Token inválido ou expirado.");
      }

      const validatedPassword = schema.parse({
        email: user.email,
        password: newPassword,
      }).password;

      await db.user.update({
        where: { id: user.id },
        data: {
          password: validatedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      return { success: true };
    },
    successMessage: "Senha redefinida com sucesso",
  });
};

export { signUp, requestPasswordReset, resetPassword };
