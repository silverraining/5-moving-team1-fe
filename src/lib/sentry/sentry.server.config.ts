//API Routes, SSR, RSC 같은 서버 환경의 에러 및 성능 모니터링
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV || "development",
  tracesSampleRate: 0, // 퍼포먼스 추적 꺼두고 에러만 추적
  debug: false, // 디버그 모드 비활성화
});
