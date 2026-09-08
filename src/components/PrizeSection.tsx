"use client";

import React from "react";
import Image from "next/image";
import { Gauge, Fuel, Zap, Check, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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
  ];

  return (
    <section id="premio" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Imagem da Moto */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <Image
                src="/images/honda-pop-azul.png"
                alt="Honda Pop 110i ES Azul - 0 km"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Honda Pop 110i ES • Cor Azul • 0 km
            </p>
          </div>

          {/* Ficha Técnica e Informações */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Concorra ao Prêmio
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 font-serif-luxury">
                01 Moto Honda Pop 110i ES
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                A moto mais econômica, prática e confiável do Brasil para o seu dia a dia. Você concorre a esta moto 0 km por apenas <strong>{formatCurrency(price)}</strong> a cota.
              </p>
            </div>

            {/* Especificações Técnicas Oficiais da Honda */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 border-b border-slate-200 pb-2">
                Especificações Técnicas Oficiais (Honda)
              </h3>

              <div className="space-y-3">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">
                          {spec.label}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 font-mono">
                          {spec.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resumo da Cota & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-xs text-slate-500 block">Sorteio marcado para</span>
                <span className="text-base font-bold text-navy-950 font-mono">{drawDate}</span>
              </div>

              <a
                href="#numeros"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-800 text-white font-bold text-sm transition-colors shadow-sm"
              >
                <span>Garantir Cota por {formatCurrency(price)}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
