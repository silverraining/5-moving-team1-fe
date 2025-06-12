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
  const truncate = (text: string | undefined, max = 800) =>
    text?.slice(0, max) || "No stack";

  const content = [
    "🚨 **[500 Error Alert]**",
    `**Method**: \`${method}\``,
    `**URL**: ${url}`,
    `**Message**: \`${err.message}\``,
    "**Stack:**",
    `\`\`\`${truncate(err.stack)}\`\`\``,
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
