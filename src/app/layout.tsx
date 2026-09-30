import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maria Júlia Gomes Gabriel • Medicina UNIFENAS",
  description:
    "Conheça a história de vida e a trajetória da futura médica Maria Júlia Gomes Gabriel (UNIFENAS). Campanhas solidárias e formas de apoio.",
  keywords: ["medicina", "maria julia", "unifenas", "vaquinha", "rifa solidária", "dra maju"],
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><text x='60' y='66' font-size='74' text-anchor='middle' dominant-baseline='central'>🎓</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Maria Júlia Gomes Gabriel • Medicina UNIFENAS",
    description: "Conheça a história e trajetória da futura médica Maria Júlia Gomes Gabriel. Apoie a realização desse grande propósito!",
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
