import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Ignorar arquivos estáticos, rotas internas do Next e APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/icon")
  ) {
    return NextResponse.next();
  }

  // Verifica se a requisição é do subdomínio app.mariajulia.med.br (ou app.localhost)
  const isAppSubdomain =
    host.startsWith("app.") ||
    host.startsWith("app-") ||
    request.nextUrl.searchParams.has("__app_subdomain");

  if (isAppSubdomain) {
    // Se está acessando a raiz do subdomínio app., reescreve internamente para /app
    if (pathname === "/" || pathname === "") {
      const url = request.nextUrl.clone();
      url.pathname = "/app";
      return NextResponse.rewrite(url);
    }

    // Se estiver em /admin, redireciona suavemente para /app
    if (pathname === "/admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/app";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware a todas as requisições, exceto estáticos
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
