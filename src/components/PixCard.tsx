"use client";

import React, { useState } from "react";
import { Copy, Check, QrCode, Phone, User, DollarSign, MessageCircle, Sparkles } from "lucide-react";
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

    // Efeito de confetes festivo ao copiar a chave PIX
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#cda02a", "#dfbe58", "#07162c", "#10b981"],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setCopied(false);
    }, 3500);
  };

  const whatsappConfirmationUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Oi Maria Júlia! Acabei de fazer o pagamento do PIX para a minha cota da rifa de medicina. Segue o meu comprovante!`
  )}`;

  return (
    <section id="pix" className="py-16 sm:py-20 bg-gradient-to-b from-white to-cream-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 rounded-3xl p-7 sm:p-10 shadow-2xl border-2 border-gold-400/60 text-white relative overflow-hidden">
          {/* Luzes decorativas */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Cabeçalho */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Pagamento Instantâneo & Oficial
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif-luxury text-cream-50">
              Chave PIX da Ação Solidária
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/80">
              Copie a chave celular abaixo e realize a transferência de{" "}
              <strong className="text-gold-300 font-bold">{formatCurrency(price)}</strong> por cota.
            </p>
          </div>

          {/* Box Central com a Chave PIX e Botão Copiar */}
          <div className="relative z-10 bg-navy-950/80 border border-gold-500/40 rounded-2xl p-5 sm:p-7 mb-7 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left w-full sm:w-auto">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gold-300/80 font-bold block">
                    Tipo: Chave Celular
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white select-all">
                    {pixKey}
                  </div>
                </div>
              </div>

              {/* Botão Copiar */}
              <button
                onClick={handleCopy}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-md ${
                  copied
                    ? "bg-emerald-600 text-white shadow-emerald-900/50 scale-105"
                    : "bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 shadow-gold"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Chave Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copiar Chave PIX</span>
                  </>
                )}
              </button>
            </div>

            {/* Alerta de confirmação */}
            {copied && (
              <div className="mt-3 text-center text-xs font-semibold text-emerald-400 animate-fadeIn">
                Chave PIX copiada para a área de transferência! Cole agora no app do seu banco.
              </div>
            )}
          </div>

          {/* Dados do Titular e Valor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 mb-6">
            <div className="bg-navy-800/60 rounded-xl p-4 border border-navy-700 flex items-center gap-3">
              <User className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <span className="text-[11px] text-cream-200/70 block uppercase">Titular da Conta</span>
                <span className="text-sm font-bold text-white">{pixName}</span>
              </div>
            </div>

            <div className="bg-navy-800/60 rounded-xl p-4 border border-navy-700 flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-cream-200/70 block uppercase">Valor Unitário</span>
                <span className="text-sm font-bold text-emerald-300">
                  {formatCurrency(price)} por número
                </span>
              </div>
            </div>
          </div>

          {/* Botão de Envio de Comprovante no WhatsApp */}
          <div className="relative z-10 pt-2 text-center">
            <a
              href={whatsappConfirmationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Comprovante no WhatsApp de Maria Júlia</span>
            </a>
            <p className="text-[11px] text-cream-200/70 mt-3">
              Após transferir, envie o comprovante para Maria Júlia para registrar formalmente o seu bilhete!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
