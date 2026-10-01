import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ganhe uma Moto Honda Pop e Apoie um Sonho",
  description: "Cada número comprado me deixa um passo mais perto do diploma médico. Acesse, escolha suas cotas e boa sorte!",
  openGraph: {
    title: "Ganhe uma Moto Honda Pop e Apoie um Sonho",
    description: "Cada número comprado me deixa um passo mais perto do diploma médico. Acesse, escolha suas cotas e boa sorte!",
    images: [{ url: "/images/honda-pop-azul.png", width: 1200, height: 630 }],
    type: "website",
    locale: "pt_BR",
  },
};

export default function RifaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
