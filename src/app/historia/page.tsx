"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StorySection from "@/components/StorySection";

export default function HistoriaPage() {
  useEffect(() => {
    document.title = "Minha Histria  Maria Jlia Gomes Gabriel";
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#0b1526] text-pearl font-sans selection:bg-antique-300 selection:text-navy-950">
      <Header title="Minha Trajetória" />
      <div className="flex-1 mt-10">
        <StorySection />
      </div>
      <Footer />
    </main>
  );
}

