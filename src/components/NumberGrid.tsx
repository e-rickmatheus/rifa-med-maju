"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Lock,
  MessageCircle,
  Info,
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
      const cota = cotasMap[numStr];
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
    return Object.values(cotasMap).filter((c) => c?.status === "vendido").length;
  }, [cotasMap]);

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
    <section id="numeros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
            Grade de Cotas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 font-serif-luxury">
            Escolha o seu Número
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clique em qualquer número livre para solicitar sua reserva no WhatsApp oficial.
          </p>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-white border border-slate-300 shadow-sm" />
            <span className="text-slate-700">Disponível ({freeCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-slate-200 border border-slate-300" />
            <span className="text-slate-500">Vendido ({soldCount})</span>
          </div>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Campo de Busca */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar número (ex: 451 ou 042)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-800 text-sm bg-white font-mono"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Abas */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setFilterType("todos")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === "todos"
                    ? "bg-navy-950 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Todos ({totalNumbers})
              </button>
              <button
                onClick={() => setFilterType("livres")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === "livres"
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Livres ({freeCount})
              </button>
              <button
                onClick={() => setFilterType("vendidos")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === "vendidos"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Vendidos ({soldCount})
              </button>
            </div>
          </div>

          {/* Navegação por blocos de 100 */}
          {!isSearching && filterType === "todos" && totalBlocks > 1 && (
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">Blocos de 100 cotas:</span>
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        isActive
                          ? "bg-navy-950 text-white shadow-sm font-bold"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
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

        {/* Resumo */}
        <div className="flex justify-between items-center text-xs text-slate-500 mb-3 px-1">
          <span>
            Exibindo <strong>{currentViewNumbers.length}</strong> números
            {isSearching && ` para "${searchTerm}"`}
            {!isSearching && filterType === "todos" && ` (Bloco ${selectedBlock + 1} de ${totalBlocks})`}
          </span>
        </div>

        {/* Grade de Números */}
        {currentViewNumbers.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">Nenhum número encontrado</h4>
            <p className="text-xs text-slate-500 mt-1">
              Verifique a busca ou troque os filtros de visualização.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
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
                    title={`Comprado por ${maskedName} (Tel: ${maskedPhone})`}
                  >
                    <div className="h-12 rounded-xl bg-slate-200 border border-slate-300 text-slate-400 flex flex-col items-center justify-center font-mono font-semibold text-xs sm:text-sm select-none transition-colors hover:bg-slate-300/80">
                      <span className="line-through">{numero}</span>
                      <span className="text-[9px] font-sans text-slate-500 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Vendido
                      </span>
                    </div>

                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-48 p-2.5 bg-navy-950 text-white text-[11px] rounded-xl shadow-lg border border-navy-800 pointer-events-none animate-fadeIn">
                      <p className="font-bold text-slate-200">Cota {numero}</p>
                      <p className="text-slate-300 mt-0.5">{maskedName}</p>
                      <p className="text-slate-400">Tel: {maskedPhone}</p>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={numero}
                  onClick={() => handleCotaClick(numero, false, cota)}
                  className="h-12 rounded-xl bg-white border border-slate-300 hover:border-navy-900 text-navy-950 hover:bg-slate-50 font-mono font-bold text-xs sm:text-sm flex flex-col items-center justify-center shadow-sm transition-all duration-150"
                  title={`Cota ${numero} Livre`}
                >
                  <span className="tracking-wide">{numero}</span>
                  <span className="text-[9px] font-sans text-emerald-700 font-medium uppercase">
                    Livre
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Interativo */}
        {activeModalCota && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-xl border border-slate-200 text-center relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 bg-slate-100 text-slate-800">
                {activeModalCota.isSold ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Cota Já Vendida
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Cota Disponível
                  </>
                )}
              </div>

              <div className="mb-5">
                <span className="text-xs text-slate-500 block uppercase font-medium">
                  Número
                </span>
                <span className="text-5xl font-black font-mono tracking-wider text-navy-950">
                  {activeModalCota.numero}
                </span>
              </div>

              {activeModalCota.isSold ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-700 space-y-1 border border-slate-200 text-left">
                    <p>
                      <strong>Status:</strong> Já registrada
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

                  <p className="text-xs text-slate-500">
                    Este número já foi adquirido. Escolha outro número livre na grade para participar.
                  </p>

                  <button
                    onClick={() => setActiveModalCota(null)}
                    className="w-full py-3 rounded-xl bg-navy-950 text-white font-bold text-xs hover:bg-navy-800 transition-colors"
                  >
                    Voltar para a Grade
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Você será direcionado para o WhatsApp de Maria Júlia com a mensagem:
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-800 italic text-left">
                    &ldquo;Oi Maria Júlia, quero a cota número {activeModalCota.numero} da sua Ação Solidária!&rdquo;
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => confirmWhatsAppRedirect(activeModalCota.numero)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir no WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setActiveModalCota(null)}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
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
