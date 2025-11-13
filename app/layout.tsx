import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roteiros Automáticos",
  description: "Gere roteiros narrativos estruturados em 10 partes com riqueza de detalhes."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
