"use client";

import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";

interface QuoteItem {
  text: string;
  source: string;
}

const QUOTES: QuoteItem[] = [
  {
    text: "Honra o médico por causa da necessidade, pois foi o Altíssimo quem o criou. Porque a cura vem do Altíssimo...",
    source: "Eclesiástico 38:1-2",
  },
  {
    text: "Tudo o que fizerem, façam de todo o coração, como para o Senhor...",
    source: "Colossenses 3:23",
  },
  {
    text: "Quem não vive para servir, não serve para viver.",
    source: "Provérbio",
  },
  {
    text: "Um ao outro ajudou, e ao seu irmão disse: Esforça-te.",
    source: "Isaías 41:6",
  },
  {
    text: "É melhor ter companhia do que estar sozinho, porque maior é a recompensa do trabalho de duas pessoas.",
    source: "Eclesiastes 4:9",
  },
  {
    text: "Se quer ir rápido, vá sozinho. Se quer ir longe, vá acompanhado.",
    source: "Provérbio Africano",
  },
  {
    text: "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.",
    source: "Provérbios 16:3",
  },
  {
    text: "Até aqui nos ajudou o Senhor.",
    source: "1 Samuel 7:12",
  },
  {
    text: "A esperança não decepciona, porque o amor de Deus foi derramado em nossos corações.",
    source: "Romanos 5:5",
  },
];

// =========================================================================
// CONFIGURAÇÃO DO TEMPO DE TRANSIÇÃO DAS FRASES:
// Altere o valor abaixo (em milissegundos) para definir a frequência com que
// uma nova frase é exibida na tela.
//
// Exemplos de configuração:
// - 10 segundos: 10 * 1000  (padrão ativo)
// - 30 segundos: 30 * 1000
// - 1 minuto:    60 * 1000
// - 1 hora:      60 * 60 * 1000
// =========================================================================
const ROTATION_INTERVAL_MS = 10 * 1000; // 10 segundos por padrão

export default function RotatingQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Inicia animação de fade-out suave
      setIsVisible(false);

      // Aguarda o término da animação de saída (400ms) para trocar o índice
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
        // Inicia animação de fade-in com a nova frase
        setIsVisible(true);
      }, 400);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const currentQuote = QUOTES[currentIndex];

  return (
    <div className="w-full bg-navy-900/60 border border-antique-400/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
      {/* Detalhe estético de aspas no canto */}
      <div className="absolute top-3 right-4 opacity-15 pointer-events-none">
        <Quote className="w-12 h-12 text-antique-300" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Ícone sutil superior */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-4 h-px bg-antique-400/50" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-antique-300 font-sans font-medium">
            Inspiração & Fé
          </span>
          <span className="w-4 h-px bg-antique-400/50" />
        </div>

        {/* Bloco de texto com transição fade-in / fade-out */}
        <div
          className={`min-h-[96px] sm:min-h-[80px] flex flex-col items-center justify-center transition-all duration-500 ease-in-out transform ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-1 scale-[0.99]"
          }`}
        >
          <p className="text-base sm:text-lg font-serif italic text-pearl leading-relaxed max-w-2xl px-2">
            &ldquo;{currentQuote.text}&rdquo;
          </p>

          <span className="mt-2.5 text-xs font-sans uppercase tracking-widest text-antique-400 font-semibold">
            — {currentQuote.source}
          </span>
        </div>

        {/* Indicadores de bolinhas interativas sutis */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-pearl/10">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx === currentIndex) return;
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setIsVisible(true);
                }, 300);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-antique-400"
                  : "w-1.5 bg-pearl/20 hover:bg-pearl/40"
              }`}
              aria-label={`Ver frase ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
