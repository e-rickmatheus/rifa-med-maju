import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Donation } from "@/types/raffle";

const LOCAL_STORAGE_DONATIONS_KEY = "rifa_med_maju_doacoes";
const LOCAL_EVENT_NAME = "rifa_local_storage_change";

function triggerLocalUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LOCAL_EVENT_NAME));
  }
}

function getLocalDonations(): Donation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DONATIONS_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function subscribeDonations(
  callback: (donations: Donation[]) => void
): () => void {
  if (isFirebaseConfigured() && db) {
    const donationsCol = collection(db, "doacoes");
    const unsubscribe = onSnapshot(
      donationsCol,
      (snapshot) => {
        const donations: Donation[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Donation;
          donations.push(data);
        });
        
        // Sort by date descending
        donations.sort((a, b) => new Date(b.data_doacao).getTime() - new Date(a.data_doacao).getTime());
        callback(donations);
      },
      (error) => {
        console.warn("Firestore snapshot error em doacoes, usando fallback local:", error);
        callback(getLocalDonations().sort((a, b) => new Date(b.data_doacao).getTime() - new Date(a.data_doacao).getTime()));
      }
    );
    return unsubscribe;
  }

  // Fallback Local Storage
  const handleUpdate = () => {
    const donations = getLocalDonations();
    donations.sort((a, b) => new Date(b.data_doacao).getTime() - new Date(a.data_doacao).getTime());
    callback(donations);
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

export async function saveDonation(
  nome_doador: string,
  valor: number,
  telefone?: string,
  mensagem?: string
): Promise<void> {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const now = new Date().toISOString();
  
  const donationData: Donation = {
    id,
    nome_doador: nome_doador.trim(),
    valor,
    telefone: telefone?.trim(),
    mensagem: mensagem?.trim(),
    data_doacao: now,
    updated_at: now,
  };

  // 1. Salva no Firestore se configurado
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "doacoes", id);
    await setDoc(docRef, donationData);
  }

  // 2. Salva no LocalStorage
  if (typeof window !== "undefined") {
    const donations = getLocalDonations();
    donations.push(donationData);
    localStorage.setItem(LOCAL_STORAGE_DONATIONS_KEY, JSON.stringify(donations));
    triggerLocalUpdate();
  }
}

export async function deleteDonation(id: string): Promise<void> {
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, "doacoes", id);
    await deleteDoc(docRef);
  }

  if (typeof window !== "undefined") {
    const donations = getLocalDonations();
    const updated = donations.filter(d => d.id !== id);
    localStorage.setItem(LOCAL_STORAGE_DONATIONS_KEY, JSON.stringify(updated));
    triggerLocalUpdate();
  }
}

export function exportDonationsCSV(donations: Donation[]): void {
  const headers = [
    "Nome do Doador",
    "Valor (R$)",
    "Telefone",
    "Mensagem",
    "Data da Doação",
  ];

  const rows = donations.map((item) => {
    const dataDoacaoFormatada = item.data_doacao
      ? new Date(item.data_doacao).toLocaleString("pt-BR")
      : "-";

    const escapeCsv = (val: string = "") => `"${val.replace(/"/g, '""')}"`;

    return [
      escapeCsv(item.nome_doador || "Não informado"),
      escapeCsv(item.valor.toString()),
      escapeCsv(item.telefone || "-"),
      escapeCsv(item.mensagem || ""),
      escapeCsv(dataDoacaoFormatada),
    ].join(";");
  });

  const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dataHoje = new Date().toISOString().slice(0, 10);
  link.setAttribute("href", url);
  link.setAttribute("download", `doacoes_vaquinha_maju_${dataHoje}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
