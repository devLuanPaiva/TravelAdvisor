import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Trip Advisor",
  description: "A simple tripadvisor app that helps you find the best destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
