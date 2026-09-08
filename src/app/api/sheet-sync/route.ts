import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.trim() !== "") {
      const googleRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          data: new Date().toLocaleString("pt-BR"),
        }),
      });

      const data = await googleRes.json().catch(() => ({}));
      return NextResponse.json({ success: true, forwarded: true, googleResponse: data });
    }

    return NextResponse.json({
      success: true,
      forwarded: false,
      message: "Webhook não configurado no .env.local, dado registrado localmente.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao sincronizar com Google Sheets." },
      { status: 500 }
    );
  }
}
