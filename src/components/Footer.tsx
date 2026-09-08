"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, MessageCircle, Lock } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
}

export default function Footer({ whatsappNumber = "5537998427884" }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-white border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Mensagem de Gratidão fiel ao encarte */}
        <div className="max-w-2xl mx-auto text-center mb-12 bg-navy-900/60 border border-navy-800 rounded-2xl p-7 sm:p-9">
          <h3 className="text-xl font-bold font-serif-luxury text-white mb-3">
            De coração, muito obrigada!
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed italic">
            &ldquo;Mais do que uma rifa, essa é a prova de que sonhos se constroem juntos. Sua ajuda me aproxima da realização do meu maior propósito!&rdquo;
          </p>

          <div className="mt-5 pt-4 border-t border-navy-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Maria Júlia Gomes Gabriel</span>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-slate-400" />
            <span>RIFA MED MAJU • Ação Solidária</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>(37) 99842-7884</span>
            </a>

            <Link
              href="/admin"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Painel Administrativo</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
