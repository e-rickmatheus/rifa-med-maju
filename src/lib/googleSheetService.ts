import { Cota } from "@/types/raffle";
import { formatCotaNumber } from "./utils";

export const GOOGLE_SHEET_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ||
  "https://docs.google.com/spreadsheets/d/1egTaUeCKIliJXparsrk8ZGRL29lGU5NUa1l0BTv0sXM/edit?hl=pt-br&pli=1&gid=0#gid=0";

export const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1egTaUeCKIliJXparsrk8ZGRL29lGU5NUa1l0BTv0sXM/gviz/tq?tqx=out:csv";

export const APPS_SCRIPT_TEMPLATE = `// Cole este código em: Extensões > Apps Script na sua Planilha Google
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var targetNum = parseInt(String(data.cota), 10);
    var values = sheet.getDataRange().getValues();
    
    // Procura a linha com o número da cota
    for (var i = 1; i < values.length; i++) {
      var rowNum = parseInt(String(values[i][0]), 10);
      if (rowNum === targetNum) {
        var rowIdx = i + 1;
        if (data.action === "release") {
          sheet.getRange(rowIdx, 2).setValue("Disponível");
          sheet.getRange(rowIdx, 3).setValue("");
          sheet.getRange(rowIdx, 4).setValue("");
          sheet.getRange(rowIdx, 5).setValue("");
        } else {
          sheet.getRange(rowIdx, 2).setValue(data.status || "Vendido");
          sheet.getRange(rowIdx, 3).setValue(data.nome || "");
          sheet.getRange(rowIdx, 4).setValue(data.telefone || "");
          sheet.getRange(rowIdx, 5).setValue(data.data || new Date().toLocaleString("pt-BR"));
        }
        return ContentService.createTextOutput(JSON.stringify({ result: "success", row: rowIdx }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Se não encontrou, insere nova linha no final
    if (data.action !== "release") {
      sheet.appendRow([data.cota, data.status || "Vendido", data.nome, data.telefone, data.data]);
    }
    return ContentService.createTextOutput(JSON.stringify({ result: "success", appended: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

/**
 * Lê diretamente os dados da planilha pública do Google Sheets
 */
export async function fetchGoogleSheetSales(totalNumbers: number = 1000): Promise<Record<string, Cota>> {
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, {
      cache: "no-store",
    });
    if (!res.ok) return {};

    const csvText = await res.text();
    const lines = csvText.split(/\r?\n/);
    const result: Record<string, Cota> = {};

    // Linha 0 a 8 geralmente são cabeçalhos ou metadata
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Regex simples para split de CSV respeitando aspas
      const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(",");
      const cleanCols = cols.map((c) => c.replace(/^"|"$/g, "").trim());

      const rawCota = cleanCols[0];
      const cotaNumInt = parseInt(rawCota, 10);
      if (isNaN(cotaNumInt)) continue;

      const status = cleanCols[1] ? cleanCols[1].toLowerCase() : "";
      const nome = cleanCols[2] || "";
      const tel = cleanCols[3] || "";
      const dataStr = cleanCols[4] || "";

      if (status.includes("vendido") || status.includes("pago") || nome.length > 0) {
        const formattedCota = formatCotaNumber(cotaNumInt, totalNumbers);
        const cotaData: Cota = {
          numero: formattedCota,
          status: "vendido",
          nome_comprador: nome,
          telefone: tel,
          data_compra: dataStr || new Date().toISOString(),
        };

        // Salva estritamente pela chave canônica formatada com zeros à esquerda
        result[formattedCota] = cotaData;
      }
    }

    return result;
  } catch (error) {
    console.warn("Erro ao buscar dados do Google Sheets:", error);
    return {};
  }
}

/**
 * Envia atualização de cota para o Webhook do Google Sheets
 */
export async function pushSaleToGoogleSheet(payload: {
  cota: string;
  nome?: string;
  telefone?: string;
  status?: string;
  action?: "sale" | "release";
}): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.trim() === "") {
    // Se o webhook ainda não foi configurado, loga silenciosamente
    return false;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        data: new Date().toLocaleString("pt-BR"),
      }),
    });
    return true;
  } catch (error) {
    console.warn("Erro ao sincronizar com Google Sheets Webhook:", error);
    return false;
  }
}
