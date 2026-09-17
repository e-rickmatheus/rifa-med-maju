"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles, ArrowDown, Share2, MapPin, GraduationCap, ShieldCheck } from "lucide-react";

export default function StorySection() {
  const shareText = encodeURIComponent(
    "Conheça a história inspiradora da Maria Júlia, estudante do 8º período de Medicina na UNIFENAS, e participe da rifa solidária para ajudá-la a concluir a faculdade! Concorra a uma Honda Pop 0km:"
  );

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: "Rifa Solidária • Medicina UNIFENAS - Maria Júlia",
          text: "Conheça a história da Maria Júlia e ajude-a a realizar o sonho de se formar médica!",
          url: shareUrl,
        }).catch(() => {});
      } else {
        window.open(`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}`, "_blank");
      }
    }
  };

  return (
    <section id="historia" className="py-20 sm:py-28 bg-white border-b border-pearl-350 relative overflow-hidden">
      {/* Detalhes de luz ambiente decorativos */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-antique-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Cabeçalho da História */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-antique-50 border border-antique-200/80 text-antique-700 text-xs uppercase tracking-widest font-sans font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-antique-500" />
            <span>Uma História de Vocação & Superação</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy tracking-tight leading-tight">
            &ldquo;Cuidar de alguém é uma das formas mais bonitas de amar&rdquo;
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-sans font-light leading-relaxed">
            Das raízes acolhedoras do interior de Minas Gerais ao 8º período de Medicina na UNIFENAS.
            Conheça a caminhada de quem escolheu dedicar a vida a cuidar do próximo.
          </p>
        </div>

        {/* Bloco 1: As Raízes da Infância e a Farmácia (Fotos 1 e 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* Coluna Visual: As duas fotos de infância na farmácia */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
              
              {/* Foto Infância 1 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-antique-100 bg-pearl-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/images/maju-infancia-farmacia-1.jpg"
                    alt="Maria Júlia na infância entre prateleiras de farmácia"
                    fill
                    sizes="(max-width: 768px) 50vw, 280px"
                    className="object-cover object-center scale-105 group-hover:scale-112 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white/95 text-center border-t border-pearl-200">
                  <span className="text-[11px] font-serif italic text-navy-800 block">
                    A primeira consulta
                  </span>
                  <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider">
                    A arte de ouvir e acolher
                  </span>
                </div>
              </div>

              {/* Foto Infância 2 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-antique-100 bg-pearl-100 transform rotate-2 hover:rotate-0 transition-transform duration-300 sm:mt-6">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/images/maju-infancia-farmacia-2.jpg"
                    alt="Maria Júlia pequenina atendendo no telefone da farmácia"
                    fill
                    sizes="(max-width: 768px) 50vw, 280px"
                    className="object-cover object-center scale-105 group-hover:scale-112 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white/95 text-center border-t border-pearl-200">
                  <span className="text-[11px] font-serif italic text-navy-800 block">
                    O desejo de atender
                  </span>
                  <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider">
                    Sempre pronta a ajudar
                  </span>
                </div>
              </div>

              {/* Selo flutuante de afeto */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-navy text-pearl px-4 py-1.5 rounded-full text-xs font-serif shadow-lg border border-antique-400/40 flex items-center gap-1.5 whitespace-nowrap z-20">
                <Heart className="w-3.5 h-3.5 text-antique-400 fill-antique-400" />
                <span>Onde tudo começou</span>
              </div>
            </div>
          </div>

          {/* Coluna Texto: Infância e Aprendizado de Casa */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-antique-600 uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-antique-500" />
              <span>Biquinhas & Abaeté • Raízes Familiares</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy leading-snug">
              A Medicina começou dentro de casa, muito antes da faculdade
            </h3>

            <div className="space-y-4 text-slate-700 font-sans font-light leading-relaxed text-base sm:text-lg">
              <p>
                Eu nasci em Belo Horizonte, mas foi no interior, em <strong className="font-semibold text-navy">Biquinhas</strong> e depois em <strong className="font-semibold text-navy">Abaeté</strong>, que grande parte da minha história começou a ser construída. Foi nessa cidadezinha tão acolhedora onde aprendi as coisas mais simples e, talvez por isso mesmo, as mais valiosas da vida.
              </p>
              <p>
                Eu cresci vendo minha mãe cuidar de todo mundo: das irmãs, dos sobrinhos, dos conhecidos, dos filhos e de quem precisasse dela. Mesmo quando não tinha muito a oferecer, ela sempre encontrava um jeito de amparar. Ao lado dela, meu pai também, com seu jeito protetor, sempre se preocupava e estendia a mão a quem precisasse.
              </p>
              <p className="italic font-serif text-navy-900 border-l-2 border-antique-400 pl-4 py-1 text-base sm:text-lg bg-antique-50/50 rounded-r-lg">
                &ldquo;Eles não eram médicos, mas me ensinaram algo que nenhum livro de medicina consegue ensinar: <strong>cuidar de alguém é uma das formas mais bonitas de amar.</strong>&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bloco 2: Os Desafios, Recomeços e a Família como Fortaleza */}
        <div className="bg-pearl-100/70 border border-pearl-300/80 rounded-3xl p-8 sm:p-12 mb-20 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-antique-600 font-sans font-semibold block">
                Resiliência & Propósito
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-navy leading-snug">
                Cursinho, trabalho, pandemia e a coragem de não desistir
              </h3>
              <p className="text-slate-700 font-sans font-light leading-relaxed text-base sm:text-lg">
                Em 2017, após concluir o ensino médio, tomei a decisão mais desafiadora da minha vida: vim para Belo Horizonte com o peito cheio de sonhos e muitas incertezas. Enfrentei anos intensos de cursinho, conciliei trabalho e estudos, e vivi as incertezas da pandemia. Mais tarde, precisei voltar para casa quando minha mãe adoeceu.
              </p>
              <p className="text-slate-700 font-sans font-light leading-relaxed text-base sm:text-lg">
                Houve momentos em que o cansaço fazia parecer que o sonho precisaria ficar para trás. Mas em 2007 havia nascido outro propósito na minha vida: meu irmão caçula, que tem o dom de me irritar, mas que me faz ser a irmã mais orgulhosa do mundo ao carregar cada dor e alegria comigo.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-antique-200/70 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-antique-100 text-antique-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="font-serif italic text-navy-900 text-sm leading-relaxed">
                &ldquo;Eles não apenas me dizem para continuar; eles criam as condições para que eu possa seguir em frente.&rdquo;
              </p>
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-500 block">
                O apoio incondicional da família
              </span>
            </div>

          </div>
        </div>

        {/* Bloco 3: 8º Período na UNIFENAS (Foto com o Manequim de Bebê) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Coluna Texto: O Presente e o Olhar para o Futuro */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-emerald uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-emerald" />
              <span>Hoje: 8º Período de Medicina • UNIFENAS</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-navy leading-snug">
              &ldquo;Hoje estou mais perto do fim do que do começo&rdquo;
            </h3>

            <div className="space-y-4 text-slate-700 font-sans font-light leading-relaxed text-base sm:text-lg">
              <p>
                Hoje, aos 28 anos, quando coloco meu jaleco e entro nas aulas práticas, existe uma emoção que nunca passa: <strong className="font-semibold text-navy">eu nunca imaginei que chegaria tão longe.</strong>
              </p>
              <p>
                A menina que cresceu em Biquinhas e a jovem que chegou a BH em 2017 cheia de medo não sabiam quantas vezes teriam que recomeçar. Mas hoje tenho a certeza do que me move:
              </p>
              <blockquote className="border-l-2 border-emerald pl-4 py-2 bg-emerald/5 rounded-r-xl font-serif italic text-navy-900 text-base sm:text-lg">
                &ldquo;Quero cuidar com amor, com humanidade e com a sensibilidade de quem sabe que, muitas vezes, o que uma pessoa mais precisa é simplesmente encontrar alguém que não desista dela.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Coluna Visual: Foto 3 - Maria Júlia no laboratório com o bebê */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-pearl-200">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/maju-faculdade-bebe.jpg"
                  alt="Maria Júlia cuidando com carinho de manequim infantil na aula prática de medicina na UNIFENAS"
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-top hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Legenda elegante sobre a foto */}
              <div className="p-4 bg-navy-950/95 text-pearl border-t border-navy-800">
                <p className="font-serif font-semibold text-sm sm:text-base">
                  Maria Júlia Gomes Gabriel
                </p>
                <p className="text-xs text-antique-300 font-sans mt-0.5">
                  Prática de Cuidados Pediátricos & Neonatais • UNIFENAS
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bloco de Chamada Solidária (O Apelo que Converte) */}
        <div className="bg-gradient-to-br from-navy via-navy to-navy-900 text-pearl rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden border border-antique-400/30">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-pearl leading-tight">
              Faça Parte da Realização desse Sonho
            </h3>
            
            <p className="text-base sm:text-lg text-pearl/85 font-sans font-light leading-relaxed">
              Para conseguir concluir essa caminhada, chegar à tão sonhada formatura e transformar esses anos de esforço no diploma de médica, estou realizando essa rifa solidária para ajudar com os custos da faculdade.
            </p>

            <p className="text-sm sm:text-base text-antique-300 font-serif italic">
              &ldquo;Se você puder participar, vou receber sua ajuda com o coração cheio de gratidão. E se não puder comprar uma cota, compartilhar essa rifa com seus amigos e familiares já significa muito para mim!&rdquo;
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#numeros"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primaryBlue hover:bg-primaryBlue-hover text-white font-sans font-semibold text-sm shadow-lg hover:shadow-primaryBlue/30 transition-all duration-300"
            >
              <span>Garantir Meu Número na Rifa</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-pearl/10 hover:bg-pearl/20 text-pearl font-sans font-medium text-sm border border-pearl/20 hover:border-pearl/40 transition-all duration-300"
            >
              <Share2 className="w-4 h-4 text-antique-300" />
              <span>Compartilhar com Amigos</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
