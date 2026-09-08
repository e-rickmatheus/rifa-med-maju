"use client";

import React, { useState } from "react";
import { Copy, Check, Phone, User, DollarSign, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { formatCurrency } from "@/lib/utils";

interface PixCardProps {
  pixKey?: string;
  pixName?: string;
  price?: number;
  whatsapp?: string;
}

export default function PixCard({
  pixKey = "37998427884",
  pixName = "Maria Júlia Gomes Gabriel",
  price = 20,
  whatsapp = "5537998427884",
}: PixCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#07162c", "#10b981", "#3b82f6"],
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const whatsappConfirmationUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Oi Maria Júlia, fiz o pagamento do PIX para a rifa. Segue o comprovante!`
  )}`;

  return (
    <section id="pix" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-navy-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-navy-800">
          {/* Cabeçalho */}
          <div className="text-center max-w-lg mx-auto mb-8 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Pagamento via PIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif-luxury text-white">
              PIX CELULAR: {pixKey}
            </h2>
            <p className="text-xs text-slate-300">
              Titular: {pixName} • Valor: {formatCurrency(price)} por cota
            </p>
          </div>

          {/* Box da Chave com Botão Copiar */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-slate-200 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Chave Celular
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white select-all">
                    {pixKey}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-white hover:bg-slate-100 text-navy-950"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Chave Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Chave PIX</span>
                  </>
                )}
              </button>
            </div>

            {copied && (
              <div className="mt-3 text-center text-xs font-medium text-emerald-400">
                Chave copiada para a área de transferência. Cole no aplicativo do seu banco.
              </div>
            )}
          </div>

          {/* Informações adicionais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-navy-900/60 rounded-xl p-4 border border-navy-800 flex items-center gap-3">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Favorecida</span>
                <span className="text-sm font-semibold text-white">{pixName}</span>
              </div>
            </div>

            <div className="bg-navy-900/60 rounded-xl p-4 border border-navy-800 flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Valor</span>
                <span className="text-sm font-semibold text-emerald-400">
                  {formatCurrency(price)} por número
                </span>
              </div>
            </div>
          </div>

          {/* Botão Envio do Comprovante */}
          <div className="text-center pt-2">
            <a
              href={whatsappConfirmationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm transition-colors w-full sm:w-auto shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Comprovante no WhatsApp ((37) 99842-7884)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
