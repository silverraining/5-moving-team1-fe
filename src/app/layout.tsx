import * as React from "react";
import { Providers } from "../components/shared/providers/Providers";
import { CustomLayout } from "../components/shared/components/CustomLayout";

export const generateStaticParams = () => {
  return ["ko", "en", "zh"].map((lng) => ({ lng }));
};
export const metadata = {
  title: "Moving",
  icons: {
    icon: "/이미지/favicon.svg",
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
      </head>
      <body>
        <Providers>
          <CustomLayout>{children}</CustomLayout>
        </Providers>
      </body>
    </html>
  );
}
