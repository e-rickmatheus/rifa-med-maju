"use client";

import React, { useState } from "react";
import { PlusCircle, Layers, Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { updateTotalNumbers } from "@/lib/raffleService";

interface AdminQuotaManagerProps {
  currentTotal: number;
}

export default function AdminQuotaManager({ currentTotal }: AdminQuotaManagerProps) {
  const [customValue, setCustomValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const handleAddQuick = async (amount: number) => {
    const newTotal = currentTotal + amount;
    await applyTotal(newTotal);
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customValue, 10);
    if (isNaN(val) || val <= 0) {
      setFeedback({ type: "error", message: "Informe um número válido e maior que zero." });
      return;
    }
    await applyTotal(val);
    setCustomValue("");
  };

  const applyTotal = async (newTotal: number) => {
    setLoading(true);
    setFeedback(null);
    try {
      await updateTotalNumbers(newTotal);
      setFeedback({
        type: "success",
        message: `Limite de cotas expandido para ${newTotal.toLocaleString("pt-BR")} números com sucesso!`,
      });
      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "Erro ao atualizar limite de cotas.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-950 font-serif">
              Expandir Limite de Cotas (Escalabilidade)
            </h3>
            <p className="text-xs text-slate-500">
              Aumente a quantidade total de números disponíveis instantaneamente
            </p>
          </div>
        </div>

        {/* Limite Atual Badge */}
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
            Limite Atual
          </span>
          <span className="text-xl sm:text-2xl font-black text-navy-900 font-mono">
            {currentTotal.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fadeIn ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Botões de Expansão Rápida */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Acréscimo Rápido de Cotas
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[100, 500, 1000].map((increment) => (
              <button
                key={increment}
                onClick={() => handleAddQuick(increment)}
                disabled={loading}
                className="py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-navy-900 hover:text-white text-slate-800 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+{increment} Cotas</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Customizado */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Definir Total Específico de Cotas
          </label>
          <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min={1}
              step={1}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder={`Ex: ${currentTotal + 200}`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 font-mono"
            />
            <button
              type="submit"
              disabled={loading || !customValue}
              className="px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-white font-bold text-sm transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <span>Aplicar Novo Total</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[11px] text-slate-400 mt-1.5">
            Ao expandir, a vitrine pública passa a exibir imediatamente os novos números (ex: se definir 1500, renderiza de 0000 a 1499).
          </p>
        </div>
      </div>
    </div>
  );
}
