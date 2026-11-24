import { useMemo } from "react";
import { Agendamento } from "@/api/agendamento";

const STATUS = {
  default: "default",
  pendente: "pendente",
  atrasado: "atrasado",
  cancelado: "cancelado",
} as const;

export type StatusClasse = (typeof STATUS)[keyof typeof STATUS];

const MAPA_STATUS_POR_ID: Record<number, StatusClasse> = {
  1: STATUS.default,
  2: STATUS.pendente,
  3: STATUS.atrasado,
  4: STATUS.cancelado,
};

const MAPA_STATUS_POR_NOME: Record<string, StatusClasse> = {
  concluído: STATUS.default,
  pendente: STATUS.pendente,
  atrasado: STATUS.atrasado,
  cancelado: STATUS.cancelado,
  "em andamento": STATUS.default,
};

export function resolverStatusAgendamento(
  agendamento: Pick<Agendamento, "statusAgendamento">,
): StatusClasse {
  const statusObj = agendamento.statusAgendamento;
  const nomeNormalizado = statusObj?.nomeStatus?.trim().toLowerCase() ?? "";
  const statusId = statusObj?.statusAgendamentoID;

  return (
    (statusId !== undefined ? MAPA_STATUS_POR_ID[statusId] : undefined) ??
    MAPA_STATUS_POR_NOME[nomeNormalizado] ??
    STATUS.default
  );
}

export function useDadosAgendamento(
  agendamento: Agendamento,
  nomeEquipe?: string,
) {
  return useMemo(() => {
    const nomeStatus = agendamento.statusAgendamento?.nomeStatus ?? "";
    const classeStatus = resolverStatusAgendamento(agendamento);

    const enderecoCompleto = `${agendamento.logradouro}, ${agendamento.numero} - ${agendamento.bairro}, ${agendamento.cidade}/${agendamento.estado}`;

    const equipesLista = Array.isArray(agendamento.equipe)
      ? agendamento.equipe
      : agendamento.equipe
        ? [agendamento.equipe]
        : [];

    const nomesEquipes = equipesLista
      .map((e) => e?.nomeEquipe)
      .filter((nome): nome is string => Boolean(nome?.trim()));

    const equipeExibida =
      nomeEquipe?.trim() ||
      (nomesEquipes.length > 0 ? nomesEquipes.join(", ") : "Sem equipe");

    return {
      classeStatus,
      nomeStatus,
      enderecoCompleto,
      equipeExibida,
      dataAgendamento: agendamento.dataAgendamento,
    };
  }, [agendamento, nomeEquipe]);
}