export type CotaStatus = "livre" | "vendido" | "reservado";

export interface Cota {
  numero: string;
  status: CotaStatus;
  nome_comprador?: string;
  telefone?: string;
  data_compra?: string;
  updated_at?: string;
}

export interface RaffleSettings {
  total_numbers: number;
  prize: string;
  price: number;
  draw_date: string;
  pix_key: string;
  pix_name: string;
  whatsapp: string;
  title: string;
  subtitle: string;
}

export interface RaffleStats {
  total: number;
  sold: number;
  available: number;
  percent: number;
  totalRevenue: number;
}
