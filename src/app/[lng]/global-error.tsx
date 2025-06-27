"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { source: "global-error" },
      extra: {
        digest: (error as any).digest,
        message: error.message,
        stack: error.stack,
        pathname: window.location.pathname, // 현재 페이지 경로
      },
    });
  }, [error]);

  return (
    <html>
      <body />
    </html>
  );
}
