import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { PATH } from "./lib/constants";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["ko", "en", "zh"];
const DEFAULT_LOCALE = "ko";

// JWT 검증 함수
const getUserFromToken = async (token: string, secret: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload;
  } catch (err) {
    return null;
  }
};

// 권한 매트릭스 정의
const accessControl = [
  {
    prefix: "/customer",
    role: "CUSTOMER",
    publicPaths: [PATH.moverList, PATH.moverDetail],
  },
  {
    prefix: "/mover",
    role: "MOVER",
    publicPaths: [],
  },
];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // ✅ 1. 정적 파일, API 예외 처리
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.includes("/_next/")
  ) {
    return NextResponse.next();
  }

  // ✅ 2. locale prefix가 없는 경우 → 쿠키 또는 기본값 기준으로 리다이렉트
  const pathnameHasLocale = SUPPORTED_LOCALES.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (!pathnameHasLocale) {
    const localeFromCookie = request.cookies.get("i18next")?.value;
    const locale = SUPPORTED_LOCALES.includes(localeFromCookie || "")
      ? localeFromCookie
      : DEFAULT_LOCALE;

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // ✅ 3. 인증 토큰 검증
  let accessUser = null;
  let refreshUser = null;

  if (accessToken) {
    accessUser = await getUserFromToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    );
  }
  if (refreshToken) {
    refreshUser = await getUserFromToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );
  }

  if (!accessUser && !refreshUser) {
    request.cookies.delete("accessToken");
    request.cookies.delete("refreshToken");
  }

  const userRole = accessUser?.role;

  // ✅ 4. 로그인된 상태에서 /auth 페이지 접근 → 홈으로 리디렉트
  if (accessToken && pathname.includes("/auth")) {
    const mainUrl = new URL(`/${DEFAULT_LOCALE}${PATH.main}`, request.url);
    return NextResponse.redirect(mainUrl);
  }

  // ✅ 5. 권한 검사
  for (const rule of accessControl) {
    if (pathname.includes(rule.prefix)) {
      // public 경로는 허용
      const isPublic = rule.publicPaths
        .filter((p): p is string => typeof p === "string")
        .some((p) => pathname.startsWith(p));

      if (isPublic) return NextResponse.next();

      // 토큰 없음
      if (!userRole) {
        const loginUrl = new URL(
          `/${DEFAULT_LOCALE}${PATH.userLogin}`,
          request.url
        );
        return NextResponse.redirect(loginUrl);
      }

      // 권한 불일치
      if (userRole !== rule.role) {
        return NextResponse.redirect(
          new URL(`/${DEFAULT_LOCALE}/unauthorized`, request.url)
        );
      }
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
