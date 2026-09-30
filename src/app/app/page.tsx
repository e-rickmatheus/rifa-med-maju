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
  Heart,
  Sparkles,
  Bot,
  Database,
  Send,
  Loader2,
  FolderOpen,
  Share2,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function PersonalAppPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"rifa" | "vaquinha" | "servicos" | "gemini">("rifa");
  const [settings, setSettings] = useState<RaffleSettings>(DEFAULT_SETTINGS);
  const [cotasMap, setCotasMap] = useState<Record<string, Cota>>({});
  const [firebaseActive, setFirebaseActive] = useState(false);
  const [syncingSheet, setSyncingSheet] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Estados do Assistente Gemini
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copiedAiText, setCopiedAiText] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const auth =
          sessionStorage.getItem("rifa_admin_auth") === "true" ||
          sessionStorage.getItem("maju_app_auth") === "true";
        setIsAuthenticated(auth);
      }
    } catch {
      setIsAuthenticated(false);
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

  const totalNumbers = settings.total_numbers || 1000;
  const normalizedCotas = useMemo(
    () => normalizeCotasMap(cotasMap, totalNumbers),
    [cotasMap, totalNumbers]
  );
  const soldCount = Object.keys(normalizedCotas).length;
  const availableCount = Math.max(0, totalNumbers - soldCount);
  const totalRevenue = soldCount * (settings.price || 20);
  const percent = totalNumbers > 0 ? ((soldCount / totalNumbers) * 100).toFixed(1) : "0.0";

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("rifa_admin_auth");
        sessionStorage.removeItem("maju_app_auth");
      }
    } catch {}
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("maju_app_auth", "true");
        sessionStorage.setItem("rifa_admin_auth", "true");
      }
    } catch {}
    setIsAuthenticated(true);
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
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 3000);
    }
  };

  const handleSendAiPrompt = async (customText?: string) => {
    const textToSend = customText || aiPrompt;
    if (!textToSend.trim()) return;

    setAiLoading(true);
    setAiError(null);
    setAiResponse(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAiError(
          data.error || "Não foi possível gerar a resposta. Verifique a GEMINI_API_KEY no .env.local."
        );
      } else {
        setAiResponse(data.text);
      }
    } catch (err: any) {
      setAiError(err?.message || "Erro de conexão ao acionar o assistente.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyAiResponse = () => {
    if (aiResponse && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(aiResponse);
      setCopiedAiText(true);
      setTimeout(() => setCopiedAiText(false), 3000);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-300" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-antique-200">
      {/* Header do Portal Pessoal */}
      <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-antique-400">
                <GraduationCap className="w-5 h-5 text-antique-300" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold font-serif text-white tracking-wide">
                  PORTAL PESSOAL • MAJU
                </span>
                <span className="block text-[11px] text-slate-300">
                  mariajulia.med.br • mariajuliagomesgabriel@gmail.com
                </span>
              </div>
            </div>

            {/* Links e Ações */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-navy-900 hover:bg-navy-800 text-slate-200 border border-navy-700 transition-colors"
              >
                <span>Ver Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors"
                title="Sair do portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>

          {/* Abas de Navegação */}
          <div className="flex items-center gap-2 border-t border-navy-800/80 pt-1 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("rifa")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "rifa"
                  ? "border-antique-400 text-antique-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>1. Gestão da Rifa</span>
            </button>

            <button
              onClick={() => setActiveTab("vaquinha")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "vaquinha"
                  ? "border-red-400 text-red-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>2. Vaquinha & Doações</span>
            </button>

            <button
              onClick={() => setActiveTab("servicos")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "servicos"
                  ? "border-emerald-400 text-emerald-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>3. Hub de Contas & Google Maju</span>
            </button>

            <button
              onClick={() => setActiveTab("gemini")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "gemini"
                  ? "border-purple-400 text-purple-300"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>4. Assistente Gemini AI</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo da Aba Selecionada */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ABA 1: GESTÃO DA RIFA */}
        {activeTab === "rifa" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Banner de Sincronização Google Sheets */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <span>Planilha Google Oficial da Rifa</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Ao Vivo
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Planilha de vendas vinculada à conta mariajuliagomesgabriel@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <button
                  onClick={handleSyncGoogleSheet}
                  disabled={syncingSheet}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
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
                  <span>Abrir Planilha</span>
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
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{syncFeedback}</span>
              </div>
            )}

            {/* 4 Cards de Resumo */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Limite de Cotas
                </span>
                <div className="text-2xl sm:text-3xl font-black text-navy-950 font-mono">
                  {totalNumbers.toLocaleString("pt-BR")}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Escalável sob demanda</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Cotas Vendidas
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                  {soldCount.toLocaleString("pt-BR")}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  {percent}% da meta
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Cotas Livres
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono">
                  {availableCount.toLocaleString("pt-BR")}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Disponíveis na vitrine</span>
              </div>

              <div className="bg-emerald-950 p-5 rounded-2xl border border-emerald-800 shadow-sm text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                  Total Arrecadado
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {formatCurrency(totalRevenue)}
                </div>
                <span className="text-[11px] text-emerald-300/80 mt-1 block">R$ 20,00 por cota</span>
              </div>
            </div>

            {/* Gerenciadores */}
            <AdminQuotaManager currentTotal={totalNumbers} />
            <AdminSalesManager totalNumbers={totalNumbers} cotasMap={cotasMap} />
          </div>
        )}

        {/* ABA 2: GESTÃO DA VAQUINHA */}
        {activeTab === "vaquinha" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy-950 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <span>Controle da Vaquinha Solidária</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Acompanhe as doações livres recebidas via PIX para o custeio da faculdade de Medicina.
                  </p>
                </div>

                <Link
                  href="/vaquinha"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Página da Vaquinha</span>
                </Link>
              </div>

              {/* Informações da Chave */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">
                    Chave PIX Oficial
                  </span>
                  <span className="text-lg font-mono font-bold text-navy-950">37998427884</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Celular Maria Júlia</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">
                    Conta de Destino
                  </span>
                  <span className="text-base font-bold text-navy-950">Itaú Unibanco S.A.</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Maria Júlia Gomes Gabriel</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">
                    Canal de Comprovantes
                  </span>
                  <span className="text-base font-bold text-emerald-700">(37) 99842-7884</span>
                  <span className="text-[11px] text-slate-400 block mt-1">WhatsApp Oficial</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Dica para a Maju:</strong> Cada pessoa que enviar comprovante de doação da vaquinha no WhatsApp pode receber uma mensagem de agradecimento carinhosa. Você pode usar a aba <strong>&ldquo;Assistente Gemini AI&rdquo;</strong> para criar agradecimentos únicos e personalizados para cada padrinho/madrinha!
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: HUB DE CONTAS & GOOGLE MAJU */}
        {activeTab === "servicos" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-navy-950 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span>Hub de Contas & Serviços Google da Maju</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Centralização oficial na conta: <strong>mariajuliagomesgabriel@gmail.com</strong>
                </p>
              </div>

              {/* Grid de Serviços */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Google Drive */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <FolderOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        15 GB Grátis
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-950">Google Drive da Maju</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Armazenamento de fotos de campanhas, comprovantes de PIX e relatórios em PDF.
                    </p>
                  </div>
                  <a
                    href="https://drive.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Abrir Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. Google Sheets */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Table className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Conectado
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-950">Google Planilhas Oficial</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Planilha ao vivo de controle de cotas da rifa e webhook automático de vendas.
                    </p>
                  </div>
                  <a
                    href={GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Abrir Planilha</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 3. Firebase Console */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        🔥
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Plano Spark
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-950">Firebase Firestore</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Banco de dados em tempo real da rifa (50.000 leituras/dia gratuitas na conta dela).
                    </p>
                  </div>
                  <a
                    href="https://console.firebase.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Abrir Firebase Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 4. Google AI Studio (Gemini) */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                        ✨
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        Cotas Gratuitas
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-950">Google AI Studio (Gemini)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Gerencie sua chave GEMINI_API_KEY gratuita criada com o Gmail da Maria Júlia.
                    </p>
                  </div>
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Abrir Google AI Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 5. Supabase */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Free Tier
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-950">Supabase</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Banco PostgreSQL e autenticação vinculados ao login do Google da Maria Júlia.
                    </p>
                  </div>
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Abrir Supabase</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 6. Vercel Hosting & DNS */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                        ▲
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                        mariajulia.med.br
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-950">Vercel Domínios & DNS</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Gerenciamento de DNS para www, rifa, vaquinha e app.mariajulia.med.br.
                    </p>
                  </div>
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Abrir Vercel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ABA 4: ASSISTENTE GEMINI AI */}
        {activeTab === "gemini" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy-950 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <span>Maju AI Assistant • Google Gemini</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Assistente com IA que consome os tokens e limites gratuitos da conta <strong>mariajuliagomesgabriel@gmail.com</strong>.
                  </p>
                </div>

                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-700 hover:text-purple-800 underline font-semibold flex items-center gap-1"
                >
                  <span>Obter ou Ver Chave no Google AI Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Botões Rápidos de Ação */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Sugestões Rápidas de 1 Clique:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleSendAiPrompt(
                        "Escreva uma mensagem calorosa e carinhosa de agradecimento no WhatsApp para alguém que acabou de comprar uma cota da Rifa Solidária da Moto Honda Pop em prol da minha faculdade de Medicina na UNIFENAS."
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold border border-purple-200 transition-colors"
                  >
                    ✨ Agradecimento Comprador Rifa
                  </button>

                  <button
                    onClick={() =>
                      handleSendAiPrompt(
                        "Escreva uma mensagem emocionante de agradecimento para um apoiador que fez uma doação voluntária na Vaquinha Solidária para custeio de livros e materiais de Medicina."
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold border border-red-200 transition-colors"
                  >
                    💖 Agradecimento Doador Vaquinha
                  </button>

                  <button
                    onClick={() =>
                      handleSendAiPrompt(
                        "Crie 3 ideias criativas de legendas para stories do Instagram mostrando o progresso da Rifa da Maria Júlia (Medicina UNIFENAS) e incentivando a compra de novos números por R$ 20."
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    📸 Texto para Stories do Instagram
                  </button>

                  <button
                    onClick={() =>
                      handleSendAiPrompt(
                        "Explique de forma didática e objetiva os passos do exame físico cardiovascular e a ausculta dos focos cardíacos para um estudante de medicina no ciclo clínico."
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
                  >
                    🩺 Dúvida de Estudo Médico
                  </button>
                </div>
              </div>

              {/* Campo de Entrada de Prompt */}
              <div className="space-y-3 pt-2">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Digite o que deseja que o Gemini faça (ex: 'Escreva um texto avisando que faltam apenas 50 números na rifa...')"
                  rows={3}
                  className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-sans"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Alimentado por Gemini 1.5 Flash • Rápido e Gratuito
                  </span>

                  <button
                    onClick={() => handleSendAiPrompt()}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{aiLoading ? "Gerando..." : "Enviar para Gemini"}</span>
                  </button>
                </div>
              </div>

              {/* Mensagem de Erro se houver */}
              {aiError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
                  <strong>Aviso:</strong> {aiError}
                </div>
              )}

              {/* Caixa de Resposta Gerada */}
              {aiResponse && (
                <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-700" />
                      Resposta do Gemini:
                    </span>

                    <button
                      onClick={handleCopyAiResponse}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-purple-200 hover:bg-purple-100 text-purple-900 text-xs font-semibold transition-colors"
                    >
                      {copiedAiText ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-700" />
                          <span>Copiar Texto</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-sm text-slate-800 font-sans whitespace-pre-wrap leading-relaxed">
                    {aiResponse}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
