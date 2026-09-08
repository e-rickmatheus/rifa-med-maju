"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  UserCheck,
  Trash2,
  Edit2,
  CheckCircle,
  Plus,
  X,
} from "lucide-react";
import { Cota } from "@/types/raffle";
import { saveCotaSale, releaseCota } from "@/lib/raffleService";
import { formatDate, formatCotaNumber } from "@/lib/utils";

interface AdminSalesManagerProps {
  totalNumbers: number;
  cotasMap: Record<string, Cota>;
}

export default function AdminSalesManager({
  totalNumbers,
  cotasMap,
}: AdminSalesManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNumero, setEditingNumero] = useState("");
  const [nomeComprador, setNomeComprador] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isSoldMode, setIsSoldMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // Lista de todas as vendas cadastradas
  const soldList = useMemo(() => {
    return Object.values(cotasMap)
      .filter((c) => c?.status === "vendido")
      .sort((a, b) => parseInt(a.numero, 10) - parseInt(b.numero, 10));
  }, [cotasMap]);

  // Filtro da lista de vendas por termo de busca
  const filteredSoldList = useMemo(() => {
    if (!searchTerm.trim()) return soldList;
    const term = searchTerm.trim().toLowerCase();
    return soldList.filter(
      (c) =>
        c.numero.toLowerCase().includes(term) ||
        (c.nome_comprador && c.nome_comprador.toLowerCase().includes(term)) ||
        (c.telefone && c.telefone.includes(term))
    );
  }, [soldList, searchTerm]);

  // Abertura do modal para cadastrar ou editar cota
  const openSaleModal = (numero: string) => {
    const existing = cotasMap[numero];
    setEditingNumero(numero);
    if (existing && existing.status === "vendido") {
      setIsSoldMode(true);
      setNomeComprador(existing.nome_comprador || "");
      setTelefone(existing.telefone || "");
    } else {
      setIsSoldMode(false);
      setNomeComprador("");
      setTelefone("");
    }
    setModalOpen(true);
    setFeedback(null);
  };

  // Abrir modal com número livre digitado
  const handleOpenNewSale = () => {
    setEditingNumero("");
    setIsSoldMode(false);
    setNomeComprador("");
    setTelefone("");
    setModalOpen(true);
    setFeedback(null);
  };

  const handleSaveSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNumero.trim()) {
      setFeedback({ type: "error", message: "Informe o número da cota." });
      return;
    }
    if (!nomeComprador.trim()) {
      setFeedback({ type: "error", message: "Informe o nome do comprador." });
      return;
    }
    if (!telefone.trim()) {
      setFeedback({ type: "error", message: "Informe o telefone com DDD." });
      return;
    }

    setSaving(true);
    try {
      // Formata com zeros à esquerda
      const numInt = parseInt(editingNumero, 10);
      const formattedNum = isNaN(numInt)
        ? editingNumero.trim()
        : formatCotaNumber(numInt, totalNumbers);

      await saveCotaSale(formattedNum, nomeComprador, telefone);
      setFeedback({
        type: "success",
        message: `Cota ${formattedNum} salva com sucesso!`,
      });
      setTimeout(() => {
        setModalOpen(false);
        setFeedback(null);
      }, 1200);
    } catch (err: any) {
      setFeedback({ type: "error", message: err?.message || "Erro ao registrar venda." });
    } finally {
      setSaving(false);
    }
  };

  const handleReleaseCota = async (numero: string) => {
    const confirmCancel = window.confirm(
      `Deseja realmente cancelar/liberar a cota ${numero}? Ela voltará a ficar disponível para novos compradores.`
    );
    if (!confirmCancel) return;

    setSaving(true);
    try {
      await releaseCota(numero);
      setModalOpen(false);
      setFeedback({
        type: "success",
        message: `Cota ${numero} liberada com sucesso!`,
      });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({ type: "error", message: err?.message || "Erro ao liberar cota." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-navy-950 font-serif-luxury flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-slate-700" />
            Gestão de Vendas de Cotas
          </h3>
          <p className="text-xs text-slate-500">
            Registre novos compradores, altere dados ou cancele cotas vendidas
          </p>
        </div>

        <button
          onClick={handleOpenNewSale}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nova Venda</span>
        </button>
      </div>

      {feedback && !modalOpen && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Barra de Busca de Vendas */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar nas vendas por número da cota, nome do comprador ou telefone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
      </div>

      {/* Tabela de Vendas */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Cota</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Comprador</th>
              <th className="py-3 px-4">Telefone</th>
              <th className="py-3 px-4">Data Registro</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSoldList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 italic">
                  {searchTerm
                    ? "Nenhuma venda corresponde aos termos pesquisados."
                    : "Nenhuma cota foi vendida ainda. Clique em 'Registrar Nova Venda' para começar."}
                </td>
              </tr>
            ) : (
              filteredSoldList.map((item) => (
                <tr key={item.numero} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-black text-navy-950 text-base">
                    {item.numero}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      <CheckCircle className="w-3 h-3" /> Vendido
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {item.nome_comprador || "-"}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-xs">
                    {item.telefone || "-"}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {formatDate(item.data_compra)}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openSaleModal(item.numero)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                      title="Editar Comprador"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReleaseCota(item.numero)}
                      className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Liberar/Cancelar Cota"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Registro / Edição de Venda */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-slate-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif-luxury text-navy-950 mb-1">
              {isSoldMode ? `Editar Cota ${editingNumero}` : "Registrar Nova Venda"}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Preencha os dados do comprador para atualizar o status no sistema
            </p>

            {feedback && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  feedback.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleSaveSale} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Número da Cota
                </label>
                <input
                  type="text"
                  value={editingNumero}
                  onChange={(e) => setEditingNumero(e.target.value)}
                  placeholder="Ex: 042 ou 451"
                  required
                  disabled={isSoldMode}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 font-mono font-bold disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Nome Completo do Comprador
                </label>
                <input
                  type="text"
                  value={nomeComprador}
                  onChange={(e) => setNomeComprador(e.target.value)}
                  placeholder="Ex: Maria Júlia da Silva"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Telefone com DDD (WhatsApp)
                </label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Ex: 37998427884"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 font-mono"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                {isSoldMode && (
                  <button
                    type="button"
                    onClick={() => handleReleaseCota(editingNumero)}
                    disabled={saving}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Liberar Cota</span>
                  </button>
                )}

                <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 text-white text-xs font-bold shadow-sm disabled:opacity-50"
                  >
                    {saving ? "Salvando..." : "Salvar Venda"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
