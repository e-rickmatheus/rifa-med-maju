"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";

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

    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Dra.MaJuGG";

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
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 sm:px-6 text-white">
      <div className="max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Vitrine da Rifa</span>
        </Link>

        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-8 sm:p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-white mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-serif-luxury text-white">
              Painel da Organizadora
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Acesso restrito para gestão da RIFA MED MAJU
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-950/50 border border-red-800/60 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Senha incorreta. Tente novamente.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-navy-950 font-bold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Entrar no Painel"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-navy-800 text-center">
            <p className="text-[11px] text-slate-500">
              Senha de acesso: <code className="text-slate-300 font-mono">Dra.MaJuGG</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
