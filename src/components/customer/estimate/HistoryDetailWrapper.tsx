"use client";

import { useSearchParams } from "next/navigation";
import HistoryDetail from "./HistoryDetail";

export default function HistoryDetailWrapper({
  requestId,
}: {
  requestId: string;
}) {
  const searchParams = useSearchParams();
  const moverId = searchParams.get("moverId");

  if (!moverId) return <div>잘못된 접근입니다. moverId가 없습니다.</div>;

  return <HistoryDetail requestId={requestId} moverId={moverId} />;
}
