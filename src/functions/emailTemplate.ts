import { resend } from "@/lib/email/resend";

interface EmailTemplate {
  email: string;
  name?: string;
  subject: string;
  resetLink?: string;
  code?: string;
  text1?: string;
  text2?: string;
  text3?: string;
}

export async function emailTemplate({
  email,
  name,
  resetLink,
  code,
  text1,
  text2,
  text3,
  subject,
}: Readonly<EmailTemplate>) {
  return await resend.emails.send({
    from: "travel@traveladvisor.site",
    to: email ?? "",
    subject: subject,
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
        <h2 style="font-size: 24px; margin-bottom: 20px; color: #ffffff;">Olá, ${name ?? "usuário"}!</h2>
        ${
          text1
            ? `
          <p style="font-size: 16px; margin-bottom: 20px; color: #ffffff;">
            ${text1}
          </p>
        `
            : ""
        }
        ${
          text2
            ? `
          <p style="font-size: 16px; margin-bottom: 30px; color: #ffffff;">
            ${text2}
          </p>
        `
            : ""
        }
        ${
          resetLink
            ? `
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
        `
            : ""
        }
        ${
          code
            ? `
          <p style="font-size: 16px; margin-bottom: 30px; color: #ffffff;">
            Seu código de verificação é: <strong>${code}</strong>
          </p>
        `
            : ""
        }
        ${
          text3
            ? `
          <p style="margin-top: 40px; font-size: 12px; color: #cccccc;">
            ${text3}
          </p>
        `
            : ""
        }
      </div>
    `,
  });
}
