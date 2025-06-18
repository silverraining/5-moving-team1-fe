import { NextResponse } from "next/server";
import { sendDiscordAlert } from "@/src/lib/sentry/discord";

export async function GET(request: Request) {
  try {
    throw new Error("🔥 프론트 500 에러 테스트");
  } catch (error) {
    await sendDiscordAlert({
      url: request.url,
      method: "GET",
      error,
    });

    return NextResponse.json({ message: "테스트 에러 발생" }, { status: 500 });
  }
}
