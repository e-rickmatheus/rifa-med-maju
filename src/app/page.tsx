"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
} from "@/lib/raffleService";
import { isFirebaseConfigured } from "@/lib/firebase";
import { RaffleSettings, Cota } from "@/types/raffle";
import { CloudOff } from "lucide-react";

export default function LandingPage() {
  const [settings, setSettings] = useState<RaffleSettings>(DEFAULT_SETTINGS);
  const [cotasMap, setCotasMap] = useState<Record<string, Cota>>({});
  const [loading, setLoading] = useState(true);
  const [firebaseActive, setFirebaseActive] = useState(false);

  useEffect(() => {
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
  const soldCount = Object.values(cotasMap).filter((c) => c?.status === "vendido").length;

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* Banner Informativo sobre Status do Banco de Dados */}
      {!firebaseActive && (
        <div className="bg-slate-100 border-b border-slate-200 text-slate-700 px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2">
          <CloudOff className="w-4 h-4 text-slate-500" />
          <span>
            <strong>Modo Local de Testes:</strong> Para sincronizar na nuvem, adicione as credenciais do Firebase no <code>.env.local</code>.
          </span>
        </div>
      )}

      {/* Header com Navegação */}
      <Header whatsappNumber={settings.whatsapp} />

      {/* Hero Section com História e Foto 0 da Maju */}
      <HeroSection
        price={settings.price}
        prize={settings.prize}
        drawDate={settings.draw_date}
      />

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
        pixName={settings.pix_name}
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
      <Footer whatsappNumber={settings.whatsapp} />
    </main>
  );
}
