import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { PATH } from "./lib/constants";

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

  const user = accessToken
    ? await getUserFromToken(accessToken, process.env.ACCESS_TOKEN_SECRET!)
    : null;
  const userRole = user?.role;

  for (const rule of accessControl) {
    if (pathname.startsWith(rule.prefix)) {
      // public 예외 페이지면 통과
      if (rule.publicPaths.includes(pathname)) {
        return NextResponse.next();
      }

      // 토큰 없음 → 로그인 페이지로
      if (!userRole) {
        const loginUrl = new URL(PATH.userLogin, request.url);
        return NextResponse.redirect(loginUrl);
      }

      // 권한 불일치 → unauthorized로
      if (userRole !== rule.role) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  }

  // 그 외 모든 경로는 통과
  return NextResponse.next();
};

export const config = {
  matcher: ["/:path*"],
};
