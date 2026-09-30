"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  Stethoscope,
  GraduationCap,
  Heart,
  Gift,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  MapPin,
  Lock,
  ChevronRight,
  Award,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const whatsappNumber = "5537998427884";

  useEffect(() => {
    document.title = "Maria Júlia Gomes Gabriel • Medicina UNIFENAS";
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#0b1526] text-pearl font-sans selection:bg-antique-300 selection:text-navy-950">
      {/* Header Institucional */}
      <header className="sticky top-0 z-40 bg-navy/90 backdrop-blur-md border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Nome */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-antique-400/40 bg-navy-900 flex items-center justify-center text-antique-400">
                <Stethoscope className="w-5 h-5 text-antique-300" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold text-white block leading-tight">
                  Maria Júlia
                </span>
                <span className="text-xs text-antique-300 block font-light">
                  Futura Médica • UNIFENAS
                </span>
              </div>
            </div>

            {/* Menu de Acesso Rápido */}
            <nav className="flex items-center gap-3 sm:gap-6 text-xs uppercase tracking-wider font-semibold">
              <Link
                href="/rifa"
                className="hidden sm:inline-flex items-center gap-1.5 text-pearl/80 hover:text-pearl transition-colors"
              >
                <Gift className="w-3.5 h-3.5 text-antique-400" />
                <span>Rifa da Moto</span>
              </Link>

              <Link
                href="/vaquinha"
                className="hidden sm:inline-flex items-center gap-1.5 text-green-300 hover:text-green-200 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-green-400 text-green-400" />
                <span>Vaquinha</span>
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, vim pelo seu site oficial!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald hover:bg-emerald-700 text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Principal - Foto e Nome com Design Editorial Luxuoso */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Luz de Fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-antique-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Coluna 1: Apresentação e Vocação */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-antique-400/30 text-antique-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-antique-400" />
                <span>Portal Oficial • Medicina UNIFENAS</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1]">
                  Maria Júlia <br />
                  <span className="font-light italic text-antique-300">Gomes Gabriel</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-sans font-light max-w-xl mx-auto lg:mx-0">
                  Estudante de Medicina apaixonada pelo cuidado humanizado e pela ciência médica.
                </p>
              </div>

              <blockquote className="border-l-2 border-antique-400/50 pl-4 py-1 text-base sm:text-lg text-pearl/80 italic font-serif max-w-xl mx-auto lg:mx-0 text-left">
                &ldquo;Cada dia na faculdade de medicina é a concretização de um chamado: aprender a curar,
                aliviar a dor e dedicar minha vida a quem mais precisa.&rdquo;
              </blockquote>

              {/* Botões de Ação Imediata */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/rifa"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-semibold text-sm shadow-xl shadow-fuchsia-700/20 transition-all group"
                >
                  <Gift className="w-4 h-4 text-fuchsia-200" />
                  <span>Acessar Rifa Solidária (Moto Pop)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/vaquinha"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-navy-800 hover:bg-navy-700 border border-navy-700 text-pearl font-semibold text-sm transition-all"
                >
                  <Heart className="w-4 h-4 text-green-400 fill-green-400" />
                  <span>Doar na Vaquinha Livre</span>
                </Link>
              </div>

              {/* Badges de Confiança */}
              <div className="pt-6 border-t border-navy-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-antique-400" />
                  <span>Aluna UNIFENAS • Alfenas/MG</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald" />
                  <span>Chave PIX Oficial Verificada</span>
                </div>
              </div>
            </div>

            {/* Coluna 2: Foto Oficial da Maria Júlia */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-antique-400/30 shadow-2xl shadow-navy-950/80 bg-navy-900 group">
                <Image
                  src="/images/maju-hero-hd.png"
                  alt="Maria Júlia Gomes Gabriel - Estudante de Medicina"
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                
                {/* Degradê e Legenda Sobreposta */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-0 inset-x-0 p-6 text-center space-y-1">
                  <span className="text-xs uppercase tracking-widest text-antique-300 font-semibold block">
                    Maria Júlia Gomes Gabriel
                  </span>
                  <p className="text-sm font-serif italic text-pearl/90">
                    &ldquo;Cuidar de vidas com amor e dedicação&rdquo;
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Os 2 Pilares de Apoio: Rifa vs. Vaquinha */}
      <section className="py-20 bg-[#070e1c] border-t border-navy-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-antique-400 font-bold">
              Como você pode fazer parte desta jornada
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Escolha Como Participar
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Cada número comprado ou cada doação voluntária aproxima Maria Júlia do jaleco branco e do diploma médico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Rifa Oficial */}
            <div className="bg-navy-900 rounded-3xl border border-navy-700 p-8 sm:p-10 flex flex-col justify-between hover:border-fuchsia-400/60 transition-all group relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-fuchsia-950/40 border border-fuchsia-800/40 text-fuchsia-300 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-fuchsia-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-700/50">
                    R$ 20 por cota
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-fuchsia-200 transition-colors">
                    Rifa da Moto Honda Pop 0km
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Compre uma ou mais cotas da nossa rifa oficial, escolha seus números da sorte e concorra a
                    uma moto 0km! Sorteio confirmado em <strong>24/07/2027</strong>.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-navy-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                    <span>Grade de cotas interativa com reserva online</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                    <span>Pagamento instantâneo via PIX com registro oficial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                    <span>Envio de bilhete nominal com foto para o WhatsApp</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/rifa"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Ver Cotas da Rifa</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Vaquinha Solidária */}
            <div className="bg-navy-900 rounded-3xl border border-navy-700 p-8 sm:p-10 flex flex-col justify-between hover:border-green-400/60 transition-all group relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-green-950/40 border border-green-800/40 text-green-400 flex items-center justify-center">
                    <Heart className="w-6 h-6 fill-green-400 text-green-400" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-green-950 text-green-300 border border-green-800">
                    Qualquer Valor Livre
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-green-300 transition-colors">
                    Vaquinha Solidária da Maju
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Prefere doar diretamente sem participar do sorteio? Toda quantia é bem-vinda e vai diretamente
                    para o fundo de custeio dos estudos e materiais de medicina.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-navy-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span>Doação a partir de R$ 5,00, R$ 20,00 ou livre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span>Ajuda para os custos da faculdade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span>Agradecimento pessoal da Maria Júlia no WhatsApp</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/vaquinha"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Doar na Vaquinha</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trajetória & Sonho em Fotos */}
      <section className="py-20 bg-navy border-t border-navy-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-antique-400 font-bold">
              Vocação desde a Infância
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              A História por Trás da Futura Médica
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Foto 1: Infância na Farmácia */}
            <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-700/80 space-y-4 pb-4 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/maju-infancia-farmacia-balcao.jpeg"
                  alt="Maria Júlia na infância na farmácia da família em Biquinhas"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-5 space-y-1">
                <span className="text-xs uppercase font-bold text-antique-400">1. As Raízes em Biquinhas</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Crescendo entre as prateleiras de farmácia no interior, ouvindo e aprendendo que cuidar é uma forma de amar.
                </p>
              </div>
            </div>

            {/* Foto 2: Com os Pais */}
            <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-700/80 space-y-4 pb-4 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/maju-infancia-pais-bolo.jpeg"
                  alt="Maria Júlia com a mãe e o pai na infância"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-5 space-y-1">
                <span className="text-xs uppercase font-bold text-antique-400">2. O Exemplo Familiar</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Vendo minha mãe e meu pai ajudarem a quem precisasse, mesmo quando não tinham muito para oferecer.
                </p>
              </div>
            </div>

            {/* Foto 3: Carinho & Afeto com Crianças (Rosto 100% Visível) */}
            <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-700/80 space-y-4 pb-4 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/maju-irmao-carinho.jpeg"
                  alt="Maria Júlia em momento de carinho mútuo com criança"
                  fill
                  className="object-cover object-[center_12%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-5 space-y-1">
                <span className="text-xs uppercase font-bold text-antique-400">3. Carinho & Empatia</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A pureza do vínculo com as crianças: o carinho recíproco e a sensibilidade humana que acolhem e curam.
                </p>
              </div>
            </div>

            {/* Foto 4: Bloco Cirúrgico (Rosto e Olhar Cirúrgico 100% Visíveis) */}
            <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-700/80 space-y-4 pb-4 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/maju-cirurgia-foco.jpeg"
                  alt="Maria Júlia no bloco cirúrgico UNIFENAS"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-5 space-y-1">
                <span className="text-xs uppercase font-bold text-emerald">4. Bloco Cirúrgico</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dedicação técnica, precisão e foco intenso em procedimentos cirúrgicos e suturas no hospital-escola.
                </p>
              </div>
            </div>

            {/* Foto 5: Pediatria (Rosto da Maju e Bebê Visíveis) */}
            <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-700/80 space-y-4 pb-4 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/maju-pediatria-bebe-colo.jpeg"
                  alt="Maria Júlia em atendimento pediátrico"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-5 space-y-1">
                <span className="text-xs uppercase font-bold text-emerald">5. Pediatria & Vida</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Acolhendo os pequenos com carinho e delicadeza em consultas ambulatoriais e enfermarias.
                </p>
              </div>
            </div>

            {/* Foto 6: Humanização e Jaleco (Rosto e Jaleco 100% Visíveis) */}
            <div className="bg-navy-900 rounded-2xl overflow-hidden border border-navy-700/80 space-y-4 pb-4 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/maju-pressao-idosa.jpeg"
                  alt="Maria Júlia com jaleco bordado em atendimento humanizado"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-5 space-y-1">
                <span className="text-xs uppercase font-bold text-emerald">6. Medicina Humanizada</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O olhar nos olhos e a escuta ativa: a certeza de que a sensibilidade médica cura tanto quanto o remédio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé Oficial da Maria Júlia (Idêntico ao da Rifa com Créditos Erick Matheus) */}
      <Footer mode="home" whatsappNumber={whatsappNumber} />
    </main>
  );
}
