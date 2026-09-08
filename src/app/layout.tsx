import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rifa Solidaria - Medicina - Maria Julia",
  description:
    "Ação Solidária para custeio da faculdade de Medicina da Maria Júlia Gomes Gabriel (UNIFENAS). Concorra a uma Moto Honda Pop por apenas R$ 20,00 a cota!",
  keywords: ["rifa", "medicina", "maria julia", "unifenas", "moto honda pop", "ação solidária"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>",
  },
  openGraph: {
    title: "Rifa Solidaria - Medicina - Maria Julia",
    description: "Cada cota comprada é um passo a mais para a realização do sonho de ser médica na UNIFENAS. Concorra a 01 Moto Honda Pop por R$ 20,00!",
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
