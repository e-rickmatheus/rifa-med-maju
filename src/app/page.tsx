"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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

    // Assinatura de configurações
    const unsubSettings = subscribeRaffleSettings((newSettings) => {
      setSettings(newSettings);
      setLoading(false);
    });

    // Assinatura de cotas
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
    <main className="min-h-screen flex flex-col bg-cream-50">
      {/* Banner Informativo sobre Status do Banco de Dados */}
      {!firebaseActive && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-900 px-4 py-2 text-center text-xs font-semibold flex items-center justify-center gap-2">
          <CloudOff className="w-4 h-4 text-amber-600" />
          <span>
            <strong>Modo Local / Demonstração Ativo:</strong> Todas as ações funcionam instantaneamente. Para sincronizar na nuvem, adicione suas chaves no <code>.env.local</code>.
          </span>
        </div>
      )}

      {/* Header com Navegação */}
      <Header whatsappNumber={settings.whatsapp} />

      {/* Hero Section com História e Foto */}
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
