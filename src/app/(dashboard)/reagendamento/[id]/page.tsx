import ReagendamentoContent from "../reagendamentoContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReagendamentoIdPage({ params }: PageProps) {
  const resolvedParams = await params;
  const idNumber = resolvedParams?.id ? Number(resolvedParams.id) : undefined;

  return <ReagendamentoContent idInicial={idNumber} />;
}
