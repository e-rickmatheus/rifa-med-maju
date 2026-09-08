"use client";

import React from "react";
import { MessageSquare, UserCheck, Receipt, Ticket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: MessageSquare,
      title: "Escolha seu número",
      description: "Navegue pela grade de cotas livres ou fale comigo no WhatsApp para escolher o seu número da sorte.",
    },
    {
      num: "02",
      icon: UserCheck,
      title: "Envie seus dados",
      description: "Informe seu nome completo e telefone para preenchimento oficial do canhoto de controle da rifa.",
    },
    {
      num: "03",
      icon: Receipt,
      title: "Pagamento via PIX",
      description: "Realize o pagamento de R$ 20,00 por cota na chave celular e envie o comprovante pelo WhatsApp.",
    },
    {
      num: "04",
      icon: Ticket,
      title: "Receba sua cota",
      description: "Anoto seu nome no bilhete oficial e envio a foto da sua cota registrada com total transparência.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-pearl border-b border-pearl-300/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Cabeçalho Editorial */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="w-6 h-px bg-antique-500" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-antique-600 font-sans font-semibold">
              Passo a Passo
            </span>
            <span className="w-6 h-px bg-antique-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy tracking-tight">
            Como Participar
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans font-light">
            Procedimento simples e transparente para registrar sua cota oficial
          </p>
        </div>

        {/* 4 Passos Editoriais com Números em Ouro Envelhecido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 border border-pearl-200 shadow-sm flex flex-col justify-between relative group hover:border-navy/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-pearl-200/80">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-antique-500">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-pearl-100 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-navy mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Canhoto Físico de Controle Ilustrativo */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-dashed border-pearl-400 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-pearl-200">
            <span className="text-[11px] uppercase tracking-[0.2em] text-antique-600 font-sans font-semibold">
              Canhoto Oficial de Controle
            </span>
            <span className="text-[11px] font-sans text-slate-500 font-medium">
              Ação Solidária Medicina
            </span>
          </div>

          <div className="bg-pearl-50 rounded-xl p-5 border border-pearl-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-2.5 text-xs text-navy w-full sm:w-2/3">
              <div className="flex items-center gap-2 border-b border-pearl-200 pb-1.5">
                <span className="font-semibold text-navy w-14">Nome:</span>
                <span className="text-slate-400 font-mono italic">Preenchido com seus dados</span>
              </div>
              <div className="flex items-center gap-2 border-b border-pearl-200 pb-1.5">
                <span className="font-semibold text-navy w-14">Tel:</span>
                <span className="text-slate-400 font-mono italic">Telefone com WhatsApp</span>
              </div>
            </div>

            <div className="bg-navy text-pearl px-5 py-3 rounded-xl text-center min-w-[110px] shadow-sm">
              <span className="text-[9px] uppercase tracking-widest text-antique-300 block font-sans font-medium">
                Cota Nº
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold tracking-wider text-pearl">
                451
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
