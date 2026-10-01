import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apoie a Maria Júlia rumo ao Jaleco Branco",
  description: "Faça sua doação de qualquer valor e participe de uma história de resiliência, superação e muito amor ao cuidado do próximo.",
  openGraph: {
    title: "Apoie a Maria Júlia rumo ao Jaleco Branco",
    description: "Faça sua doação de qualquer valor e participe de uma história de resiliência, superação e muito amor ao cuidado do próximo.",
    images: [{ url: "/images/maju-pediatria-bebe-colo.jpeg", width: 1200, height: 630 }],
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
