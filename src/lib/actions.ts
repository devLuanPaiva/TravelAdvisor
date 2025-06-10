"use server";
import db from "@/lib/db/db";
import { v4 as uuidv4 } from "uuid";
import { addHours, addMinutes } from "date-fns";
import { resetPasswordSchema, signUpSchema } from "@/lib/schema";
import executeAction from "./executeAction";

import { ZodError } from "zod";
import { emailTemplate, genetateCode } from "@/functions";

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
        signUpSchema.parse({ name, email, password });
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
      const code = genetateCode();
      const expiry = addMinutes(new Date(), 10);

      const newUser = await db.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password,
          resetToken: code,
          resetTokenExpiry: expiry,
        },
      });
      
      emailTemplate({
        subject: "Código de verificação do Travel Advisor",
        email: newUser.email ?? "",
        name: newUser.name ?? "usuário",
        code: code,
        text1: "Você tentou se cadastrar no Travel Advisor.",
        text2:
          "Para concluir o cadastro, insira o código abaixo no campo de verificação.",
        text3: "Se você não tentou se cadastrar, ignore este e-mail.",
      });
      return newUser;
    },
    successMessage: "Verifique seu e-mail para o código de verificação.",
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
      emailTemplate({
        subject: "Redefinição de senha do Travel Advisor",
        email: user.email ?? "",
        resetLink,
        name: user.name ?? "usuário",
        text1: "Você solicitou a redefinição de senha da sua conta.",
        text2:
          "Clique no botão abaixo para redefinir sua senha. Este link expira em 1 hora.",
        text3: "Se você não solicitou essa alteração, ignore este e-mail.",
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

      try {
        const validatedPassword = resetPasswordSchema.parse({
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
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "errors" in error &&
          Array.isArray((error as { errors: { message: string }[] }).errors) &&
          ((error as { errors: { message: string }[] }).errors.length > 0)
        ) {
          throw new Error((error as { errors: { message: string }[] }).errors[0].message);
        }
        throw error;
      }
    },
    successMessage: "Senha redefinida com sucesso",
  });
};
export { signUp, requestPasswordReset, resetPassword };
