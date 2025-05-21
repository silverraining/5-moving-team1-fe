import * as React from "react";
import { Providers } from "../components/shared/providers/Providers";
import { LayOut } from "../components/shared/components/Layout";

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
