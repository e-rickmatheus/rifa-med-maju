import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatCotaNumber(index: number, total: number): string {
  const digits = total > 1000 ? 4 : 3;
  return String(index).padStart(digits, "0");
}

export function maskBuyerName(name?: string): string {
  if (!name || name.trim().length === 0) return "Participante Anônimo";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const secondInitial = parts[1].charAt(0).toUpperCase();
  return `${firstName} ${secondInitial}.`;
}

export function maskPhoneNumber(phone?: string): string {
  if (!phone) return "****-****";
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length >= 4) {
    const lastFour = digitsOnly.slice(-4);
    return `****-${lastFour}`;
  }
  return "****-****";
}

export function generateWhatsAppLink(cotaNumber: string, whatsapp: string = "5537998427884"): string {
  const cleanPhone = whatsapp.replace(/\D/g, "");
  const message = `Oi Maria Júlia, quero a cota número ${cotaNumber} da sua Ação Solidária!`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  } catch {
    return dateString;
  }
}
