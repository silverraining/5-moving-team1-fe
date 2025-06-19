import React from "react";
import HistoryDetail from "@/src/components/customer/estimate/HistoryDetail";

export default function HistoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ moverId?: string }>;
}) {
  const { id } = React.use(params);
  const { moverId } = React.use(searchParams);

  if (!moverId) return <div>잘못된 접근입니다. moverId가 없습니다.</div>;

  return <HistoryDetail requestId={id} moverId={moverId} />;
}
