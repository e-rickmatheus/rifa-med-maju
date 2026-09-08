"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, ShieldCheck, KeyRound, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "maju2027";

    setTimeout(() => {
      if (password.trim() === validPassword) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("rifa_admin_auth", "true");
        }
        onSuccess();
      } else {
        setError(true);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden text-white">
      {/* Luzes de fundo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Botão Voltar para Vitrine */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-gold-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Vitrine da Rifa</span>
        </Link>

        {/* Card de Login */}
        <div className="bg-navy-900/90 border-2 border-gold-400/50 rounded-3xl p-8 sm:p-10 shadow-gold backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 flex items-center justify-center text-navy-950 mx-auto mb-4 shadow-gold">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black font-serif-luxury text-cream-50">
              Painel da Organizadora
            </h1>
            <p className="text-xs text-cream-200/80 mt-1">
              Acesso restrito para gestão da RIFA MED MAJU
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300 mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Digite sua senha..."
                  required
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-navy-950 border border-gold-500/30 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-950/50 border border-red-800/60 p-3 rounded-xl animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Senha incorreta. Verifique a senha padrão cadastrada.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-gold transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Entrar no Painel"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-navy-800 text-center">
            <p className="text-[11px] text-slate-400">
              Dica: a senha inicial padrão é <code className="text-gold-300 font-mono">maju2027</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
