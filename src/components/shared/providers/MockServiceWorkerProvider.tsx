"use client";

import { worker } from "@/src/mock/browser";
import { useEffect } from "react";

const MockServiceWorkerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      worker?.start();
    }
  }, []);

  return <>{children}</>;
};

export default MockServiceWorkerProvider;
