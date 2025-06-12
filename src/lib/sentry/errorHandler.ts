import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { sendDiscordAlert } from "./discord";

export function withErrorHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async function wrappedHandler(req: NextRequest) {
    try {
      return await handler(req);
    } catch (error) {
      // Sentry
      Sentry.captureException(error, {
        tags: {
          route: req.url,
          method: req.method,
        },
        extra: {
          timestamp: new Date().toISOString(),
        },
      });

      //  Discord
      await sendDiscordAlert({
        url: req.url,
        method: req.method,
        error,
      });

      return NextResponse.json(
        { statusCode: 500, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
