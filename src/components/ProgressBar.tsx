"use client";

import React from "react";
import { TrendingUp, CheckCircle2, Ticket, DollarSign } from "lucide-react";
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
    <section className="relative -mt-8 z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-7">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg font-bold text-navy-950 font-serif-luxury">
              Progresso da Ação Solidária
            </h3>
            <p className="text-xs text-slate-500">
              Contagem atualizada em tempo real
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm font-mono">
            <span>{percent.toFixed(1)}% da meta</span>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="space-y-2 mb-6">
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full rounded-full bg-navy-900 transition-all duration-700 ease-out"
              style={{ width: `${Math.max(percent, 1.5)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
            <span>0 cotas</span>
            <span>Meta: {total.toLocaleString("pt-BR")} cotas ({formatCurrency(goalAmount)})</span>
          </div>
        </div>

        {/* 4 Cards de Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Vendidas</div>
            <div className="text-xl font-bold text-navy-950 font-mono">
              {sold.toLocaleString("pt-BR")}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Disponíveis</div>
            <div className="text-xl font-bold text-slate-800 font-mono">
              {available.toLocaleString("pt-BR")}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center">
            <div className="text-xs text-slate-500 mb-0.5">Total de Cotas</div>
            <div className="text-xl font-bold text-navy-950 font-mono">
              {total.toLocaleString("pt-BR")}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 text-center">
            <div className="text-xs text-emerald-800 mb-0.5 font-medium">Total Arrecadado</div>
            <div className="text-xl font-bold text-emerald-800 font-mono">
              {formatCurrency(totalRaised)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
