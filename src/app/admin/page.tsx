"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import AdminLogin from "@/components/AdminLogin";
import AdminQuotaManager from "@/components/AdminQuotaManager";
import AdminSalesManager from "@/components/AdminSalesManager";
import {
  subscribeRaffleSettings,
  subscribeCotas,
  DEFAULT_SETTINGS,
  exportSalesCSV,
  syncFromGoogleSheetsNow,
  normalizeCotasMap,
} from "@/lib/raffleService";
import { GOOGLE_SHEET_URL, APPS_SCRIPT_TEMPLATE } from "@/lib/googleSheetService";
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
  RefreshCw,
  Copy,
  Check,
  Table,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<RaffleSettings>(DEFAULT_SETTINGS);
  const [cotasMap, setCotasMap] = useState<Record<string, Cota>>({});
  const [firebaseActive, setFirebaseActive] = useState(false);
  const [syncingSheet, setSyncingSheet] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
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

  const handleSyncGoogleSheet = async () => {
    setSyncingSheet(true);
    setSyncFeedback(null);
    try {
      const count = await syncFromGoogleSheetsNow(settings.total_numbers || 1000);
      setSyncFeedback(`Sincronização concluída! ${count} registros verificados na planilha.`);
      setTimeout(() => setSyncFeedback(null), 5000);
    } catch {
      setSyncFeedback("Erro ao sincronizar com o Google Sheets.");
    } finally {
      setSyncingSheet(false);
    }
  };

  const handleCopyAppsScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-300" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  const totalNumbers = settings.total_numbers || 1000;
  const normalizedCotas = useMemo(
    () => normalizeCotasMap(cotasMap, totalNumbers),
    [cotasMap, totalNumbers]
  );
  const soldCount = Object.keys(normalizedCotas).length;
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
        {/* Banner de Integração com Google Sheets */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <span>Google Planilha Oficial Conectada</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Ao Vivo
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Planilha oficial de vendas e controle de cotas da Maria Júlia
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleSyncGoogleSheet}
              disabled={syncingSheet}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              title="Puxar vendas atualizadas da planilha Google"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingSheet ? "animate-spin" : ""}`} />
              <span>{syncingSheet ? "Sincronizando..." : "Sincronizar da Planilha"}</span>
            </button>

            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir no Google Sheets</span>
            </a>

            <button
              onClick={() => exportSalesCSV(cotasMap, totalNumbers)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-800 text-white text-xs font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Baixar CSV</span>
            </button>
          </div>
        </div>

        {syncFeedback && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{syncFeedback}</span>
          </div>
        )}

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

        {/* Guia de Webhook Automático do Google Sheets */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-xs text-slate-600 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-navy-950">
              <HelpCircle className="w-4 h-4 text-slate-700" />
              <span>Como salvar dados automaticamente na Planilha Google?</span>
            </div>

            <button
              onClick={handleCopyAppsScript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? "Código Copiado!" : "Copiar Código Apps Script"}</span>
            </button>
          </div>

          <div className="space-y-2 text-slate-600">
            <p>
              1. Abra sua planilha no Google Sheets: <strong>Extensões &gt; Apps Script</strong>.
            </p>
            <p>
              2. Cole o código copiado acima e clique em <strong>Implantar &gt; Nova Implantação &gt; Aplicativo da Web</strong> (selecione quem pode acessar: <em>Qualquer pessoa</em>).
            </p>
            <p>
              3. Cole a URL gerada na variável <code>NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL</code> no arquivo <code>.env.local</code>. Todas as vendas feitas pelo painel serão atualizadas na linha correspondente da planilha automaticamente!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
