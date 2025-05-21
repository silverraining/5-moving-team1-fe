import * as React from "react";

import { Providers } from "@/shared/providers/Providers";
import { LayOut } from "@/shared/components/LayOut";

export const metadata = {
  title: "Moving",
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Pretendard Variable CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body>
        <Providers>
          <LayOut>{children}</LayOut>
        </Providers>
      </body>
    </html>
  );
}
