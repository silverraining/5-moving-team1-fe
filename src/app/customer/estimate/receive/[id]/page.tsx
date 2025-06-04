import React from "react";
import ReceiveDetail from "@/src/components/customer/estimate/ReceiveDetail";

export default function ReceiveDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <ReceiveDetail moverId={id} />;
}
