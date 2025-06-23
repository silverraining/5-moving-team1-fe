"use client";

import React from "react";
import { MoverDetail } from "@/src/components/mover/MoverDetail";
import { useParams } from "next/navigation";

const MoverDetailPage = () => {
  const params = useParams();
  const moverId = params.moverId as string;

  return <MoverDetail moverId={moverId} />;
};

export default MoverDetailPage;
