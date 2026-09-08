"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";

interface ProgressBarProps {
  total: number;
  sold: number;
  price?: number;
}

export default function ProgressBar({ total, sold, price = 20 }: ProgressBarProps) {
  const percent = total > 0 ? Math.min(100, Math.round((sold / total) * 1000) / 10) : 0;
  const available = Math.max(0, total - sold);
  const totalRaised = sold * price;
  const goalAmount = total * price;

  return (
    <section className="py-20 sm:py-24 bg-pearl border-b border-pearl-300/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Cabeçalho da Seção de Progresso */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-antique-600 font-sans font-semibold block">
              Transparência & Andamento
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy tracking-tight">
              Progresso da Ação Solidária
            </h2>
            <p className="text-sm text-slate-600 font-sans font-light">
              Acompanhamento oficial das cotas em tempo real
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-navy tracking-tight">
              {percent.toFixed(1)}%
            </span>
            <span className="block text-xs uppercase tracking-widest text-slate-500 font-sans font-medium mt-1">
              da meta alcançada
            </span>
          </div>
        </div>

        {/* Linha Fina e Elegante de Progresso */}
        <div className="space-y-2 mb-14">
          <div className="w-full h-2.5 bg-pearl-300/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-navy rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(percent, 1.5)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-sans text-slate-500">
            <span>Início</span>
            <span>Meta: {total.toLocaleString("pt-BR")} cotas ({formatCurrency(goalAmount)})</span>
          </div>
        </div>

        {/* 4 Métricas em Tipografia Editorial */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-6 border-t border-pearl-300/60">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-sans font-medium block">
              Cotas Vendidas
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-navy">
              {sold.toLocaleString("pt-BR")}
            </div>
            <span className="text-xs text-slate-500 font-sans font-light block">
              bilhetes confirmados
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-sans font-medium block">
              Cotas Livres
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-navy">
              {available.toLocaleString("pt-BR")}
            </div>
            <span className="text-xs text-slate-500 font-sans font-light block">
              disponíveis na grade
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-sans font-medium block">
              Total Emitido
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-navy">
              {total.toLocaleString("pt-BR")}
            </div>
            <span className="text-xs text-slate-500 font-sans font-light block">
              limite atual configurado
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-emerald font-sans font-medium block">
              Total Arrecadado
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald">
              {formatCurrency(totalRaised)}
            </div>
            <span className="text-xs text-slate-500 font-sans font-light block">
              destinado aos estudos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
