"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Lock,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
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
  const [selectedBlock, setSelectedBlock] = useState(0); // Bloco de 100 números (0 = 000-099, 1 = 100-199)
  const [activeModalCota, setActiveModalCota] = useState<{
    numero: string;
    isSold: boolean;
    cotaData?: Cota;
  } | null>(null);

  const blockSize = 100;
  const totalBlocks = Math.ceil(totalNumbers / blockSize);

  // Geração de todos os números disponíveis
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

  // Contadores
  const soldCount = useMemo(() => {
    return Object.values(cotasMap).filter((c) => c?.status === "vendido").length;
  }, [cotasMap]);

  const freeCount = Math.max(0, totalNumbers - soldCount);

  // Filtragem
  const filteredNumbers = useMemo(() => {
    let list = allNumbers;

    // Filtro por tipo
    if (filterType === "livres") {
      list = list.filter((item) => !item.isSold);
    } else if (filterType === "vendidos") {
      list = list.filter((item) => item.isSold);
    }

    // Filtro por busca numérica ou texto
    if (searchTerm.trim() !== "") {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter((item) => item.numero.includes(term));
    }

    return list;
  }, [allNumbers, filterType, searchTerm]);

  // Se o usuário estiver buscando, mostra todos os resultados da busca sem paginação por bloco.
  // Caso contrário, mostra o bloco de 100 selecionado.
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
    if (isSold) {
      // Abre modal informativo com detalhes mascarados
      setActiveModalCota({ numero, isSold: true, cotaData: cota });
    } else {
      // Abre confirmação e link do WhatsApp
      setActiveModalCota({ numero, isSold: false, cotaData: cota });
    }
  };

  const confirmWhatsAppRedirect = (numero: string) => {
    const link = generateWhatsAppLink(numero, whatsappNumber);
    window.open(link, "_blank");
    setActiveModalCota(null);
  };

  return (
    <section id="numeros" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Grade */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            Tabela Interativa em Tempo Real
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-serif-luxury">
            Escolha os seus Números da Sorte
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Clique em qualquer número livre em destaque para solicitá-lo no WhatsApp oficial da Maria Júlia.
          </p>
        </div>

        {/* Legenda de Cores & Status */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-amber-50 border-2 border-gold-400 shadow-sm" />
            <span className="text-slate-700">Disponível / Livre ({freeCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-slate-200 border-2 border-slate-300" />
            <span className="text-slate-500">Já Vendido ({soldCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <span className="text-emerald-700 font-bold">Reserva Direta no WhatsApp</span>
          </div>
        </div>

        {/* Barra de Ferramentas (Busca + Filtros) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Campo de Busca Rápida */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar número (ex: 451 ou 042)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm bg-white"
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

            {/* Abas de Filtros */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => {
                  setFilterType("todos");
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  filterType === "todos"
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Todos ({totalNumbers})
              </button>
              <button
                onClick={() => {
                  setFilterType("livres");
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  filterType === "livres"
                    ? "bg-gold-500 text-navy-950 shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Livres ({freeCount})
              </button>
              <button
                onClick={() => {
                  setFilterType("vendidos");
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  filterType === "vendidos"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Vendidos ({soldCount})
              </button>
            </div>
          </div>

          {/* Navegação por Faixas de 100 números (quando em modo "Todos" sem busca) */}
          {!isSearching && filterType === "todos" && totalBlocks > 1 && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">Navegue por blocos de 100:</span>
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? "bg-gold-500 text-navy-950 shadow-sm scale-105"
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

        {/* Informação sobre o número de resultados */}
        <div className="flex justify-between items-center text-xs text-slate-500 mb-3 px-1">
          <span>
            Exibindo <strong>{currentViewNumbers.length}</strong> números
            {isSearching && ` encontrados para "${searchTerm}"`}
            {!isSearching && filterType === "todos" && ` (Bloco ${selectedBlock + 1} de ${totalBlocks})`}
          </span>
          <span className="italic">Clique no número para interagir</span>
        </div>

        {/* Grade Visual dos Números */}
        {currentViewNumbers.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-bold text-slate-700">Nenhum número encontrado</h4>
            <p className="text-xs text-slate-500 mt-1">
              Verifique a busca digitada ou limpe os filtros para ver mais cotas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-2.5">
            {currentViewNumbers.map((item) => {
              const { numero, isSold, cota } = item;

              if (isSold) {
                // Número Vendido
                const maskedName = maskBuyerName(cota?.nome_comprador);
                const maskedPhone = maskPhoneNumber(cota?.telefone);

                return (
                  <div
                    key={numero}
                    onClick={() => handleCotaClick(numero, true, cota)}
                    className="group relative cursor-pointer"
                    title={`Comprado por ${maskedName} (Tel: ${maskedPhone})`}
                  >
                    <div className="h-12 sm:h-14 rounded-xl bg-slate-200 border border-slate-300 text-slate-500 flex flex-col items-center justify-center font-mono font-bold text-xs sm:text-sm select-none transition-all duration-150 hover:bg-slate-300/80 shadow-inner">
                      <span className="line-through opacity-75">{numero}</span>
                      <span className="text-[9px] font-sans text-slate-500 font-semibold mt-0.5 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Vendido
                      </span>
                    </div>

                    {/* Tooltip Mascarado para Privacidade (Hover no Desktop) */}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-52 p-2.5 bg-navy-950 text-white text-[11px] rounded-xl shadow-xl border border-gold-500/40 pointer-events-none animate-fadeIn">
                      <p className="font-bold text-gold-300">Cota {numero} (Vendida)</p>
                      <p className="text-slate-200 mt-0.5">Comprador: {maskedName}</p>
                      <p className="text-slate-400">Tel: {maskedPhone}</p>
                    </div>
                  </div>
                );
              }

              // Número Livre (Destaque Dourado/Bege)
              return (
                <button
                  key={numero}
                  onClick={() => handleCotaClick(numero, false, cota)}
                  className="h-12 sm:h-14 rounded-xl bg-gradient-to-b from-amber-50 to-orange-50/40 border-2 border-gold-400/80 hover:border-gold-500 text-navy-950 hover:text-navy-900 font-mono font-black text-xs sm:text-sm flex flex-col items-center justify-center shadow-sm hover:shadow-gold hover:scale-105 active:scale-95 transition-all duration-150 group"
                  title={`Cota ${numero} Livre! Clique para escolher`}
                >
                  <span className="tracking-wider">{numero}</span>
                  <span className="text-[9px] font-sans text-gold-700 font-bold uppercase tracking-wider group-hover:text-emerald-700">
                    Livre
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Interativo de Cota */}
        {activeModalCota && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-2 border-gold-400 text-center relative overflow-hidden">
              {/* Badge Topo */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-4 bg-gold-100 text-gold-800">
                {activeModalCota.isSold ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                    Cota Indisponível
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Cota Disponível!
                  </>
                )}
              </div>

              {/* Número Gigante */}
              <div className="mb-5">
                <span className="text-xs text-slate-500 block uppercase tracking-widest font-semibold">
                  Número Selecionado
                </span>
                <span className="text-5xl sm:text-6xl font-black font-display-luxury tracking-widest text-navy-950">
                  {activeModalCota.numero}
                </span>
              </div>

              {activeModalCota.isSold ? (
                // Detalhes mascarados do número já vendido
                <div className="space-y-4">
                  <div className="bg-slate-100 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-1.5 border border-slate-200">
                    <p>
                      <strong>Status:</strong> Já adquirida
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
                    Este número já foi registrado. Por favor, selecione outro número livre na grade para participar!
                  </p>

                  <button
                    onClick={() => setActiveModalCota(null)}
                    className="w-full py-3 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-navy-800 transition-colors"
                  >
                    Escolher Outro Número
                  </button>
                </div>
              ) : (
                // Confirmação para compra do número livre
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Excelente escolha! Ao confirmar, você será direcionado para o WhatsApp da Maria Júlia com a mensagem pronta:
                  </p>

                  <div className="bg-amber-50 rounded-2xl p-4 border border-gold-300 text-xs text-slate-800 italic text-left">
                    &ldquo;Oi Maria Júlia, quero a cota número {activeModalCota.numero} da sua Ação Solidária!&rdquo;
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => confirmWhatsAppRedirect(activeModalCota.numero)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Pedir Cota no WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setActiveModalCota(null)}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                    >
                      Voltar
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
