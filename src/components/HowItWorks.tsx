"use client";

import React from "react";
import { MessageSquare, UserCheck, Receipt, Ticket, ArrowRight, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "1. Escolha seu número",
      description: "Selecione o seu número na grade abaixo ou fale comigo no WhatsApp.",
    },
    {
      number: "2",
      icon: UserCheck,
      title: "2. Passe seus dados",
      description: "Me envie seu nome completo e telefone de contato para o registro do bilhete.",
    },
    {
      number: "3",
      icon: Receipt,
      title: "3. Envio do comprovante",
      description: "Faça o pagamento de R$ 20,00 via PIX e me envie o comprovante no WhatsApp.",
    },
    {
      number: "4",
      icon: Ticket,
      title: "4. Receba sua rifa",
      description: "Eu anoto seu nome e telefone e te envio a foto oficial da sua cota registrada!",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-cream-100/60 border-y border-gold-200/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-200/60 text-gold-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-gold-600 fill-gold-600" />
            Passo a Passo Simples
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 font-serif-luxury">
            Como Funciona a Rifa?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Participar é muito fácil, transparente e rápido. Siga as 4 etapas abaixo para garantir seu bilhete:
          </p>
        </div>

        {/* Grade dos 4 Passos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gold-200/80 hover:shadow-md hover:border-gold-400 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Número do Passo */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-300 flex items-center justify-center font-bold text-lg shadow-navy group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-gold-300/70 font-display-luxury">
                    0{step.number}
                  </span>
                </div>

                {/* Conteúdo */}
                <div>
                  <h3 className="text-base font-bold text-navy-950 mb-2 font-serif-luxury">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Indicador de fluxo visual no desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-gold-400">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloco Ilustrativo do Cupom de Controle Oficial (Inspirado no Encarte) */}
        <div className="mt-14 max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-7 shadow-md border-2 border-dashed border-gold-300 relative overflow-hidden">
          <div className="text-center mb-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Modelo do Canhoto de Controle
            </span>
            <h4 className="text-lg font-bold text-navy-900 mt-2 font-serif-luxury">
              Registro Físico & Digital do seu Número
            </h4>
          </div>

          <div className="bg-amber-50/40 rounded-xl p-5 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 w-full sm:w-2/3">
              <div className="flex items-center gap-2 border-b border-amber-200/80 pb-1.5">
                <span className="font-bold text-navy-900 min-w-[50px]">Nome:</span>
                <span className="text-slate-500 italic">Preenchido com seus dados</span>
              </div>
              <div className="flex items-center gap-2 border-b border-amber-200/80 pb-1.5">
                <span className="font-bold text-navy-900 min-w-[50px]">Tel:</span>
                <span className="text-slate-500 italic">WhatsApp com DDD</span>
              </div>
            </div>

            {/* Número Destaque */}
            <div className="bg-navy-900 text-gold-300 border-2 border-gold-400 px-6 py-3 rounded-xl text-center shadow-md min-w-[120px]">
              <span className="text-[10px] uppercase tracking-wider block text-gold-200/80">Cota Exemplo</span>
              <span className="text-3xl font-black font-display-luxury tracking-widest">451</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
