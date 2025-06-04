import React from "react";
import PendingDetail from "@/src/components/customer/estimate/PendingDetail";

export default function PendingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <PendingDetail moverId={id} />;
}
