import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") || "";

  const supportedLangs = ["ko", "en", "zh"];
  const preferredLang = acceptLang.split(",")[0].split("-")[0];
  const locale = supportedLangs.includes(preferredLang) ? preferredLang : "ko";

  redirect(`/${locale}`);
}
