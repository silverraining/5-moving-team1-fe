import React from "react";
import ConfirmDetail from "@/src/components/mover/estimate/ConfirmDetail";

export default function ConfirmDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <ConfirmDetail moverId={id} />;
}
