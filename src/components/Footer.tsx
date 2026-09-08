"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Stethoscope, MessageCircle, Lock, Heart } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
}

export default function Footer({ whatsappNumber = "5537998427884" }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-pearl border-t border-navy-900 relative overflow-hidden">
      {/* Luz ambiente sutil de fundo */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-antique-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 relative z-10">
        {/* Bloco de Gratidão com a FOTO 0 da Maju */}
        <div className="max-w-4xl mx-auto mb-20 bg-navy-900/90 border border-navy-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Foto 0 da Maju (Retrato Dignificado) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-antique-400/30 shadow-2xl bg-navy-950">
                <Image
                  src="/images/foto-maju-0.jpg"
                  alt="Maria Júlia Gomes Gabriel com jaleco e terço em agradecimento"
                  fill
                  sizes="(max-width: 768px) 250px, 300px"
                  className="object-cover object-top filter brightness-95 contrast-105"
                />
              </div>
            </div>

            {/* Mensagem de Gratidão Editorial */}
            <div className="md:col-span-7 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 justify-center md:justify-start">
                <span className="w-5 h-px bg-antique-400" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-antique-400 font-sans font-semibold">
                  Agradecimento
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-pearl tracking-tight leading-tight">
                De coração, muito obrigada!
              </h3>

              <blockquote className="text-base sm:text-lg text-pearl/85 font-serif italic leading-relaxed pl-0 md:pl-4 border-l-0 md:border-l-2 md:border-antique-400/60">
                &ldquo;Mais do que uma rifa, essa é a prova de que sonhos se constroem juntos. Sua ajuda me aproxima da realização do meu maior propósito!&rdquo;
              </blockquote>

              <div className="pt-2 flex flex-col sm:flex-row items-center md:items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-serif font-bold text-pearl">
                    Maria Júlia Gomes Gabriel
                  </p>
                  <p className="text-xs uppercase tracking-widest text-antique-300 font-sans font-medium mt-0.5">
                    Estudante de Medicina • UNIFENAS
                  </p>
                </div>

                <div className="h-9 w-auto bg-white/95 px-3 py-1.5 rounded-lg flex items-center justify-center shadow-sm" title="Universidade José do Rosário Vellano - UNIFENAS">
                  <Image
                    src="/images/unifenas-logo.svg"
                    alt="UNIFENAS - Universidade José do Rosário Vellano"
                    width={110}
                    height={26}
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, estou torcendo por você e pelo seu sonho da medicina!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald hover:bg-emerald-700 text-white font-sans font-semibold text-xs sm:text-sm transition-all duration-300 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Mensagem de Apoio no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Linha inferior de navegação e créditos institucionais */}
        <div className="pt-8 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-antique-400" />
            <span className="font-medium text-slate-300">Rifa Solidária • Medicina UNIFENAS</span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pearl transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald" />
              <span>(37) 99842-7884</span>
            </a>

            <Link
              href="/admin"
              className="hover:text-pearl transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Painel Administrativo</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
