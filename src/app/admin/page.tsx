"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminLogin from "@/components/AdminLogin";
import AdminQuotaManager from "@/components/AdminQuotaManager";
import AdminSalesManager from "@/components/AdminSalesManager";
import {
  subscribeRaffleSettings,
  subscribeCotas,
  DEFAULT_SETTINGS,
  exportSalesCSV,
} from "@/lib/raffleService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { RaffleSettings, Cota } from "@/types/raffle";
import { formatCurrency } from "@/lib/utils";
import {
  FileSpreadsheet,
  LogOut,
  ExternalLink,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  Ticket,
  DollarSign,
  CloudOff,
  HelpCircle,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<RaffleSettings>(DEFAULT_SETTINGS);
  const [cotasMap, setCotasMap] = useState<Record<string, Cota>>({});
  const [firebaseActive, setFirebaseActive] = useState(false);

  useEffect(() => {
    // Checagem de autenticação no sessionStorage
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("rifa_admin_auth");
      setIsAuthenticated(auth === "true");
    }

    setFirebaseActive(isFirebaseConfigured());

    const unsubSettings = subscribeRaffleSettings((newSettings) => {
      setSettings(newSettings);
    });

    const unsubCotas = subscribeCotas((newCotas) => {
      setCotasMap(newCotas);
    });

    return () => {
      unsubSettings();
      unsubCotas();
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("rifa_admin_auth");
    }
    setIsAuthenticated(false);
  };

  // Enquanto valida auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-400" />
      </div>
    );
  }

  // Se não autenticado, mostra tela de login
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  const totalNumbers = settings.total_numbers || 1000;
  const soldCount = Object.values(cotasMap).filter((c) => c?.status === "vendido").length;
  const availableCount = Math.max(0, totalNumbers - soldCount);
  const totalRevenue = soldCount * (settings.price || 20);
  const percent = totalNumbers > 0 ? ((soldCount / totalNumbers) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Barra de Navegação do Painel */}
      <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo do Admin */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold font-display-luxury text-white">
                  PAINEL ADMINISTRATIVO
                </span>
                <span className="block text-[11px] text-slate-300">
                  RIFA MED MAJU • Maria Júlia Gomes Gabriel
                </span>
              </div>
            </div>

            {/* Ações de Topo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 transition-colors"
              >
                <span>Ver Vitrine Pública</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
                title="Sair do painel"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Painel */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner de Status de Conexão */}
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            firebaseActive
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {firebaseActive ? (
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            ) : (
              <CloudOff className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <span>
              {firebaseActive ? (
                <>
                  <strong>Firebase Firestore Conectado:</strong> As vendas e limites estão sendo gravados e sincronizados em tempo real na nuvem.
                </>
              ) : (
                <>
                  <strong>Modo Local / Simulação Ativo:</strong> As alterações estão salvas no armazenamento local deste navegador. Para conectar ao seu Firebase, preencha o <code>.env.local</code>.
                </>
              )}
            </span>
          </div>

          {/* Botão de Exportação CSV em Destaque */}
          <button
            onClick={() => exportSalesCSV(cotasMap, totalNumbers)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar Planilha de Vendas (.CSV)</span>
          </button>
        </div>

        {/* 4 Cards de Resumo Executivo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Limite de Cotas
              </span>
              <Ticket className="w-4 h-4 text-navy-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy-950 font-mono">
              {totalNumbers.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Escalável sob demanda</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Cotas Vendidas
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
              {soldCount.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              {percent}% da meta
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Cotas Livres
              </span>
              <TrendingUp className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono">
              {availableCount.toLocaleString("pt-BR")}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Disponíveis na vitrine</span>
          </div>

          <div className="bg-emerald-950 p-5 rounded-2xl border border-emerald-800 shadow-sm text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Total Arrecadado
              </span>
              <DollarSign className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {formatCurrency(totalRevenue)}
            </div>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">R$ 20,00 por cota</span>
          </div>
        </div>

        {/* Gestão de Limite de Cotas (Expandir Rifa) */}
        <AdminQuotaManager currentTotal={totalNumbers} />

        {/* Gestão de Vendas (Registrar, Editar, Cancelar) */}
        <AdminSalesManager
          totalNumbers={totalNumbers}
          cotasMap={cotasMap}
        />

        {/* Guia Rápido de Configuração do Firebase */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-xs text-slate-600 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-navy-950">
            <HelpCircle className="w-4 h-4 text-gold-600" />
            <span>Instruções para Conectar o Firebase Firestore (Gratuito)</span>
          </div>
          <p>
            1. Acesse o <strong>Firebase Console</strong> (console.firebase.google.com) e crie um projeto gratuito.
          </p>
          <p>
            2. No menu lateral, clique em <strong>Firestore Database</strong> e selecione &quot;Criar banco de dados&quot; (em modo de teste).
          </p>
          <p>
            3. Em &quot;Configurações do Projeto&quot;, adicione um App Web e copie as credenciais para o arquivo <code>.env.local</code> na raiz do projeto.
          </p>
          <p>
            4. As coleções <code>config</code> e <code>cotas</code> serão preenchidas automaticamente pelo sistema sob demanda!
          </p>
        </div>
      </main>
    </div>
  );
}
