"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Lock, Heart, Menu, X, MessageCircle } from "lucide-react";

interface HeaderProps {
  whatsappNumber?: string;
}

export default function Header({ whatsappNumber = "5537998427884" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-gold-500/30 text-white shadow-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Marca */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 flex items-center justify-center text-navy-950 shadow-gold group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider font-display-luxury gold-text-glow">
                RIFA MED MAJU
              </span>
              <p className="text-[11px] sm:text-xs text-gold-200/80 font-medium flex items-center gap-1">
                Ação Solidária <Heart className="w-3 h-3 text-red-400 inline fill-red-400" /> Medicina
              </p>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cream-100">
            <a href="#premio" className="hover:text-gold-300 transition-colors">
              O Prêmio
            </a>
            <a href="#como-funciona" className="hover:text-gold-300 transition-colors">
              Como Funciona
            </a>
            <a href="#pix" className="hover:text-gold-300 transition-colors">
              Pagamento PIX
            </a>
            <a
              href="#numeros"
              className="hover:text-gold-300 transition-colors font-semibold text-gold-300 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Escolher Cota
            </a>
          </nav>

          {/* Ações Direitas */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, tenho dúvidas sobre a sua rifa de medicina!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-200"
              title="Acesso restrito da administradora"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gold-300 hover:bg-navy-800 transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-gold-500/30 px-5 py-5 space-y-4 text-sm animate-fadeIn">
          <a
            href="#premio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cream-100 hover:text-gold-300 py-1"
          >
            O Prêmio
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cream-100 hover:text-gold-300 py-1"
          >
            Como Funciona
          </a>
          <a
            href="#pix"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-cream-100 hover:text-gold-300 py-1"
          >
            Chave PIX
          </a>
          <a
            href="#numeros"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gold-300 font-semibold py-1"
          >
            🎯 Escolher Meu Número
          </a>
          <div className="pt-3 border-t border-navy-800 flex flex-col gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, tenho dúvidas sobre a sua rifa de medicina!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp (37 99842-7884)</span>
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-gold-500/40 text-gold-300"
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
