"use client";

import React from "react";
import { TrendingUp, CheckCircle, Ticket, DollarSign } from "lucide-react";
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
    <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gold-300/60 p-6 sm:p-8 backdrop-blur-lg">
        {/* Cabeçalho da Barra de Progresso */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 border border-gold-300 flex items-center justify-center text-gold-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 font-serif-luxury">
                Progresso da Ação Solidária
              </h3>
              <p className="text-xs text-slate-500">
                Acompanhe o andamento das cotas vendidas em tempo real
              </p>
            </div>
          </div>

          {/* Porcentagem em Destaque */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-300/80 text-gold-700 font-extrabold text-sm sm:text-base">
            <span>{percent.toFixed(1)}%</span>
            <span className="text-xs text-slate-600 font-medium">da meta alcançada</span>
          </div>
        </div>

        {/* Barra Visual com Gradiente Dourado */}
        <div className="space-y-2 mb-6">
          <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 transition-all duration-1000 ease-out relative shadow-sm"
              style={{ width: `${Math.max(percent, 2)}%` }}
            >
              {/* Brilho animado */}
              <div className="absolute inset-0 bg-white/20 bg-[linear-gradient(45deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] bg-[length:24px_24px] animate-[move-bg_2s_linear_infinite]" />
            </div>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>0 cotas</span>
            <span>Meta: {total.toLocaleString("pt-BR")} cotas ({formatCurrency(goalAmount)})</span>
          </div>
        </div>

        {/* 4 Cards de Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Vendidas</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-navy-900">
              {sold.toLocaleString("pt-BR")}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <Ticket className="w-3.5 h-3.5 text-gold-600" />
              <span>Disponíveis</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-gold-600">
              {available.toLocaleString("pt-BR")}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <Ticket className="w-3.5 h-3.5 text-navy-700" />
              <span>Total de Cotas</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-navy-900">
              {total.toLocaleString("pt-BR")}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Arrecadado</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-800">
              {formatCurrency(totalRaised)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
