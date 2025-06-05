import React from "react";
import { MoverDetail } from "@/src/components/mover/MoverDetail";

interface MoverDetailPageProps {
  params: {
    id: string;
  };
}

const MoverDetailPage = ({ params }: MoverDetailPageProps) => {
  const { id } = params;

  return <MoverDetail moverId={id} />;
};

export default MoverDetailPage;
