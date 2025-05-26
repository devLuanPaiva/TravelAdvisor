import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
export const metadata: Metadata = {
  title: "Travel Advisor - Seu guia de viagens completo",
  description:
    "Descubra destinos incríveis, avalie estabelecimentos e planeje sua próxima viagem com o Travel Advisor. Tudo o que você precisa em um só lugar.",
  keywords: [
    "viagens",
    "destinos turísticos",
    "roteiros",
    "dicas de viagem",
    "hotéis",
    "restaurantes",
    "atrações",
    "resenhas",
    "Travel Advisor",
    "turismo",
  ],
  authors: [
    {
      name: "Desenvolvedor Luan Paiva",
      url: "https://dev-luan-paiva.vercel.app",
    },
  ],
  openGraph: {
    title: "Travel Advisor - Seu guia de viagens completo",
    description:
      "Explore lugares, avalie experiências e planeje roteiros inesquecíveis com o Travel Advisor.",
    url: "https://dev-luan-paiva.vercel.app",
    siteName: "Travel Advisor",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://dev-luan-paiva.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo Travel Advisor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Advisor",
    description:
      "Planeje sua próxima viagem com facilidade usando o Travel Advisor.",
    images: ["https://dev-luan-paiva.vercel.app/logo.png"],
    site: "@traveladvisor",
  },
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1.0",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body cz-shortcut-listen="false" className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
