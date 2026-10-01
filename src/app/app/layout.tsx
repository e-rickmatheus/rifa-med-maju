import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plataforma Oficial - Maria Júlia Medicina",
  description: "Acesse a plataforma central com as campanhas, cotas da rifa e atualizações da futura médica Maria Júlia.",
  openGraph: {
    title: "Plataforma Oficial - Maria Júlia Medicina",
    description: "Acesse a plataforma central com as campanhas, cotas da rifa e atualizações da futura médica Maria Júlia.",
    images: [{ url: "/images/maju-hero-hd.png", width: 1200, height: 630 }],
    type: "website",
    locale: "pt_BR",
  },
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
