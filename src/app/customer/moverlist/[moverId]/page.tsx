"use client";

import React from "react";
import { MoverDetail } from "@/src/components/mover/MoverDetail";

interface MoverDetailPageProps {
  params: {
    moverId: string;
  };
}

const MoverDetailPage = ({ params }: MoverDetailPageProps) => {
  const { moverId } = params;

  return <MoverDetail moverId={moverId} />;
};

export default MoverDetailPage;
