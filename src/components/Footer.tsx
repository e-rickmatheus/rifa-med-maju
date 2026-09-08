"use client";

import React from "react";
import Link from "next/link";
import { Heart, GraduationCap, MessageCircle, Lock, ShieldCheck } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
}

export default function Footer({ whatsappNumber = "5537998427884" }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-white border-t border-gold-500/30 relative overflow-hidden">
      {/* Luzes decorativas sutis */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        {/* Mensagem de Gratidão da Maria Júlia (Do Cartaz Oficial) */}
        <div className="max-w-3xl mx-auto text-center mb-12 bg-navy-900/80 border border-gold-400/40 rounded-3xl p-7 sm:p-9 shadow-gold">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-300 mx-auto flex items-center justify-center mb-4 border border-gold-400/40">
            <Heart className="w-6 h-6 text-red-400 fill-red-400" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-cream-50 mb-3">
            De coração, muito obrigada!
          </h3>

          <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed italic max-w-2xl mx-auto">
            &ldquo;Mais do que uma rifa, essa é a prova de que sonhos se constroem juntos. Sua ajuda me
            aproxima da realização do meu maior propósito: cuidar de pessoas através da medicina.&rdquo;
          </p>

          <div className="mt-5 pt-4 border-t border-gold-500/30 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gold-300">
            <span className="font-bold tracking-wider uppercase">Maria Júlia Gomes Gabriel</span>
            <span className="hidden sm:inline">•</span>
            <span>Futura Médica</span>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gold-400" />
            <span>RIFA MED MAJU © 2027 • Todos os direitos reservados</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>(37) 99842-7884</span>
            </a>

            <Link
              href="/admin"
              className="hover:text-gold-300 transition-colors flex items-center gap-1 text-slate-400"
              title="Acesso da Organizadora"
            >
              <Lock className="w-3.5 h-3.5 text-gold-400/70" />
              <span>Painel Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
