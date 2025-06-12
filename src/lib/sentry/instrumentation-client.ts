//브라우저 측 오류, 퍼포먼스, 세션 리플레이 감지
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 0,

  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart; // 선택사항: 페이지 전환 시작 시 Sentry 세션 추적
