import PendingDetailWrapper from "@/src/components/customer/estimate/PendingDetailWrapper";

export const dynamic = "force-dynamic";

export default async function PendingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PendingDetailWrapper requestId={id} />;
}
