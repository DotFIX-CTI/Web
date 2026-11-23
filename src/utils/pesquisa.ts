import { Agendamento } from "@/api/agendamento";

export function correspondeAoTermoBusca(
  agendamento: Agendamento,
  termo: string,
  nomesEquipesExtras: string[] = [],
): boolean {
  const query = termo.toLowerCase().trim();
  if (!query) return true;

  const camposAgendamento = [
    agendamento.nomeServico,
    agendamento.nomeCliente,
    agendamento.descricao,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const camposEquipe = [
    ...(agendamento.equipe?.map((eq) => eq.nomeEquipe) ?? []),
    ...nomesEquipesExtras,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return camposAgendamento.includes(query) || camposEquipe.includes(query);
}
