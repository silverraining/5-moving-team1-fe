import * as React from "react";
import { Providers } from "../components/shared/providers/Providers";
import { CustomLayout } from "../components/shared/components/CustomLayout";

export const metadata = {
  title: "Moving",
  icons: {
    icon: "/Images/favicon.svg",
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
          <CustomLayout>{children}</CustomLayout>
        </Providers>
      </body>
    </html>
  );
}
