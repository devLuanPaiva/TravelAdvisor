import {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
} from "../src/lib/schema";

describe("Schemas", () => {
  it("should validate sign up schema", () => {
    const result = signUpSchema.safeParse({
      name: "Usuario Teste",
      email: "teste@email.com",
      password: "Senha@123",
    });
    expect(result.success).toBe(true);
  });
});
