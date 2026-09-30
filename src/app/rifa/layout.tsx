import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rifa Solidária Honda Pop • Medicina Maria Júlia",
  description:
    "Participe da Rifa Solidária em prol da formação em Medicina de Maria Júlia Gomes Gabriel (UNIFENAS). Concorra a 01 Moto Honda Pop 110i ES 0km por apenas R$ 20,00 a cota!",
  openGraph: {
    title: "Rifa Solidária Honda Pop • Medicina Maria Júlia",
    description:
      "Concorra a 01 Moto Honda Pop 110i ES 0km por R$ 20,00 a cota e ajude a Maju a concluir a faculdade de Medicina!",
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
