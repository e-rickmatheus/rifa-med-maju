"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Lock, Menu, X, MessageCircle } from "lucide-react";

interface HeaderProps {
  whatsappNumber?: string;
}

export default function Header({ whatsappNumber = "5537998427884" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy text-pearl border-b border-navy-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Identificação Editorial */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-full border border-antique-400/40 flex items-center justify-center text-antique-400 group-hover:border-antique-300 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-pearl">
                RIFA MED MAJU
              </span>
              <p className="text-[11px] uppercase tracking-widest text-antique-300/80 font-sans font-medium">
                Ação Solidária • Medicina
              </p>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-sans font-medium text-pearl/80">
            <a href="#premio" className="hover:text-pearl transition-colors">
              O Prêmio
            </a>
            <a href="#como-funciona" className="hover:text-pearl transition-colors">
              Como Funciona
            </a>
            <a href="#pix" className="hover:text-pearl transition-colors">
              Chave PIX
            </a>
            <a
              href="#numeros"
              className="text-pearl font-semibold hover:text-antique-300 transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              Escolher Cota
            </a>
          </nav>

          {/* Ações Direitas */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, tenho dúvidas sobre a sua ação solidária!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-semibold tracking-wide rounded-full bg-emerald hover:bg-emerald-700 text-white transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-sans font-medium tracking-wide rounded-full border border-navy-700 text-pearl/70 hover:text-pearl hover:border-pearl/30 transition-colors"
              title="Acesso Administrativo"
            >
              <Lock className="w-3.5 h-3.5 text-antique-400/80" />
              <span>Painel</span>
            </Link>
          </div>

          {/* Botão Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-pearl/80 hover:text-pearl"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-navy-800 px-6 py-6 space-y-4 text-sm font-sans">
          <a
            href="#premio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-pearl/80 hover:text-pearl py-1"
          >
            O Prêmio
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-pearl/80 hover:text-pearl py-1"
          >
            Como Funciona
          </a>
          <a
            href="#pix"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-pearl/80 hover:text-pearl py-1"
          >
            Chave PIX
          </a>
          <a
            href="#numeros"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-pearl font-semibold py-1"
          >
            Escolher Cota
          </a>
          <div className="pt-4 border-t border-navy-800 flex flex-col gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, tenho dúvidas sobre a sua ação solidária!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-full bg-emerald text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp ((37) 99842-7884)</span>
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs rounded-full border border-navy-700 text-pearl/80"
            >
              <Lock className="w-4 h-4" />
              <span>Painel Administrativo</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
