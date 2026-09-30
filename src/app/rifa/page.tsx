"use client";

import React, { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import PrizeSection from "@/components/PrizeSection";
import ProgressBar from "@/components/ProgressBar";
import HowItWorks from "@/components/HowItWorks";
import PixCard from "@/components/PixCard";
import NumberGrid from "@/components/NumberGrid";
import Footer from "@/components/Footer";
import {
  subscribeRaffleSettings,
  subscribeCotas,
  DEFAULT_SETTINGS,
  normalizeCotasMap,
} from "@/lib/raffleService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { RaffleSettings, Cota } from "@/types/raffle";
import { CloudOff, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RifaPage() {
  const [settings, setSettings] = useState<RaffleSettings>(DEFAULT_SETTINGS);
  const [cotasMap, setCotasMap] = useState<Record<string, Cota>>({});
  const [, setLoading] = useState(true);
  const [firebaseActive, setFirebaseActive] = useState(false);

  useEffect(() => {
    document.title = "Rifa Solidária Honda Pop • Medicina Maria Júlia";
    setFirebaseActive(isFirebaseConfigured());

    const unsubSettings = subscribeRaffleSettings((newSettings) => {
      setSettings(newSettings);
      setLoading(false);
    });

    const unsubCotas = subscribeCotas((newCotas) => {
      setCotasMap(newCotas);
    });

    return () => {
      unsubSettings();
      unsubCotas();
    };
  }, []);

  const totalNumbers = settings.total_numbers || 1000;
  const normalizedCotas = useMemo(
    () => normalizeCotasMap(cotasMap, totalNumbers),
    [cotasMap, totalNumbers]
  );
  const soldCount = Object.keys(normalizedCotas).length;

  return (
    <main className="min-h-screen flex flex-col bg-pearl-50 text-navy font-sans selection:bg-antique-200 selection:text-navy">
      {/* Banner Informativo sobre Status do Banco de Dados */}
      {!firebaseActive && (
        <div className="bg-slate-100 border-b border-slate-200 text-slate-700 px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2">
          <CloudOff className="w-4 h-4 text-slate-500" />
          <span>
            <strong>Modo Local de Testes:</strong> Para sincronizar na nuvem, adicione as credenciais do Firebase da Maju no <code>.env.local</code>.
          </span>
        </div>
      )}

      {/* Faixa superior de navegação rápida entre projetos */}
      <div className="bg-navy-950 text-pearl/80 border-b border-navy-800 py-2 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-antique-400" />
            <span>Ação Oficial • Maria Júlia Medicina UNIFENAS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
            <Link href="/" className="hover:text-pearl transition-colors">
              ← Perfil Oficial
            </Link>
            <span className="text-navy-700">•</span>
            <Link href="/vaquinha" className="text-antique-300 hover:text-pearl transition-colors flex items-center gap-1 font-semibold">
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              Doar na Vaquinha
            </Link>
          </div>
        </div>
      </div>

      {/* Header com Navegação */}
      <Header whatsappNumber={settings.whatsapp} />

      {/* Hero Section com Chamada Principal e Foto HD da Maju */}
      <HeroSection
        price={settings.price}
        prize={settings.prize}
        drawDate={settings.draw_date}
      />

      {/* Seção de Storytelling Emocionante: A Trajetória da Maju */}
      <StorySection />

      {/* Barra de Progresso Dinâmica */}
      <ProgressBar
        total={totalNumbers}
        sold={soldCount}
        price={settings.price}
      />

      {/* Seção do Prêmio (Honda Pop Azul e Ficha Técnica) */}
      <PrizeSection
        price={settings.price}
        drawDate={settings.draw_date}
      />

      {/* 4 Passos Como Funciona */}
      <HowItWorks />

      {/* Card da Chave PIX */}
      <PixCard
        pixKey={settings.pix_key}
        pixName="MARIA JULIA GOMES GABRIEL"
        pixBank="Itaú Unibanco S.A."
        pixCpf="***.198.986-**"
        price={settings.price}
        whatsapp={settings.whatsapp}
      />

      {/* Grade Interativa de Cotas */}
      <NumberGrid
        totalNumbers={totalNumbers}
        cotasMap={cotasMap}
        whatsappNumber={settings.whatsapp}
      />

      {/* Rodapé com Agradecimento */}
      <Footer mode="rifa" whatsappNumber={settings.whatsapp} />
    </main>
  );
}
