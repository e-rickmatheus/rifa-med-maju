"use client";

import React, { useState } from "react";
import { Copy, Check, Phone, User, DollarSign, MessageCircle, ShieldCheck, Building2 } from "lucide-react";
import confetti from "canvas-confetti";
import { formatCurrency } from "@/lib/utils";

// Componente da Logo Oficial do Banco Itaú em SVG
function ItauLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Banco Itaú"
    >
      <rect width="40" height="40" rx="10" fill="#EC7000" />
      <text
        x="20"
        y="25.5"
        fill="#002D72"
        fontSize="14.5"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
        letterSpacing="-0.6px"
      >
        itaú
      </text>
    </svg>
  );
}

interface PixCardProps {
  pixKey?: string;
  pixName?: string;
  pixBank?: string;
  pixCpf?: string;
  price?: number;
  whatsapp?: string;
}

export default function PixCard({
  pixKey = "37998427884",
  pixName = "MARIA JULIA GOMES GABRIEL",
  pixBank = "Itaú Unibanco S.A.",
  pixCpf = "***.198.986-**",
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
        colors: ["#0A1A32", "#2D7D66", "#C0B283", "#EC7000"],
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const whatsappConfirmationUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Oi Maria Júlia, acabei de realizar o pagamento da minha cota da rifa pelo PIX! Segue o comprovante.`
  )}`;

  return (
    <section id="pix" className="py-20 sm:py-28 bg-white border-b border-pearl-300/60">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-navy rounded-3xl p-8 sm:p-12 text-pearl border border-navy-800 relative overflow-hidden shadow-2xl">
          {/* Luz ambiente sutil */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-antique-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Cabeçalho */}
          <div className="text-center max-w-lg mx-auto mb-10 space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 justify-center">
              <span className="w-6 h-px bg-antique-400" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-antique-400 font-sans font-semibold">
                Transferência Instantânea • Banco Itaú
              </span>
              <span className="w-6 h-px bg-antique-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pearl tracking-tight">
              Pagamento via PIX
            </h2>

            <p className="text-xs sm:text-sm text-pearl/75 font-sans font-light leading-relaxed">
              Transfira o valor de <strong className="text-pearl font-medium">{formatCurrency(price)}</strong> por cota diretamente para a conta da estudante Maria Júlia no <strong className="text-pearl font-medium">Banco Itaú</strong>.
            </p>
          </div>

          {/* Box Principal da Chave Celular com Copiar */}
          <div className="bg-navy-950/90 border border-navy-800 rounded-2xl p-6 sm:p-8 mb-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-xl bg-navy-850 border border-navy-700 flex items-center justify-center text-antique-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-antique-300/80 font-sans font-medium block">
                    Chave Celular
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-pearl select-all">
                    {pixKey}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-semibold text-xs sm:text-sm transition-all duration-300 shadow-sm ${
                  copied
                    ? "bg-emerald text-white"
                    : "bg-pearl text-navy hover:bg-white"
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
              <div className="mt-4 pt-3 border-t border-navy-800/80 text-center text-xs font-sans text-emerald-100 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald" />
                <span>Chave copiada com sucesso! Cole no aplicativo do seu banco para transferir.</span>
              </div>
            )}
          </div>

          {/* Grade de Conferência: Banco Itaú, Favorecida e CPF Mascarado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
            {/* Banco Itaú com Logo */}
            <div className="bg-navy-950/60 rounded-xl p-4 sm:p-5 border border-navy-850 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ItauLogo className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans block">
                  Banco Destino
                </span>
                <span className="text-sm font-sans font-semibold text-pearl">
                  {pixBank}
                </span>
              </div>
            </div>

            {/* Titular Favorecida */}
            <div className="bg-navy-950/60 rounded-xl p-4 sm:p-5 border border-navy-850 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-navy-850 flex items-center justify-center text-slate-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans block">
                  Titular Favorecida
                </span>
                <span className="text-sm font-sans font-medium text-pearl">
                  {pixName}
                </span>
              </div>
            </div>

            {/* CPF Mascarado */}
            <div className="bg-navy-950/60 rounded-xl p-4 sm:p-5 border border-navy-850 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-navy-850 flex items-center justify-center text-emerald shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans block">
                  CPF Destinatário
                </span>
                <span className="text-sm font-mono font-medium text-pearl">
                  {pixCpf}
                </span>
              </div>
            </div>
          </div>

          {/* Dica de Segurança e Conferência */}
          <div className="bg-navy-950/40 rounded-xl p-4 border border-navy-850 mb-8 flex items-start gap-3 relative z-10 text-left">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <p className="text-xs text-pearl/80 font-sans leading-relaxed">
              <strong>Conferência no Aplicativo:</strong> Ao efetuar a transferência, certifique-se de que o destinatário selecionado é o <strong className="text-pearl">Itaú Unibanco S.A.</strong> em nome de <strong className="text-pearl">{pixName}</strong> com CPF <strong className="text-pearl font-mono">{pixCpf}</strong>.
            </p>
          </div>

          {/* CTA Envio do Comprovante */}
          <div className="text-center pt-2 relative z-10">
            <a
              href={whatsappConfirmationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald hover:bg-emerald-700 text-white font-sans font-semibold text-sm transition-all duration-300 w-full sm:w-auto shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Comprovante no WhatsApp • (37) 99842-7884</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
