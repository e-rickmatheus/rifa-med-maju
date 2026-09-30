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

    // Chamada à API oficial do Google Gemini (utilizando o modelo mais rápido e econômico gemini-1.5-flash / gemini-2.0-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: errData?.error?.message || `Erro da API Gemini: HTTP ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
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
