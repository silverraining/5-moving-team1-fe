import React from "react";
import ReceiveDetail from "@/src/components/customer/estimate/HistoryDetail";

export default function HistoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <ReceiveDetail customerId={id} />;
}
