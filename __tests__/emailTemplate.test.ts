import { emailTemplate } from "../src/functions";
import { resend } from "../src/lib/email/resend";

jest.mock("../src/lib/email/resend", () => ({
    resend: {
        emails: {
            send: jest.fn(),
        },
    },
}));

describe("emailTemplate", () => {
    const mockedSend = resend.emails.send as jest.Mock;

    beforeEach(() => {
        mockedSend.mockClear();
    });

    it("must send an email with basic text", async () => {
        await emailTemplate({
            email: "test@example.com",
            name: "João",
            subject: "Assunto de Teste",
            text1: "Texto principal",
        });

        expect(mockedSend).toHaveBeenCalledTimes(1);
        expect(mockedSend).toHaveBeenCalledWith(
            expect.objectContaining({
                to: "test@example.com",
                subject: "Assunto de Teste",
                html: expect.stringContaining("Olá, João!"),
            })
        );
    });
    it("uses 'usuário' as default name if not provided", async () => {
        await emailTemplate({
            email: "anon@example.com",
            subject: "Teste sem nome",
            text1: "Olá!",
        });

        expect(mockedSend).toHaveBeenCalledWith(
            expect.objectContaining({
                html: expect.stringContaining("Olá, usuário!"),
            })
        );
    });
})