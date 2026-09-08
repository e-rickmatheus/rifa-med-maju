"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Calendar, CalendarPlus } from "lucide-react";
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
    <section className="relative overflow-hidden bg-navy-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto Principal com a copy da arte original */}
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
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Sorteio dia: <strong className="text-white">{drawDate}</strong></span>
                    </div>

                    {/* Botão Google Calendário */}
                    <a
                      href={calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-700 text-blue-200 hover:text-white border border-navy-700 transition-colors text-[11px] font-medium"
                      title="Salvar lembrete na sua agenda"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Adicionar ao Google Agenda</span>
                    </a>
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

          {/* Foto MAJU PNG 1 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm flex flex-col items-center">
              <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-3xl overflow-hidden border border-navy-800 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950 p-6 pt-8 shadow-2xl flex flex-col items-center">
                <div className="relative w-full aspect-[139/220] max-h-[460px] flex items-center justify-center">
                  <Image
                    src="/images/maju-png-1.png"
                    alt="Maria Júlia Gomes Gabriel - Estudante de Medicina"
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                    priority
                  />
                </div>

                <div className="w-full mt-4 pt-3 border-t border-navy-800 text-center">
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
