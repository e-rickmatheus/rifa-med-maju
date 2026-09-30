"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PersonalAppPage from "../app/page";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona suavemente para /app caso seja acessado diretamente
    if (typeof window !== "undefined") {
      router.replace("/app");
    }
  }, [router]);

  return <PersonalAppPage />;
}
