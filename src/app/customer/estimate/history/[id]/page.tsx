import HistoryDetail from "@/src/components/customer/estimate/HistoryDetail";

export default function HistoryDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { moverId?: string };
}) {
  const { id } = params;
  const { moverId } = searchParams;

  if (!moverId) return <div>잘못된 접근입니다. moverId가 없습니다.</div>;

  return <HistoryDetail requestId={id} moverId={moverId} />;
}
