"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Plus, 
  Trash2, 
  Search, 
  FileSpreadsheet, 
  Check, 
  AlertCircle, 
  Users, 
  DollarSign, 
  MessageCircle 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Donation } from "@/types/raffle";
import { 
  subscribeDonations, 
  saveDonation, 
  deleteDonation, 
  exportDonationsCSV 
} from "@/lib/donationService";

export default function AdminDonationManager() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [nomeDoador, setNomeDoador] = useState("");
  const [valor, setValor] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeDonations((data) => {
      setDonations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const totalArrecadado = donations.reduce((sum, d) => sum + d.valor, 0);
  const ticketMedio = donations.length > 0 ? totalArrecadado / donations.length : 0;

  const filteredDonations = donations.filter((d) => 
    d.nome_doador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.mensagem && d.mensagem.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeDoador.trim()) {
      setFeedback({ type: "error", msg: "O nome do doador é obrigatório." });
      return;
    }
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum < 1) {
      setFeedback({ type: "error", msg: "O valor deve ser de pelo menos R$ 1,00." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await saveDonation(nomeDoador, valorNum, telefone, mensagem);
      setFeedback({ type: "success", msg: "Doação registrada com sucesso!" });
      setNomeDoador("");
      setValor("");
      setTelefone("");
      setMensagem("");
      
      setTimeout(() => setFeedback(null), 3000);
    } catch (error) {
      console.error(error);
      setFeedback({ type: "error", msg: "Erro ao registrar a doação." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a doação de ${nome}?`)) {
      try {
        await deleteDonation(id);
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro ao excluir doação.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-3">
            <Users size={24} />
          </div>
          <p className="text-sm text-green-600 font-medium">Total de Doações</p>
          <p className="text-3xl font-bold text-green-900 mt-1">{donations.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-3">
            <Heart size={24} />
          </div>
          <p className="text-sm text-green-600 font-medium">Valor Total Arrecadado</p>
          <p className="text-3xl font-bold text-green-900 mt-1">{formatCurrency(totalArrecadado)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mb-3">
            <DollarSign size={24} />
          </div>
          <p className="text-sm text-slate-500 font-medium">Ticket Médio</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{formatCurrency(ticketMedio)}</p>
        </div>
      </div>

      {/* Add Donation Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 p-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Plus size={20} className="text-green-600" />
            Nova Doação
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
          {feedback && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${feedback.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
              {feedback.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
              <p className="font-medium">{feedback.msg}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Nome do Doador *</label>
              <input
                type="text"
                value={nomeDoador}
                onChange={(e) => setNomeDoador(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ex: João Silva"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Valor (R$) *</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ex: 50,00"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ex: (11) 99999-9999"
              />
            </div>
            
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Mensagem / Observação</label>
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Mensagem de apoio..."
                rows={2}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Heart size={18} />
              )}
              Registrar Doação
            </button>
          </div>
        </form>
      </div>

      {/* Donations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Heart size={20} className="text-green-600" />
            Doações Registradas
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar doador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-full sm:w-64"
              />
            </div>
            
            <button
              onClick={() => exportDonationsCSV(donations)}
              disabled={donations.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <FileSpreadsheet size={16} />
              Exportar CSV
            </button>
          </div>
        </div>

        <div className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Carregando doações...</div>
          ) : donations.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Heart size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma doação registrada</h3>
              <p className="text-gray-500">As doações registradas aparecerão aqui.</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nenhuma doação encontrada para sua busca.</div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Doador</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contato / Mensagem</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(d.data_doacao).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{d.nome_doador}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {formatCurrency(d.valor)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {d.telefone && <div>{d.telefone}</div>}
                            {d.mensagem && (
                              <div className="flex items-start gap-1 mt-1 text-gray-500 italic">
                                <MessageCircle size={14} className="mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">{d.mensagem}</span>
                              </div>
                            )}
                            {!d.telefone && !d.mensagem && <span className="text-gray-400">-</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleDelete(d.id, d.nome_doador)}
                            className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors"
                            title="Excluir doação"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredDonations.map((d) => (
                  <div key={d.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{d.nome_doador}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {new Date(d.data_doacao).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {formatCurrency(d.valor)}
                      </span>
                    </div>
                    
                    {(d.telefone || d.mensagem) && (
                      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 space-y-1.5">
                        {d.telefone && <div><span className="font-medium text-gray-700">Tel:</span> {d.telefone}</div>}
                        {d.mensagem && (
                          <div className="flex items-start gap-1.5 pt-1">
                            <MessageCircle size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
                            <span className="italic">{d.mensagem}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleDelete(d.id, d.nome_doador)}
                        className="flex items-center gap-1.5 text-sm text-red-600 font-medium px-3 py-1.5 bg-red-50 rounded-lg active:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
