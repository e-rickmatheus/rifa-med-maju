"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Lock,
  MessageCircle,
  Info,
  CheckCircle2,
  X,
} from "lucide-react";
import { Cota } from "@/types/raffle";
import {
  formatCotaNumber,
  maskBuyerName,
  maskPhoneNumber,
  generateWhatsAppLink,
} from "@/lib/utils";

interface NumberGridProps {
  totalNumbers: number;
  cotasMap: Record<string, Cota>;
  whatsappNumber?: string;
}

export default function NumberGrid({
  totalNumbers,
  cotasMap,
  whatsappNumber = "5537998427884",
}: NumberGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"todos" | "livres" | "vendidos">("todos");
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [activeModalCota, setActiveModalCota] = useState<{
    numero: string;
    isSold: boolean;
    cotaData?: Cota;
  } | null>(null);

  const blockSize = 100;
  const totalBlocks = Math.ceil(totalNumbers / blockSize);

  const allNumbers = useMemo(() => {
    return Array.from({ length: totalNumbers }, (_, i) => {
      const numStr = formatCotaNumber(i, totalNumbers);
      const cota = cotasMap[numStr] || cotasMap[String(i)];
      const isSold = cota?.status === "vendido";
      return {
        index: i,
        numero: numStr,
        isSold,
        cota,
      };
    });
  }, [totalNumbers, cotasMap]);

  const soldCount = useMemo(() => {
    const set = new Set<string>();
    Object.values(cotasMap).forEach((c) => {
      if (c?.status === "vendido") {
        const numInt = parseInt(c.numero, 10);
        const canonical = !isNaN(numInt) ? formatCotaNumber(numInt, totalNumbers) : c.numero;
        set.add(canonical);
      }
    });
    return set.size;
  }, [cotasMap, totalNumbers]);

  const freeCount = Math.max(0, totalNumbers - soldCount);

  const filteredNumbers = useMemo(() => {
    let list = allNumbers;

    if (filterType === "livres") {
      list = list.filter((item) => !item.isSold);
    } else if (filterType === "vendidos") {
      list = list.filter((item) => item.isSold);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter((item) => item.numero.includes(term));
    }

    return list;
  }, [allNumbers, filterType, searchTerm]);

  const isSearching = searchTerm.trim().length > 0;
  const currentViewNumbers = useMemo(() => {
    if (isSearching || filterType !== "todos") {
      return filteredNumbers;
    }
    const start = selectedBlock * blockSize;
    const end = Math.min(start + blockSize, totalNumbers);
    return allNumbers.slice(start, end);
  }, [allNumbers, filteredNumbers, isSearching, filterType, selectedBlock, blockSize, totalNumbers]);

  const handleCotaClick = (numero: string, isSold: boolean, cota?: Cota) => {
    setActiveModalCota({ numero, isSold, cotaData: cota });
  };

  const confirmWhatsAppRedirect = (numero: string) => {
    const link = generateWhatsAppLink(numero, whatsappNumber);
    window.open(link, "_blank");
    setActiveModalCota(null);
  };

  return (
    <section id="numeros" className="py-20 sm:py-28 bg-pearl-50 border-b border-pearl-300/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Cabeçalho Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="w-6 h-px bg-antique-500" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-antique-600 font-sans font-semibold">
              Grade Oficial de Cotas
            </span>
            <span className="w-6 h-px bg-antique-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy tracking-tight">
            Escolha o seu Número da Sorte
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans font-light">
            Selecione qualquer cota disponível abaixo para solicitar sua reserva direta pelo WhatsApp oficial.
          </p>
        </div>

        {/* Legenda Discreta & Minimalista */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
            <span className="text-navy font-semibold">Cota Livre ({freeCount.toLocaleString("pt-BR")})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pearl-300" />
            <span className="text-slate-500 font-medium">Cota Vendida ({soldCount.toLocaleString("pt-BR")})</span>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-8 border border-pearl-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Campo de Busca */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar cota (ex: 451 ou 042)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pearl-300 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy text-sm bg-pearl-50/50 font-mono text-navy placeholder:text-slate-400 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-navy"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Abas de Filtros */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setFilterType("todos")}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap ${
                  filterType === "todos"
                    ? "bg-navy text-pearl shadow-sm"
                    : "bg-pearl-100 text-navy hover:bg-pearl-200 border border-pearl-200"
                }`}
              >
                Todos ({totalNumbers})
              </button>
              <button
                onClick={() => setFilterType("livres")}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap ${
                  filterType === "livres"
                    ? "bg-emerald text-white shadow-sm"
                    : "bg-pearl-100 text-navy hover:bg-pearl-200 border border-pearl-200"
                }`}
              >
                Livres ({freeCount})
              </button>
              <button
                onClick={() => setFilterType("vendidos")}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all whitespace-nowrap ${
                  filterType === "vendidos"
                    ? "bg-navy-800 text-pearl shadow-sm"
                    : "bg-pearl-100 text-slate-600 hover:bg-pearl-200 border border-pearl-200"
                }`}
              >
                Vendidos ({soldCount})
              </button>
            </div>
          </div>

          {/* Navegação por blocos de 100 */}
          {!isSearching && filterType === "todos" && totalBlocks > 1 && (
            <div className="mt-4 pt-4 border-t border-pearl-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-sans">Visualizar bloco de 100 cotas:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: totalBlocks }, (_, blockIdx) => {
                  const startNum = formatCotaNumber(blockIdx * blockSize, totalNumbers);
                  const endNum = formatCotaNumber(
                    Math.min((blockIdx + 1) * blockSize - 1, totalNumbers - 1),
                    totalNumbers
                  );
                  const isActive = selectedBlock === blockIdx;

                  return (
                    <button
                      key={blockIdx}
                      onClick={() => setSelectedBlock(blockIdx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        isActive
                          ? "bg-navy text-pearl font-bold shadow-sm"
                          : "bg-pearl-100 text-navy hover:bg-pearl-200 border border-pearl-200"
                      }`}
                    >
                      {startNum} - {endNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Contador de Visualização */}
        <div className="flex justify-between items-center text-xs text-slate-500 font-sans mb-4 px-1">
          <span>
            Exibindo <strong>{currentViewNumbers.length}</strong> cotas
            {isSearching && ` encontradas para "${searchTerm}"`}
            {!isSearching && filterType === "todos" && ` (Bloco ${selectedBlock + 1} de ${totalBlocks})`}
          </span>
        </div>

        {/* Grade de Tokens de Números */}
        {currentViewNumbers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-pearl-300">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-serif font-bold text-navy">Nenhum número encontrado</h4>
            <p className="text-xs text-slate-500 font-sans mt-1">
              Verifique a busca digitada ou altere os filtros de visualização.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
            {currentViewNumbers.map((item) => {
              const { numero, isSold, cota } = item;

              if (isSold) {
                const maskedName = maskBuyerName(cota?.nome_comprador);
                const maskedPhone = maskPhoneNumber(cota?.telefone);

                return (
                  <div
                    key={numero}
                    onClick={() => handleCotaClick(numero, true, cota)}
                    className="group relative cursor-pointer"
                    title={`Comprado por ${maskedName} (${maskedPhone})`}
                  >
                    <div className="h-14 rounded-xl bg-pearl-200/50 border border-pearl-300/60 text-slate-400 flex flex-col items-center justify-center font-mono text-xs sm:text-sm select-none transition-all duration-300 hover:bg-pearl-200/80">
                      <span className="line-through opacity-70 font-medium">{numero}</span>
                      <span className="text-[8px] uppercase tracking-wider font-sans text-slate-400 flex items-center gap-0.5 mt-0.5">
                        <Lock className="w-2.5 h-2.5" /> Vendido
                      </span>
                    </div>

                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-48 p-3 bg-navy text-pearl text-xs rounded-xl shadow-xl border border-navy-800 pointer-events-none animate-fadeIn">
                      <p className="font-serif font-bold text-pearl">Cota Nº {numero}</p>
                      <p className="text-slate-300 mt-1">{maskedName}</p>
                      <p className="text-antique-400 text-[10px] mt-0.5 font-mono">{maskedPhone}</p>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={numero}
                  onClick={() => handleCotaClick(numero, false, cota)}
                  className="h-14 rounded-xl bg-white border border-pearl-300 hover:border-navy text-navy hover:bg-navy hover:text-pearl font-mono font-bold text-xs sm:text-sm flex flex-col items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-300 group"
                  title={`Cota ${numero} Livre`}
                >
                  <span className="tracking-wide group-hover:scale-105 transition-transform duration-300">
                    {numero}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[8.5px] uppercase tracking-wider font-sans font-bold text-emerald-600 group-hover:text-emerald-300 transition-colors mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981] animate-pulse shrink-0" />
                    <span>LIVRE</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal de Reserva / Detalhe */}
        {activeModalCota && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-pearl-200 text-center relative">
              
              <button
                onClick={() => setActiveModalCota(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pearl-100 hover:bg-pearl-200 text-slate-500 hover:text-navy flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-sans font-semibold uppercase mb-4 bg-pearl-100 text-navy">
                {activeModalCota.isSold ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Cota Já Registrada
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                    Cota Disponível
                  </>
                )}
              </div>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-slate-400 block font-sans font-medium mb-1">
                  Número da Cota
                </span>
                <span className="text-5xl sm:text-6xl font-serif font-bold tracking-wider text-navy">
                  {activeModalCota.numero}
                </span>
              </div>

              {activeModalCota.isSold ? (
                <div className="space-y-4">
                  <div className="bg-pearl-50 rounded-xl p-4 text-xs text-navy space-y-1.5 border border-pearl-200 text-left font-sans">
                    <p>
                      <strong>Status:</strong> Confirmado no sistema
                    </p>
                    <p>
                      <strong>Comprador:</strong>{" "}
                      {maskBuyerName(activeModalCota.cotaData?.nome_comprador)}
                    </p>
                    <p>
                      <strong>Contato:</strong>{" "}
                      {maskPhoneNumber(activeModalCota.cotaData?.telefone)}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Este número já foi adquirido e preenchido no canhoto. Por favor, selecione outro número livre na grade.
                  </p>

                  <button
                    onClick={() => setActiveModalCota(null)}
                    className="w-full py-3.5 rounded-xl bg-navy text-pearl font-sans font-semibold text-xs hover:bg-navy-800 transition-colors shadow-sm"
                  >
                    Voltar para a Grade
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    Você será direcionado para o WhatsApp de Maria Júlia para garantir este número:
                  </p>

                  <div className="bg-pearl-50 rounded-xl p-4 border border-pearl-200 text-xs text-navy font-serif italic text-left leading-relaxed">
                    &ldquo;Oi Maria Júlia, quero a cota número {activeModalCota.numero} da sua Ação Solidária!&rdquo;
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => confirmWhatsAppRedirect(activeModalCota.numero)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald hover:bg-emerald-700 text-white font-sans font-semibold text-xs transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir no WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setActiveModalCota(null)}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-pearl-100 hover:bg-pearl-200 text-navy font-sans font-semibold text-xs transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
