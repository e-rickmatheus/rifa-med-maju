"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Calendar, CalendarPlus, ChevronRight } from "lucide-react";
import { formatCurrency, generateGoogleCalendarUrl } from "@/lib/utils";

interface HeroSectionProps {
  price?: number;
  prize?: string;
  drawDate?: string;
}

export default function HeroSection({
  price = 20,
  prize = "01 MOTO HONDA POP",
  drawDate = "24/07/2027",
}: HeroSectionProps) {
  const calendarUrl = generateGoogleCalendarUrl();

  return (
    <section className="relative overflow-hidden bg-navy text-pearl pt-20 pb-28 sm:pt-28 sm:pb-36 border-b border-navy-800">
      {/* Luz ambiente sutil */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-antique-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna Editorial (Texto & Citação do Sonho) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tag Pre-Header */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-antique-400" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-antique-400 font-sans font-semibold">
                Ação Solidária • Medicina UNIFENAS
              </span>
            </div>

            {/* A Citação Principal em Grande Escala Serifada Editorial */}
            <div className="space-y-6">
              <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-pearl leading-[1.25] tracking-tight italic">
                &ldquo;Cada número comprado é um passo a mais para a realização de um sonho:{" "}
                <span className="text-pearl not-italic font-medium">
                  me tornar médica e cuidar de vidas com amor e dedicação.
                </span>
                &rdquo;
              </blockquote>

              <p className="text-base sm:text-lg text-pearl/75 font-sans font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Em prol de ajuda para o custeio da minha faculdade de Medicina na <strong className="text-pearl font-medium">UNIFENAS</strong>. Ao adquirir um bilhete de{" "}
                <strong className="text-pearl font-medium">{formatCurrency(price)}</strong>, você apoia diretamente minha formação e concorre a{" "}
                <strong className="text-pearl font-medium">{prize}</strong>.
              </p>
            </div>

            {/* Faixa Nobre do Prêmio e Sorteio (Sem boxes genéricos) */}
            <div className="pt-2 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-antique-300/80 font-sans font-medium block">
                  Prêmio Principal
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-pearl tracking-tight">
                  {prize}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="text-xs text-pearl/70 font-sans">
                    Sorteio oficial em <strong className="text-pearl font-medium">{drawDate}</strong>
                  </span>
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-antique-300 hover:text-pearl font-sans transition-colors underline underline-offset-4 decoration-antique-400/40"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-antique-400" />
                    <span>Lembrete no Google Agenda</span>
                  </a>
                </div>
              </div>

              {/* Valor Unitário */}
              <div className="text-center sm:text-right border-l-0 sm:border-l sm:border-navy-800 sm:pl-8">
                <span className="text-[10px] uppercase tracking-widest text-antique-300/80 font-sans font-medium block">
                  Valor por Cota
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-pearl">
                  {formatCurrency(price)}
                </span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#numeros"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primaryBlue hover:bg-primaryBlue-hover text-white font-sans font-semibold text-sm tracking-wide shadow-lg hover:shadow-primaryBlue/20 transition-all duration-300"
              >
                <span>Escolher Meu Número</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#premio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-pearl/20 text-pearl/90 hover:text-pearl hover:border-pearl/40 font-sans font-medium text-sm transition-all"
              >
                <span>Conhecer a Moto</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna da Imagem (MAJU PNG 1 Integrada Organicamente) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] flex flex-col items-center">
              {/* Círculo suave de fundo que ambienta a foto */}
              <div className="absolute top-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-b from-navy-800/60 to-transparent blur-xl pointer-events-none" />

              <div className="relative w-full aspect-[139/220] max-h-[500px] flex items-center justify-center">
                <Image
                  src="/images/maju-png-1.png"
                  alt="Maria Júlia Gomes Gabriel - Estudante de Medicina"
                  fill
                  sizes="(max-width: 768px) 300px, 360px"
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
                  priority
                />
              </div>

              {/* Assinatura sutil abaixo da foto */}
              <div className="mt-4 text-center">
                <p className="text-base font-serif font-medium text-pearl">
                  Maria Júlia Gomes Gabriel
                </p>
                <p className="text-xs uppercase tracking-widest text-antique-400/90 font-sans font-medium mt-0.5">
                  Estudante de Medicina • UNIFENAS
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
