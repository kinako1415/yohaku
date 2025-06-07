import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証が不要なパス
const PUBLIC_PATHS = ["/signin", "/signup", "/api/auth"];

export function middleware(request: NextRequest) {
  // 現在のパス
  const path = request.nextUrl.pathname;

  // 公開パスの場合はそのまま進める
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // authトークンの確認
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    // 認証エラーの場合、サインインページにリダイレクト
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
