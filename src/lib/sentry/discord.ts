export async function sendDiscordAlert({
  url,
  method,
  error,
}: {
  url: string;
  method: string;
  error: unknown;
}) {
  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
  if (!DISCORD_WEBHOOK_URL) return;

  const err = error instanceof Error ? error : new Error(String(error));
  const stack = maskStackTrace(err.stack);
  const message = err.message;

  const content = [
    "🚨 **[500 Error Alert]**",
    `**Method**: \`${method}\``,
    `**URL**: ${url}`,
    `**Message**: \`${message}\``,
    "**Stack:**",
    `\`\`\`${stack}\`\`\``,
  ].join("\n");

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      console.error("❌ Discord Webhook 전송 실패", res.statusText);
    } else {
      console.log("👾 Discord Webhook 전송 성공");
    }
  } catch (e) {
    console.error("❌ Discord Webhook 오류", e);
  }
}

/**
 * 스택트레이스 경로 마스킹
 */
function maskStackTrace(stack?: string): string {
  if (!stack) return "No stack";

  const normalized = stack.replace(/\\/g, "/"); // Windows 경로 슬래시 변환
  const projectRoot = process.cwd().replace(/\\/g, "/");

  return normalized
    .split("\n")
    .slice(0, 5)
    .map((line) => line.replace(projectRoot, "[app-root]"))
    .join("\n");
}
