"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import Footer from "@/components/Footer";
import {
  Heart,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Home,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Gift,
  Award,
  MapPin,
  Clock,
  Users,
  Share2,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function VaquinhaPage() {
  const [copiedPix, setCopiedPix] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  const pixKey = "37998427884";
  const whatsappNumber = "5537998427884";
  const vakinhaUrl =
    process.env.NEXT_PUBLIC_VAKINHA_URL && process.env.NEXT_PUBLIC_VAKINHA_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_VAKINHA_URL
      : "https://www.vakinha.com.br/vaquinha/rumo-a-formacao-em-medicina-ajude-a-transformar-esse-sonho-em-realidade?utm_source=google-ads&utm_medium=cpc&utm_campaign=GA+-+%5BSearch%5D+%5BVakinhas%5D+Marca+%28Convers%C3%A3o%29+%28site%29&utm_campaign_id=22579434424";

  React.useEffect(() => {
    document.title = "Vaquinha Solidária • Ajude a Maju a se Formar em Medicina";
  }, []);

  const handleCopyPix = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(pixKey);
      setCopiedPix(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
      });
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  const handleShareStory = () => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      const text =
        "Conheça a história comovente da Maria Júlia, estudante do 8º período de Medicina na UNIFENAS. De Biquinhas/MG rumo ao diploma de médica! Apoie a vaquinha ou compartilhe:";
      if (navigator.share) {
        navigator.share({
          title: "Vaquinha Solidária • Maria Júlia Medicina UNIFENAS",
          text: text,
          url: shareUrl,
        }).catch(() => {});
      } else {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
      }
    }
  };

  const donationTiers = [
    {
      value: 10,
      label: "R$ 10",
      description: "Xerox, materiais e apostilas",
      badge: "Semente",
      popular: false,
    },
    {
      value: 25,
      label: "R$ 25",
      description: "Transporte e alimentação",
      badge: "Incentivo",
      popular: false,
    },
    {
      value: 50,
      label: "R$ 50",
      description: "Jaleco e insumos de estágio",
      badge: "Mais Escolhido",
      popular: true,
    },
    {
      value: 100,
      label: "R$ 100",
      description: "Auxílio moradia estudantil",
      badge: "Apoiador Fiel",
      popular: false,
    },
    {
      value: 200,
      label: "R$ 200",
      description: "Cota Padrinho da futura médica",
      badge: "Padrinho",
      popular: false,
    },
  ];

  const getWhatsAppMessage = (val: number | null) => {
    if (val) {
      return `Oi Maria Júlia! Acabei de contribuir com R$ ${val},00 na sua Vaquinha da Medicina! Li toda a sua história e estou na torcida pelo seu diploma. Segue o comprovante com muito carinho: ❤️🩺`;
    }
    return "Oi Maria Júlia! Acabei de contribuir com a sua Vaquinha da Medicina! Li sua história e quero te ver formada. Segue o comprovante: ❤️🩺";
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0b1526] text-pearl font-sans selection:bg-antique-300 selection:text-navy-950">
      
      {/* Topo de Navegação */}
      <header className="sticky top-0 z-40 bg-navy/90 backdrop-blur-md border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-green-500/40 bg-navy-900 flex items-center justify-center text-green-400 group-hover:border-green-400 transition-colors">
                <Heart className="w-5 h-5 text-green-400 fill-green-400" />
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-white block leading-tight">
                  Vaquinha da Maju
                </span>
                <span className="text-xs text-antique-300 block font-light">
                  Medicina UNIFENAS • Rumo à Formatura
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-3 sm:gap-5 text-xs font-semibold">
              <button
                onClick={handleShareStory}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-navy-700 text-slate-300 hover:text-white transition-colors"
                title="Compartilhar história"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar</span>
              </button>

              <Link
                href="/rifa"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primaryBlue/20 border border-primaryBlue/40 text-antique-300 hover:text-white transition-colors"
              >
                <Gift className="w-3.5 h-3.5 text-antique-400" />
                <span>Rifa da Moto (R$ 20)</span>
              </Link>

              <Link
                href="/"
                className="hidden md:inline-flex px-3.5 py-2 rounded-full bg-navy-800 hover:bg-navy-700 text-pearl transition-colors"
              >
                Início
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Emocional da Vaquinha */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-navy-800">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/80 border border-green-800/60 text-green-300 text-xs font-semibold tracking-wide">
            <Heart className="w-3.5 h-3.5 fill-green-400 text-green-400" />
            <span>Ação Solidária Oficial de Maria Júlia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.2]">
            &ldquo;Mais perto do fim do que do começo. <br />
            <span className="italic font-light text-antique-300">
              Já cheguei muito mais longe do que um dia imaginei.&rdquo;
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            A menina que cresceu em Biquinhas e enfrentou recomeços e incertezas, hoje
            está no <strong>8º período de Medicina na UNIFENAS</strong>. Faltam poucos passos para o diploma.
            Ajude Maria Júlia a não desistir na reta final.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#doar"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-green-700 hover:bg-green-600 text-white font-semibold text-sm shadow-xl shadow-green-700/20 transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Apoiar via PIX</span>
            </a>

            <a
              href={vakinhaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald hover:bg-emerald-700 text-white font-semibold text-sm shadow-xl shadow-emerald/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Apoiar via Vakinha.com</span>
            </a>

            <a
              href="#historia"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-200 text-sm font-semibold transition-all"
            >
              <span>Ler História</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* 3 Métricas Emocionantes */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 max-w-2xl mx-auto border-t border-navy-800 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                28 anos
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400">Idade & Determinação</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-antique-300 block">
                8º Período
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400">Medicina UNIFENAS</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald block">
                Reta Final
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400">Internato & Formatura</span>
            </div>
          </div>
        </div>
      </section>

      {/* O STORYTELLING PROFUNDO & COMOVENTE */}
      <section id="historia" className="py-20 sm:py-28 bg-[#fdfbf7] text-slate-800 relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-antique-600 font-bold">
              Nas Palavras de Maria Júlia
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-950">
              A Estrada Até o Jaleco Branco
            </h2>
            <div className="w-16 h-1 bg-antique-400 mx-auto rounded-full" />
          </div>

          {/* CAPÍTULO 1: RAÍZES DO INTERIOR */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700 font-sans">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-antique-700">
                <MapPin className="w-4 h-4" />
                <span>Belo Horizonte • Biquinhas • Abaeté</span>
              </div>
              <p>
                Eu nasci em Belo Horizonte, mas foi no interior, em <strong>Biquinhas</strong>, que grande parte da minha história começou a ser construída.
              </p>
              <p>
                Foi nessa cidadezinha bem pequena onde aprendi as coisas mais simples e, talvez por isso mesmo, as mais importantes da vida. Cresci cercada pela minha família, pelas raízes do interior, por uma rotina diferente da que vivo hoje e por pessoas que, sem saber, ajudaram a formar quem eu sou.
              </p>
              <p>
                Também vivi alguns anos em <strong>Abaeté</strong>, carregando comigo as experiências, os afetos e os aprendizados de cada lugar por onde passei.
              </p>
            </div>

            {/* FOTOS DE INFÂNCIA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <Image
                  src="/images/maju-infancia-farmacia-1.jpg"
                  alt="Maria Júlia na infância na farmácia"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs">
                  Raízes no interior de Minas Gerais
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <Image
                  src="/images/maju-infancia-farmacia-2.jpg"
                  alt="Maria Júlia aprendendo a cuidar desde cedo"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-xs">
                  O sonho de cuidar de pessoas já brilhava nos olhos
                </div>
              </div>
            </div>

            {/* CAPÍTULO 2: A CORAGEM DE 2017 & OS RECOMEÇOS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-navy-800">
                <Clock className="w-4 h-4" />
                <span>2016 a 2020: Luta, Trabalho e a Doença da Mãe</span>
              </div>
              <p>
                Até que, em 2016, terminei o ensino médio. E, no ano seguinte, em 2017, tomei a decisão que mudou completamente a minha trajetória: <strong>vim para Belo Horizonte correr atrás do meu sonho</strong>. Mas a caminhada nunca foi simples.
              </p>
              <p>
                Em BH, fiz cursinho, trabalhei, tentei conciliar responsabilidades, sonhos, diversões. Em alguns momentos, precisei voltar. A vida me levou por caminhos que eu não tinha planejado.
              </p>
              <blockquote className="border-l-4 border-amber-500 pl-4 py-1 italic font-serif text-slate-800 bg-amber-50/50 rounded-r-xl">
                Veio a pandemia, vieram incertezas, dificuldades e, depois, precisei voltar novamente quando minha mãe adoeceu. Houve momentos em que talvez fosse mais fácil acreditar que aquele sonho precisava ficar para trás. <strong className="text-navy-950 font-bold not-italic">Mas ele nunca ficou.</strong>
              </blockquote>
            </div>

            {/* CAPÍTULO 3: ONDE A MEDICINA REALMENTE NASCEU */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-green-600">
                <Heart className="w-4 h-4 fill-green-500 text-green-500" />
                <span>A Verdadeira Lição: Começou Dentro de Casa</span>
              </div>
              <p>
                Hoje, olhando para trás, entendo que talvez a Medicina tenha começado muito antes de eu entrar em uma faculdade. <strong>Ela começou dentro de casa.</strong>
              </p>
              <p>
                Eu cresci vendo minha mãe cuidar de todo mundo. Das irmãs, dos sobrinhos, dos conhecidos, filhos e de quem precisasse dela. Sempre foi uma pessoa que encontrava uma maneira de ajudar, mesmo quando não tinha muito para oferecer. Vi meu pai, à sua maneira, também cuidar de todo mundo, ajudar e se preocupar.
              </p>
              
              {/* FOTOS DE FAMÍLIA: OS PAIS E O IRMÃO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                  <Image
                    src="/images/maju-infancia-pais-bolo.jpeg"
                    alt="Maria Júlia na infância com a mãe e o pai"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white text-xs">
                    Com minha mãe e meu pai: o exemplo de cuidado nasceu aqui
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                  <Image
                    src="/images/maju-irmao-carinho.jpeg"
                    alt="Maria Júlia de jaleco em momento de carinho com criança"
                    fill
                    className="object-cover object-[center_12%]"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-white text-xs">
                    Afeto e empatia: a pureza do vínculo com cada criança atendida
                  </div>
                </div>
              </div>

              <p className="font-serif italic text-xl text-navy-950 leading-snug">
                &ldquo;Eles não eram médicos, mas me ensinaram algo que nenhum livro consegue ensinar: cuidar de alguém é uma das formas mais bonitas de amar.&rdquo;
              </p>
              <p>
                Em <strong>2007</strong>, nasceu outro propósito de cuidar, e esse tem nome, e o prazer de me irritar, mas também faz eu me sentir a irmã mais sortuda do mundo: meu irmão, que carrega todas as dores e alegrias junto comigo.
              </p>
              <p className="font-medium text-navy-950">
                Esse sonho não é só meu, é deles também. Eles não apenas dizem pra eu continuar, eles criam condições para que eu possa continuar.
              </p>
            </div>

            {/* CAPÍTULO 4: O OITAVO PERÍODO & A RETA FINAL */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-emerald-700">
                <Stethoscope className="w-4 h-4" />
                <span>O Presente: 8º Período na UNIFENAS</span>
              </div>
              <p>
                Hoje, aos <strong>28 anos</strong>, estou no <strong>oitavo período de Medicina na UNIFENAS</strong>. E, olhando para tudo o que vivi até aqui, existe uma coisa que ainda me emociona: eu nunca imaginei que chegaria tão longe.
              </p>
              <p>
                A menina que cresceu em Biquinhas, que um dia terminou o ensino médio sem saber exatamente quantos caminhos teria que percorrer, talvez nunca imaginasse que estaria aqui hoje. A jovem que chegou em Belo Horizonte em 2017, cheia de sonhos e incertezas, também não sabia quantas vezes precisaria recomeçar.
              </p>

              {/* FOTOS DE PRÁTICA MÉDICA REAL */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src="/images/maju-cirurgia-foco.jpeg"
                    alt="Maria Júlia no bloco cirúrgico"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-2.5 text-white text-[11px] leading-tight">
                    Bloco Cirúrgico • Precisão e foco
                  </div>
                </div>

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src="/images/maju-pediatria-bebe-colo.jpeg"
                    alt="Maria Júlia com bebê no colo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-2.5 text-white text-[11px] leading-tight">
                    Pediatria • Cuidado com a vida
                  </div>
                </div>

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src="/images/maju-pressao-idosa.jpeg"
                    alt="Maria Júlia atendendo idosa"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-2.5 text-white text-[11px] leading-tight">
                    Acolhimento • Escuta e respeito
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-serif text-lg sm:text-xl font-bold text-center">
                &ldquo;Mais perto do fim do que do começo. Já cheguei muito mais longe do que um dia imaginei.&rdquo;
              </div>
              <p>
                Hoje, meu maior sonho é terminar o curso de Medicina. Chegar ao fim dessa caminhada e poder olhar para trás sabendo que cada dificuldade, cada retorno, cada renúncia e cada lágrima fizeram parte da história.
              </p>
              <p className="text-xl font-serif text-navy-950 italic">
                Quero cuidar com amor, com humanidade e com a sensibilidade de quem sabe que, muitas vezes, o que uma pessoa mais precisa é simplesmente encontrar alguém que não desista dela.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO DE ARRECADAÇÃO & CONVERSÃO (O QUE FAZER AGORA) */}
      <section id="doar" className="py-20 bg-navy text-pearl relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-antique-400 font-bold">
              Como Você Pode Fazer a Diferença
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              Faça Parte do Diploma da Maju
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light">
              Escolha a forma que for mais cômoda para você. Cada centavo vai direto para a manutenção dos estudos.
            </p>
          </div>

          {/* OPÇÃO 1: DOAÇÃO DIRETA VIA PIX (SEM TAXAS - 100% PARA A MAJU) */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-800 space-y-8 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Opção Mais Recomendada (0% de Taxas)
                </span>
                <h3 className="text-2xl font-serif font-bold text-navy-950 mt-2">
                  Doação Direta via PIX Oficial
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  100% do seu valor chega na conta da Maria Júlia sem desconto de plataformas intermediárias.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Conta Verificada Itaú</span>
              </div>
            </div>

            {/* SELEÇÃO DE VALORES RÁPIDOS & QUALQUER VALOR */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block">
                Selecione um valor de apoio ou digite qualquer quantia:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {donationTiers.map((tier) => {
                  const isSelected = selectedAmount === tier.value && !customAmount;
                  return (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(tier.value);
                        setCustomAmount("");
                      }}
                      className={`relative p-3.5 sm:p-4 rounded-2xl border text-center transition-all flex flex-col justify-between items-center gap-1.5 min-h-[115px] ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/70"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        {tier.badge}
                      </span>
                      <span className="text-xl sm:text-2xl font-black font-mono text-navy-950">
                        {tier.label}
                      </span>
                      <span className="text-xs text-slate-600 font-medium leading-snug">
                        {tier.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* OPÇÃO PARA PREENCHER QUALQUER VALOR */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-navy-950 block">
                    Ou prefere contribuir com outro valor?
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Toda ajuda é bem-vinda de coração, qualquer quantia faz a diferença.
                  </span>
                </div>

                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Digite qualquer valor (ex: 15, 35, 150...)"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomAmount(val);
                      const num = Number(val);
                      if (val && !isNaN(num) && num > 0) {
                        setSelectedAmount(num);
                      } else {
                        setSelectedAmount(null);
                      }
                    }}
                    className="w-full pl-11 pr-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-navy-950 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* CARD PIX COM CÓPIA INSTANTÂNEA */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                    Chave PIX Celular da Maria Júlia
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-navy-950 tracking-wider">
                    {pixKey}
                  </span>
                </div>

                <button
                  onClick={handleCopyPix}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  {copiedPix ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? "Chave Copiada com Sucesso!" : "Copiar Chave PIX"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs border-t border-slate-200 pt-4">
                <div>
                  <span className="text-slate-500 block">Titular:</span>
                  <strong className="text-navy-950 font-medium">Maria Júlia Gomes Gabriel</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Banco:</span>
                  <strong className="text-navy-950 font-medium">Itaú Unibanco S.A.</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">CPF Mascarado:</span>
                  <strong className="text-navy-950 font-medium">***.198.986-**</strong>
                </div>
              </div>
            </div>

            {/* BOTÃO WHATSAPP COM COMPROVANTE */}
            <div className="text-center pt-2 space-y-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage(selectedAmount))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {selectedAmount
                    ? `Avisar Maju no WhatsApp (Doação R$ ${selectedAmount})`
                    : "Avisar Maju no WhatsApp sobre a Doação"}
                </span>
              </a>
              <p className="text-xs text-slate-500">
                A Maju faz questão de agradecer pessoalmente cada padrinho e madrinha!
              </p>
            </div>
          </div>

          {/* OPÇÃO 2 & 3: VAKINHA.COM & RIFA DA MOTO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            {/* Opção 2: Pela Vakinha.com (Cartão de Crédito ou Boleto) */}
            <div className="p-8 rounded-3xl bg-navy-900 border border-navy-700 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-green-300 bg-green-950 px-3 py-1 rounded-full border border-green-800">
                  Cartão de Crédito ou Boleto
                </span>
                <h4 className="text-xl font-serif font-bold text-white">
                  Contribuir via Vakinha.com
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Se você prefere parcelar no cartão de crédito ou emitir boleto bancário através da plataforma da Vakinha.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={vakinhaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-700 hover:bg-green-600 text-white font-semibold text-xs transition-colors"
                >
                  <span>Ir para Vakinha.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Opção 3: Rifa da Moto Honda Pop por R$ 20 */}
            <div className="p-8 rounded-3xl bg-navy-900 border border-navy-700 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-antique-300 bg-antique-500/20 px-3 py-1 rounded-full border border-antique-400/40">
                  Concorra a 01 Moto 0km
                </span>
                <h4 className="text-xl font-serif font-bold text-white">
                  Participar da Rifa da Moto (R$ 20)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Adquira uma cota na Rifa Solidária da Maria Júlia, escolha seu número da sorte e concorra a uma Honda Pop!
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/rifa"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primaryBlue hover:bg-primaryBlue-hover text-white font-semibold text-xs transition-colors"
                >
                  <span>Ver Números da Rifa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* MENSAGEM FINAL DE GRATIDÃO */}
          <div className="text-center pt-8 space-y-4 max-w-2xl mx-auto border-t border-navy-800">
            <blockquote className="text-lg sm:text-xl font-serif italic text-pearl/90">
              &ldquo;Se você puder participar, vou receber sua ajuda com o coração cheio de gratidão. E, se não puder doar, compartilhar essa história também já significa o mundo para mim.&rdquo;
            </blockquote>
            <p className="text-xs text-antique-300 font-sans uppercase tracking-widest font-semibold">
              — Maria Júlia Gomes Gabriel • Futura Médica UNIFENAS
            </p>
          </div>

        </div>
      </section>

      {/* Rodapé Oficial (Idêntico ao da Rifa com Créditos Erick Matheus) */}
      <Footer mode="vaquinha" whatsappNumber={whatsappNumber} />
    </main>
  );
}
