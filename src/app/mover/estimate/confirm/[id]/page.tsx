import ConfirmDetail from "@/src/components/mover/estimate/ConfirmDetail";

export const dynamic = "force-dynamic";

export default async function ConfirmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ConfirmDetail offerId={id} />;
}
