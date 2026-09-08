import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIFA MED MAJU | Ação Solidária - Ajude a formar uma médica!",
  description:
    "Ação Solidária para custeio da faculdade de Medicina da Maria Júlia Gomes Gabriel. Concorra a uma Moto Honda Pop por apenas R$ 20,00 a cota!",
  keywords: ["rifa", "medicina", "maria julia", "moto honda pop", "ação solidária"],
  openGraph: {
    title: "RIFA MED MAJU | Ação Solidária - Moto Honda Pop",
    description: "Cada cota comprada é um passo a mais para a realização do sonho de ser médica. Concorra a 01 Moto Honda Pop por R$ 20,00!",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#07162c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#fcfaf6] text-slate-800 antialiased selection:bg-gold-400 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}
