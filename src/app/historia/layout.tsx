import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Propósito de Cuidar - Maria Júlia",
  description: "\"Cuidar de alguém é uma das formas mais bonitas de amar.\" Conheça a caminhada de quem dedicou a vida a esse sonho.",
  openGraph: {
    title: "O Propósito de Cuidar - Maria Júlia",
    description: "\"Cuidar de alguém é uma das formas mais bonitas de amar.\" Conheça a caminhada de quem dedicou a vida a esse sonho.",
    images: [{ url: "/images/maju-faculdade-bebe.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "pt_BR",
  },
};

export default function HistoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
