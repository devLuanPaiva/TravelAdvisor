import {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
} from "../src/lib/schema";

describe("signUpSchema", () => {
  it("should validate sign up schema", () => {
    const result = signUpSchema.safeParse({
      name: "Usuario Teste",
      email: "teste@email.com",
      password: "Senha@123",
    });
    expect(result.success).toBe(true);
  });
  it("should fail if the name is short ", () => {
    const result = signUpSchema.safeParse({
      name: "João",
      email: "joao@email.com",
      password: "Senha@123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().name?._errors).toContain(
        "O nome de usuário deve ter pelo menos 6 caracteres"
      );
    }
  });
  it("should fail with weak password", () => {
    const result = signUpSchema.safeParse({
      name: "Usuario Valido",
      email: "valido@email.com",
      password: "senha123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().password?._errors[0]).toMatch(
        /caractere especial/
      );
    }
  });
});
describe("signInSchema", () => {
  it("must validate valid login", () => {
    const result = signInSchema.safeParse({
      email: "login@email.com",
      password: "12345678",
    });
    expect(result.success).toBe(true);
  });
   it('should fail with invalid email', () => {
    const result = signInSchema.safeParse({
      email: 'invalido-email',
      password: '12345678',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().email?._errors[0]).toBe('E-mail inválido');
    }
  });
});
