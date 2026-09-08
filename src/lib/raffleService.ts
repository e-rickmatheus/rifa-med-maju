import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Cota, RaffleSettings } from "@/types/raffle";
import { formatCotaNumber } from "./utils";
import {
  fetchGoogleSheetSales,
  pushSaleToGoogleSheet,
} from "./googleSheetService";

export const DEFAULT_SETTINGS: RaffleSettings = {
  total_numbers: 1000,
  prize: "01 MOTO HONDA POP",
  price: 20.0,
  draw_date: "24/07/2027",
  pix_key: process.env.NEXT_PUBLIC_PIX_KEY || "37998427884",
  pix_name: process.env.NEXT_PUBLIC_PIX_NAME || "MARIA JULIA GOMES GABRIEL",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5537998427884",
  title: "Rifa Solidaria - Medicina - Maria Julia",
  subtitle: "Ação Solidária em prol da faculdade de Medicina na UNIFENAS",
};

// Dados de demonstração iniciais sincronizados com a planilha oficial
const INITIAL_DEMO_COTAS: Record<string, Cota> = {
  "057": {
    numero: "057",
    status: "vendido",
    nome_comprador: "Erick Moraes",
    telefone: "(31) 9 9295-5010",
    data_compra: "08/03/2026 10:00:00",
  },
};

const LOCAL_STORAGE_SETTINGS_KEY = "rifa_med_maju_settings";
const LOCAL_STORAGE_COTAS_KEY = "rifa_med_maju_cotas";

const LOCAL_EVENT_NAME = "rifa_local_storage_change";

function triggerLocalUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LOCAL_EVENT_NAME));
  }
}

/**
 * Garante que qualquer mapa de cotas seja estritamente indexado
 * pelo seu número canônico formatado (sem duplicatas como "57" e "057")
 */
export function normalizeCotasMap(
  rawMap: Record<string, Cota>,
  totalNumbers: number = 1000
): Record<string, Cota> {
  const normalized: Record<string, Cota> = {};
  for (const [key, cota] of Object.entries(rawMap || {})) {
    if (!cota || cota.status !== "vendido") continue;
    const numInt = parseInt(cota.numero || key, 10);
    const canonicalKey = !isNaN(numInt) ? formatCotaNumber(numInt, totalNumbers) : key;
    normalized[canonicalKey] = {
      ...cota,
      numero: canonicalKey,
    };
  }
  return normalized;
}

function getLocalSettings(): RaffleSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function getLocalCotas(): Record<string, Cota> {
  if (typeof window === "undefined") return INITIAL_DEMO_COTAS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_COTAS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(INITIAL_DEMO_COTAS));
      return INITIAL_DEMO_COTAS;
    }
    const parsed = JSON.parse(raw);
    const normalized = normalizeCotasMap(parsed);
    // Se havia duplicatas antigas na máquina do usuário, re-salva limpo
    if (Object.keys(normalized).length !== Object.keys(parsed).length) {
      localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return INITIAL_DEMO_COTAS;
  }
}

// -------------------------------------------------------------
// Assinatura em Tempo Real das Configurações
// -------------------------------------------------------------
export function subscribeRaffleSettings(
  callback: (settings: RaffleSettings) => void
): () => void {
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "config", "raffle_settings");
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<RaffleSettings>;
          callback({ ...DEFAULT_SETTINGS, ...data });
        } else {
          setDoc(docRef, DEFAULT_SETTINGS, { merge: true }).catch(console.error);
          callback(DEFAULT_SETTINGS);
        }
      },
      (error) => {
        console.warn("Firestore snapshot error em raffle_settings, usando fallback local:", error);
        callback(getLocalSettings());
      }
    );
    return unsubscribe;
  }

  // Fallback Local Storage
  const handleUpdate = () => {
    callback(getLocalSettings());
  };
  handleUpdate();
  if (typeof window !== "undefined") {
    window.addEventListener(LOCAL_EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(LOCAL_EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }
  return () => {};
}

// -------------------------------------------------------------
// Assinatura em Tempo Real das Cotas
// -------------------------------------------------------------
export function subscribeCotas(
  callback: (cotasMap: Record<string, Cota>) => void
): () => void {
  // Dispara busca na planilha Google em segundo plano para complementar
  fetchGoogleSheetSales().then((sheetCotas) => {
    if (Object.keys(sheetCotas).length > 0 && typeof window !== "undefined") {
      const local = getLocalCotas();
      let changed = false;
      Object.keys(sheetCotas).forEach((k) => {
        if (!local[k]) {
          local[k] = sheetCotas[k];
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(local));
        triggerLocalUpdate();
      }
    }
  }).catch(() => {});

  if (isFirebaseConfigured() && db) {
    const cotasCol = collection(db, "cotas");
    const unsubscribe = onSnapshot(
      cotasCol,
      (snapshot) => {
        const cotasMap: Record<string, Cota> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Cota;
          const numero = docSnap.id;
          cotasMap[numero] = {
            ...data,
            numero: data.numero || numero,
          };
        });
        callback(cotasMap);
      },
      (error) => {
        console.warn("Firestore snapshot error em cotas, usando fallback local:", error);
        callback(getLocalCotas());
      }
    );
    return unsubscribe;
  }

  // Fallback Local Storage
  const handleUpdate = () => {
    callback(getLocalCotas());
  };
  handleUpdate();
  if (typeof window !== "undefined") {
    window.addEventListener(LOCAL_EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(LOCAL_EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }
  return () => {};
}

// -------------------------------------------------------------
// Atualização do Limite Total de Cotas
// -------------------------------------------------------------
export async function updateTotalNumbers(newTotal: number): Promise<void> {
  if (newTotal < 1) throw new Error("O total de números deve ser maior que zero.");

  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "config", "raffle_settings");
    await setDoc(docRef, { total_numbers: newTotal }, { merge: true });
    return;
  }

  if (typeof window !== "undefined") {
    const current = getLocalSettings();
    current.total_numbers = newTotal;
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(current));
    triggerLocalUpdate();
  }
}

// -------------------------------------------------------------
// Registro / Edição de Venda de Cota (com Push para Google Sheets)
// -------------------------------------------------------------
export async function saveCotaSale(
  numero: string,
  nome_comprador: string,
  telefone: string,
  customDate?: string,
  totalNumbers: number = 1000
): Promise<void> {
  const numInt = parseInt(numero, 10);
  const canonical = !isNaN(numInt) ? formatCotaNumber(numInt, totalNumbers) : numero.trim();

  const cotaData: Cota = {
    numero: canonical,
    status: "vendido",
    nome_comprador: nome_comprador.trim(),
    telefone: telefone.trim(),
    data_compra: customDate || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 1. Salva no Firestore se configurado
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "cotas", canonical);
    await setDoc(docRef, cotaData, { merge: true });
    // Remove qualquer versão anterior sem zeros à esquerda para evitar duplicações
    if (!isNaN(numInt) && String(numInt) !== canonical) {
      deleteDoc(doc(db, "cotas", String(numInt))).catch(() => {});
    }
  }

  // 2. Salva no LocalStorage com chave estritamente canônica
  if (typeof window !== "undefined") {
    const cotas = getLocalCotas();
    // Remove chave legada sem zeros à esquerda
    if (!isNaN(numInt)) {
      delete cotas[String(numInt)];
    }
    cotas[canonical] = cotaData;
    localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(normalizeCotasMap(cotas, totalNumbers)));
    triggerLocalUpdate();
  }

  // 3. Notifica a Planilha Google em segundo plano
  pushSaleToGoogleSheet({
    cota: canonical,
    nome: nome_comprador,
    telefone,
    status: "Vendido",
    action: "sale",
  }).catch((err) => console.warn("Erro ao enviar venda para planilha Google:", err));
}

// -------------------------------------------------------------
// Liberação / Cancelamento de Cota
// -------------------------------------------------------------
export async function releaseCota(numero: string, totalNumbers: number = 1000): Promise<void> {
  const numInt = parseInt(numero, 10);
  const canonical = !isNaN(numInt) ? formatCotaNumber(numInt, totalNumbers) : numero.trim();

  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "cotas", canonical);
    await deleteDoc(docRef);
    if (!isNaN(numInt) && String(numInt) !== canonical) {
      deleteDoc(doc(db, "cotas", String(numInt))).catch(() => {});
    }
  }

  if (typeof window !== "undefined") {
    const cotas = getLocalCotas();
    delete cotas[canonical];
    if (!isNaN(numInt)) {
      delete cotas[String(numInt)];
    }
    localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(normalizeCotasMap(cotas, totalNumbers)));
    triggerLocalUpdate();
  }

  pushSaleToGoogleSheet({
    cota: canonical,
    action: "release",
    status: "Disponível",
  }).catch((err) => console.warn("Erro ao atualizar cancelamento na planilha Google:", err));
}

// -------------------------------------------------------------
// Sincronização Manual com Google Sheets
// -------------------------------------------------------------
export async function syncFromGoogleSheetsNow(totalNumbers: number = 1000): Promise<number> {
  const sheetCotas = await fetchGoogleSheetSales(totalNumbers);
  const keys = Object.keys(sheetCotas);
  if (keys.length === 0) return 0;

  if (typeof window !== "undefined") {
    const local = getLocalCotas();
    let count = 0;
    keys.forEach((k) => {
      const item = sheetCotas[k];
      const numInt = parseInt(item.numero || k, 10);
      const canonical = !isNaN(numInt) ? formatCotaNumber(numInt, totalNumbers) : k;
      local[canonical] = { ...item, numero: canonical };
      if (!isNaN(numInt) && String(numInt) !== canonical) {
        delete local[String(numInt)];
      }
      count++;
    });
    localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(normalizeCotasMap(local, totalNumbers)));
    triggerLocalUpdate();
    return count;
  }
  return keys.length;
}

// -------------------------------------------------------------
// Exportação de Planilha CSV de Vendas
// -------------------------------------------------------------
export function exportSalesCSV(
  cotasMap: Record<string, Cota>,
  totalNumbers: number
): void {
  const normalized = normalizeCotasMap(cotasMap, totalNumbers);
  const soldNumbers = Object.keys(normalized)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  const headers = [
    "Número da Cota",
    "Status",
    "Nome do Comprador",
    "Telefone de Contato",
    "Data de Aquisição",
  ];

  const rows = soldNumbers.map((num) => {
    const item = normalized[num];
    const dataCompraFormatada = item.data_compra
      ? new Date(item.data_compra).toLocaleString("pt-BR")
      : "-";

    const escapeCsv = (val: string = "") => `"${val.replace(/"/g, '""')}"`;

    return [
      escapeCsv(item.numero || num),
      escapeCsv(item.status.toUpperCase()),
      escapeCsv(item.nome_comprador || "Não informado"),
      escapeCsv(item.telefone || "-"),
      escapeCsv(dataCompraFormatada),
    ].join(";");
  });

  const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dataHoje = new Date().toISOString().slice(0, 10);
  link.setAttribute("href", url);
  link.setAttribute("download", `vendas_rifa_med_maju_${dataHoje}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
