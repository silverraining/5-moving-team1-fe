import React from "react";
import PendingDetail from "@/src/components/customer/estimate/PendingDetail";

export default function PendingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ moverId?: string }>;
}) {
  const { id } = React.use(params);
  const { moverId } = React.use(searchParams);

  if (!moverId) return <div>잘못된 접근입니다. moverId가 없습니다.</div>;

  return <PendingDetail requestId={id} moverId={moverId} />;
}
