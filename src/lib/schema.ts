import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(6, { message: "O nome de usuário deve ter pelo menos 6 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial",
    }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
      message: "A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial",
    }),
});
export const signInSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

// Tipos (opcional, se precisar exportar)
type SignUpSchema = z.infer<typeof signUpSchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
type SignInSchema = z.infer<typeof signInSchema>;

export { type SignUpSchema, type ResetPasswordSchema, type SignInSchema };