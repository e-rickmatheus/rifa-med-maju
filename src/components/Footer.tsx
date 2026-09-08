"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, MessageCircle, Lock, Heart } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
}

export default function Footer({ whatsappNumber = "5537998427884" }: FooterProps) {
  return (
    <footer className="bg-navy-950 text-white border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bloco de Agradecimento com a FOTO 0 da Maju */}
        <div className="max-w-4xl mx-auto mb-16 bg-navy-900/80 border border-navy-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Foto 0 da Maju */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-navy-700 shadow-lg bg-navy-950">
                <Image
                  src="/images/foto-maju-0.jpg"
                  alt="Maria Júlia Gomes Gabriel em oração e agradecimento"
                  fill
                  sizes="(max-width: 768px) 250px, 300px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Mensagem de Gratidão Fiel à Referência */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Mensagem da Maria Júlia
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                De coração, muito obrigada!
              </h3>

              <blockquote className="text-sm sm:text-base text-slate-300 leading-relaxed italic border-l-0 md:border-l-2 md:border-navy-700 md:pl-4">
                &ldquo;Mais do que uma rifa, essa é a prova de que sonhos se constroem juntos. Sua ajuda me aproxima da realização do meu maior propósito!&rdquo;
              </blockquote>

              <div className="pt-3">
                <p className="text-base font-bold text-white font-serif-luxury">
                  Maria Júlia Gomes Gabriel
                </p>
                <p className="text-xs text-slate-400">
                  Estudante de Medicina
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Oi Maria Júlia, estou torcendo por você e pelo seu sonho da medicina!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar mensagem de apoio no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha inferior de copyright e navegação */}
        <div className="pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-slate-400" />
            <span>RIFA MED MAJU • Ação Solidária Oficial</span>
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
