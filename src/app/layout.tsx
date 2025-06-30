import * as React from "react";
import { Providers } from "../components/shared/providers/Providers";
import { CustomLayout } from "../components/shared/components/CustomLayout";

export const generateStaticParams = () => {
  return ["ko", "en", "zh"].map((lng) => ({ lng }));
};
export const metadata = {
  title: "Moving",
  icons: {
    icon: "/Images/favicon.svg",
  },
};
interface Props {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function RootLayout({ params, children }: Props) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
        <script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          defer
        />
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body>
        <Providers>
          <CustomLayout>{children}</CustomLayout>
        </Providers>
      </body>
    </html>
  );
}
