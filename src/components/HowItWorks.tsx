"use client";

import React from "react";
import { MessageSquare, UserCheck, Receipt, Ticket, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "1. Escolha seu número",
      description: "Fale comigo e escolha o número da sua rifa.",
    },
    {
      number: "2",
      icon: UserCheck,
      title: "2. Passe seus dados",
      description: "Me envie seu nome e telefone.",
    },
    {
      number: "3",
      icon: Receipt,
      title: "3. Envio do comprovante",
      description: "Faça o pagamento via PIX e me envie o comprovante.",
    },
    {
      number: "4",
      icon: Ticket,
      title: "4. Receba sua rifa",
      description: "Eu anoto seu nome e telefone e te envio a foto da sua rifa com o número escolhido!",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
            Instruções
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 font-serif-luxury">
            COMO FUNCIONA?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Passo a passo simples para garantir sua participação na ação solidária
          </p>
        </div>

        {/* 4 Passos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-950 text-white flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-300 font-mono">
                      0{step.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-navy-950 mb-1.5 font-serif-luxury">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Canhoto de Controle Original */}
        <div className="mt-12 max-w-xl mx-auto bg-white rounded-2xl p-6 border border-dashed border-slate-300 shadow-sm">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              CONTROLE
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-2 text-xs text-slate-700 w-full sm:w-2/3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <span className="font-bold text-navy-900 w-12">Nome:</span>
                <span className="text-slate-400">________________________</span>
              </div>
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
                <span className="font-bold text-navy-900 w-12">Tel:</span>
                <span className="text-slate-400">________________________</span>
              </div>
            </div>

            <div className="bg-navy-950 text-white border border-navy-800 px-5 py-2.5 rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] uppercase tracking-wider block text-slate-400">Nº</span>
              <span className="text-2xl font-black font-mono tracking-wider">451</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
