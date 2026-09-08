"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Calendar, Award, ArrowDown, ShieldCheck, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-850 text-white pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna de Texto & Proposta de Valor */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Tag / Badge Superior */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>AÇÃO SOLIDÁRIA OFICIAL • MEDICINA</span>
            </div>

            {/* Título Principal */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif-luxury tracking-tight leading-tight text-cream-50">
                Ajude a formar uma{" "}
                <span className="block text-gold-300 gold-text-glow italic">
                  médica! 🩺
                </span>
              </h1>
              <p className="text-base sm:text-lg text-cream-200/90 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                &ldquo;Cada número comprado é um passo a mais para a realização de um sonho:{" "}
                <span className="text-gold-200 font-semibold">
                  me tornar médica e cuidar de vidas com amor e dedicação.
                </span>
                &rdquo;
              </p>
            </div>

            {/* Chamada para o Prêmio Principal */}
            <div className="bg-navy-800/80 border-2 border-gold-500/40 rounded-2xl p-6 sm:p-7 shadow-gold backdrop-blur-sm relative group hover:border-gold-400 transition-all duration-300">
              <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-black text-xs uppercase px-3.5 py-1 rounded-full tracking-wider shadow-sm flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Prêmio Especial
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-300/80 font-bold block mb-1">
                    Concorra a
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-display-luxury">
                    {prize}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    Data do Sorteio: <strong className="text-gold-300 font-semibold">{drawDate}</strong>
                  </p>
                </div>

                {/* Box do Valor */}
                <div className="flex flex-col items-center sm:items-end bg-navy-950/70 border border-gold-500/30 px-5 py-3 rounded-xl min-w-[150px]">
                  <span className="text-[10px] tracking-widest text-gold-300 uppercase font-bold">
                    VALOR DA COTA
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
                    {formatCurrency(price)}
                  </div>
                  <span className="text-[10px] text-cream-200/70">Apenas R$ 20 por número</span>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#numeros"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-extrabold text-base shadow-gold-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Escolher Meu Número</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <a
                href="#pix"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gold-400/40 text-cream-100 hover:bg-gold-500/10 hover:border-gold-300 font-semibold text-sm transition-all"
              >
                <span>Ver Dados do PIX</span>
              </a>
            </div>

            {/* Selos de Confiança */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-cream-200/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Chave PIX no nome oficial da Maria Júlia</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                <span>100% destinado aos estudos</span>
              </div>
            </div>
          </div>

          {/* Coluna da Imagem / Foto Oficial de Referência */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Moldura Dourada Elegante */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400/60 shadow-2xl bg-navy-900">
                <div className="relative aspect-[9/16] w-full max-h-[580px] bg-navy-950 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/print-stories-rifa-maju.jpg"
                    alt="Cartaz Oficial da Ação Solidária - Maria Júlia Medicina"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* Legenda sob a foto */}
                <div className="bg-navy-950 p-4 border-t border-gold-500/30 text-center">
                  <p className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
                    Maria Júlia Gomes Gabriel
                  </p>
                  <p className="text-[11px] text-cream-200/80 mt-0.5">
                    Estudante de Medicina • Rumo à Formatura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
