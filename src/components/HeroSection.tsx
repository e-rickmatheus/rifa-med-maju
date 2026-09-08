"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Calendar, Phone } from "lucide-react";
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
    <section className="relative overflow-hidden bg-navy-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto Principal com a copy exata da imagem de referência */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-slate-300 text-xs font-semibold tracking-wider uppercase">
              Ação Solidária
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-luxury text-white leading-tight">
              &ldquo;Cada número comprado é um passo a mais para a realização de um sonho: me tornar médica e cuidar de vidas com amor e dedicação.&rdquo;
            </h1>

            <div className="space-y-2 text-slate-300 text-base sm:text-lg">
              <p className="font-medium text-slate-200">
                Em prol de ajuda para o custeio da minha{" "}
                <span className="text-white font-semibold underline underline-offset-4 decoration-slate-500">
                  faculdade de Medicina
                </span>.
              </p>
              <p className="text-sm sm:text-base text-slate-400">
                Ao adquirir um bilhete, você estará me ajudando a realizar esse sonho e ainda estará concorrendo a:
              </p>
            </div>

            {/* Caixa do Prêmio */}
            <div className="bg-navy-900/90 border border-navy-700/80 rounded-2xl p-5 sm:p-6 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    Prêmio da Rifa
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-display-luxury text-white tracking-wide">
                    {prize}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Sorteio dia: <strong className="text-white">{drawDate}</strong></span>
                  </div>
                </div>

                <div className="bg-navy-950 px-5 py-3 rounded-xl border border-navy-800 text-left sm:text-right min-w-[140px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Valor da Cota
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {formatCurrency(price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#numeros"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-navy-950 font-bold text-sm transition-all shadow-md"
              >
                <span>Escolher Meu Número</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#premio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 border border-navy-700 text-slate-200 font-semibold text-sm transition-colors"
              >
                <span>Ver Detalhes da Moto</span>
              </a>
            </div>
          </div>

          {/* Foto 0 da Maria Júlia (Limpa, natural e autêntica) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-2xl overflow-hidden border-2 border-navy-800 bg-navy-900 shadow-2xl">
                <div className="relative aspect-[3/4] w-full bg-navy-950">
                  <Image
                    src="/images/foto-maju-0.jpg"
                    alt="Maria Júlia Gomes Gabriel - Estudante de Medicina"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-4 bg-navy-950/95 border-t border-navy-800 text-center">
                  <p className="text-sm font-bold text-white font-serif-luxury">
                    Maria Júlia Gomes Gabriel
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Estudante de Medicina
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
