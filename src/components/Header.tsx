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
    <header className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md border-b border-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identificação */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-white group-hover:bg-navy-700 transition-colors">
              <GraduationCap className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-wide font-display-luxury text-white">
                RIFA MED MAJU
              </span>
              <p className="text-[11px] text-slate-300 font-normal">
                Ação Solidária • Medicina
              </p>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            <a href="#premio" className="hover:text-white transition-colors">
              O Prêmio
            </a>
            <a href="#como-funciona" className="hover:text-white transition-colors">
              Como Funciona
            </a>
            <a href="#pix" className="hover:text-white transition-colors">
              Chave PIX
            </a>
            <a
              href="#numeros"
              className="text-white font-semibold hover:text-blue-200 transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Escolher Número
            </a>
          </nav>

          {/* Ações Direitas */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, tenho dúvidas sobre a sua rifa!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-navy-700 hover:bg-navy-900 text-slate-300 hover:text-white transition-colors"
              title="Acesso da Organizadora"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Painel</span>
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-900 transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-b border-navy-800 px-5 py-5 space-y-4 text-sm">
          <a
            href="#premio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white py-1"
          >
            O Prêmio
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white py-1"
          >
            Como Funciona
          </a>
          <a
            href="#pix"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white py-1"
          >
            Chave PIX
          </a>
          <a
            href="#numeros"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white font-semibold py-1"
          >
            Escolher Número
          </a>
          <div className="pt-3 border-t border-navy-800 flex flex-col gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, tenho dúvidas sobre a sua rifa!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp ((37) 99842-7884)</span>
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-navy-700 text-slate-300"
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
