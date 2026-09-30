import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaquinha Solidária • Ajude a Maju a se Formar em Medicina",
  description:
    "Contribua com a vaquinha solidária da Maria Júlia Gomes Gabriel. Cada doação é um passo decisivo rumo ao tão sonhado diploma de médica na UNIFENAS.",
  openGraph: {
    title: "Vaquinha Solidária • Ajude a Maju a se Formar em Medicina",
    description:
      "Faça sua doação de qualquer valor e ajude a custear os períodos finais de Medicina da Maria Júlia Gomes Gabriel na UNIFENAS.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function VaquinhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
