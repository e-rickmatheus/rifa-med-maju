import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt, systemInstruction } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "O prompt é obrigatório." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({
        success: false,
        error: "Chave GEMINI_API_KEY não configurada no .env.local. Obtenha a chave gratuita em aistudio.google.com logado com mariajuliagomesgabriel@gmail.com.",
      }, { status: 400 });
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      systemInstruction: systemInstruction
        ? {
            parts: [{ text: systemInstruction }],
          }
        : {
            parts: [
              {
                text: "Você é o assistente oficial inteligente da Maria Júlia Gomes Gabriel, estudante de Medicina da UNIFENAS. Ajude-a com mensagens acolhedoras de agradecimento para doadores e compradores de cotas da sua Rifa Solidária da Moto Honda Pop, além de textos para redes sociais e dúvidas sobre a rotina acadêmica. Seja sempre gentil, empático e focado na causa.",
              },
            ],
          },
    };

    // Chamada à API oficial do Google Gemini com fallback automático entre modelos
    const candidateModels = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-flash-latest"];
    let lastError: any = null;
    let data: any = null;

    for (const model of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          data = await response.json();
          break;
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData?.error?.message || `HTTP ${response.status}`;
        }
      } catch (err: any) {
        lastError = err?.message;
      }
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: lastError || "Não foi possível obter resposta da API do Gemini.",
        },
        { status: 502 }
      );
    }

    const candidateText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Nenhuma resposta gerada.";

    return NextResponse.json({
      success: true,
      text: candidateText,
      usage: data?.usageMetadata || null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Erro inesperado ao conectar à API do Gemini.",
      },
      { status: 500 }
    );
  }
}
