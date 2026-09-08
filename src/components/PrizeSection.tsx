"use client";

import React from "react";
import Image from "next/image";
import { Gauge, Fuel, Zap, ArrowRight, CalendarPlus, ShieldCheck } from "lucide-react";
import { formatCurrency, generateGoogleCalendarUrl } from "@/lib/utils";

interface PrizeSectionProps {
  price?: number;
  drawDate?: string;
}

export default function PrizeSection({
  price = 20,
  drawDate = "24/07/2027",
}: PrizeSectionProps) {
  const specs = [
    {
      label: "Potência Máxima",
      value: "6,17 kW (8,4 CV) a 7250 rpm (Gasolina)",
      icon: Gauge,
    },
    {
      label: "Torque Máximo",
      value: "9,27 N.m (0,945 kgf.m) a 5000 rpm (Gasolina)",
      icon: Zap,
    },
    {
      label: "Combustível",
      value: "Gasolina",
      icon: Fuel,
    },
    {
      label: "Garantia & Condição",
      value: "0 km • Modelo Oficial de Fábrica",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="premio" className="py-20 sm:py-28 bg-white border-b border-pearl-300/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Apresentação Visual da Moto */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center bg-pearl-50 rounded-3xl p-8 border border-pearl-200 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/honda-pop-azul.png"
                alt="Honda Pop 110i ES Azul - 0 km"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-contain drop-shadow-md"
              />
            </div>
            <p className="text-xs text-slate-500 font-sans mt-4 text-center tracking-wide">
              Honda Pop 110i ES • Cor Azul • Zero Quilômetro
            </p>
          </div>

          {/* Ficha Técnica & Informações Editoriais */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-antique-500" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-antique-600 font-sans font-semibold">
                  O Prêmio Oficial
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight leading-tight">
                01 Moto Honda Pop 110i ES
              </h2>

              <p className="text-base text-slate-600 font-sans font-light leading-relaxed pt-1">
                A moto mais econômica, prática e confiável do Brasil para transformar sua mobilidade. Você concorre a este veículo 0 km com bilhetes a apenas <strong className="text-navy font-medium">{formatCurrency(price)}</strong> por cota.
              </p>
            </div>

            {/* Especificações Técnicas em Formato de Lista Editorial */}
            <div className="border-t border-b border-pearl-200 divide-y divide-pearl-200">
              {specs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pearl-100 flex items-center justify-center text-navy shrink-0">
                        <Icon className="w-4 h-4 text-navy/80" />
                      </div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 font-sans font-medium">
                        {spec.label}
                      </span>
                    </div>

                    <span className="text-xs sm:text-sm font-sans font-semibold text-navy text-right">
                      {spec.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Sorteio, Agenda e Botão CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-widest text-slate-500 font-sans font-medium block">
                  Data do Sorteio
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-serif font-bold text-navy">
                    {drawDate}
                  </span>
                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy/20 hover:border-navy text-navy text-xs font-medium transition-colors"
                    title="Adicionar evento na sua agenda"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-navy" />
                    <span>Lembrete no Google Agenda</span>
                  </a>
                </div>
              </div>

              <a
                href="#numeros"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primaryBlue hover:bg-primaryBlue-hover text-white font-sans font-semibold text-sm transition-all duration-300 shadow-sm"
              >
                <span>Escolher Números</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
