import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Cota, RaffleSettings } from "@/types/raffle";
import { formatCotaNumber } from "./utils";

export const DEFAULT_SETTINGS: RaffleSettings = {
  total_numbers: 1000,
  prize: "01 MOTO HONDA POP",
  price: 20.0,
  draw_date: "24/07/2027",
  pix_key: process.env.NEXT_PUBLIC_PIX_KEY || "37998427884",
  pix_name: process.env.NEXT_PUBLIC_PIX_NAME || "Maria Júlia Gomes Gabriel",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5537998427884",
  title: "RIFA MED MAJU",
  subtitle: "Ação Solidária em prol da faculdade de Medicina",
};

// Dados de demonstração iniciais para modo local
const INITIAL_DEMO_COTAS: Record<string, Cota> = {
  "007": {
    numero: "007",
    status: "vendido",
    nome_comprador: "Lucas Silva Oliveira",
    telefone: "37991234567",
    data_compra: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  },
  "042": {
    numero: "042",
    status: "vendido",
    nome_comprador: "Ana Beatriz Santos",
    telefone: "37998765432",
    data_compra: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  "123": {
    numero: "123",
    status: "vendido",
    nome_comprador: "Carlos Eduardo Mendes",
    telefone: "31988881234",
    data_compra: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  "451": {
    numero: "451",
    status: "vendido",
    nome_comprador: "Juliana Ferreira Lima",
    telefone: "37999112233",
    data_compra: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  "777": {
    numero: "777",
    status: "vendido",
    nome_comprador: "Roberto de Almeida Costa",
    telefone: "11977778899",
    data_compra: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
};

const LOCAL_STORAGE_SETTINGS_KEY = "rifa_med_maju_settings";
const LOCAL_STORAGE_COTAS_KEY = "rifa_med_maju_cotas";

// Evento customizado para sincronizar abas e componentes em modo local
const LOCAL_EVENT_NAME = "rifa_local_storage_change";

function triggerLocalUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LOCAL_EVENT_NAME));
  }
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
    return JSON.parse(raw);
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
          // Se ainda não existir no Firestore, inicializa com os defaults
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
// Atualização do Limite Total de Cotas (Escalabilidade)
// -------------------------------------------------------------
export async function updateTotalNumbers(newTotal: number): Promise<void> {
  if (newTotal < 1) throw new Error("O total de números deve ser maior que zero.");

  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "config", "raffle_settings");
    await setDoc(docRef, { total_numbers: newTotal }, { merge: true });
    return;
  }

  // Local fallback
  if (typeof window !== "undefined") {
    const current = getLocalSettings();
    current.total_numbers = newTotal;
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(current));
    triggerLocalUpdate();
  }
}

// -------------------------------------------------------------
// Registro / Edição de Venda de Cota
// -------------------------------------------------------------
export async function saveCotaSale(
  numero: string,
  nome_comprador: string,
  telefone: string,
  customDate?: string
): Promise<void> {
  const cotaData: Cota = {
    numero,
    status: "vendido",
    nome_comprador: nome_comprador.trim(),
    telefone: telefone.trim(),
    data_compra: customDate || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "cotas", numero);
    await setDoc(docRef, cotaData, { merge: true });
    return;
  }

  // Local fallback
  if (typeof window !== "undefined") {
    const cotas = getLocalCotas();
    cotas[numero] = cotaData;
    localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(cotas));
    triggerLocalUpdate();
  }
}

// -------------------------------------------------------------
// Liberação / Cancelamento de Cota
// -------------------------------------------------------------
export async function releaseCota(numero: string): Promise<void> {
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "cotas", numero);
    await deleteDoc(docRef);
    return;
  }

  // Local fallback
  if (typeof window !== "undefined") {
    const cotas = getLocalCotas();
    delete cotas[numero];
    localStorage.setItem(LOCAL_STORAGE_COTAS_KEY, JSON.stringify(cotas));
    triggerLocalUpdate();
  }
}

// -------------------------------------------------------------
// Exportação de Planilha CSV de Vendas
// -------------------------------------------------------------
export function exportSalesCSV(
  cotasMap: Record<string, Cota>,
  totalNumbers: number
): void {
  // Ordena todas as cotas vendidas numericamente
  const soldNumbers = Object.keys(cotasMap)
    .filter((num) => cotasMap[num]?.status === "vendido")
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  // Cabeçalho compatível com Excel brasileiro (; como separador)
  const headers = [
    "Número da Cota",
    "Status",
    "Nome do Comprador",
    "Telefone de Contato",
    "Data de Aquisição",
  ];

  const rows = soldNumbers.map((num) => {
    const item = cotasMap[num];
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

  // BOM UTF-8 para o Excel reconhecer acentos perfeitamente
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
