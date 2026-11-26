import { Equipe } from "@/api/equipe";

export const STATUS = {
  default: "default",
  pendente: "pendente",
  atrasado: "atrasado",
  cancelado: "cancelado",
} as const;

export type ClasseStatusEquipe = (typeof STATUS)[keyof typeof STATUS];

export const MAPA_STATUS_EQUIPE_POR_ID: Record<number, ClasseStatusEquipe> = {
  1: STATUS.default,
  2: STATUS.pendente,
  3: STATUS.atrasado,
  4: STATUS.cancelado,
};

export const MAPA_STATUS_EQUIPE_POR_NOME: Record<string, ClasseStatusEquipe> = {
  ativo: STATUS.default,
  ativa: STATUS.default,
  disponivel: STATUS.default,
  disponível: STATUS.default,
  pendente: STATUS.pendente,
  atrasado: STATUS.atrasado,
  inativo: STATUS.cancelado,
  inativa: STATUS.cancelado,
  cancelado: STATUS.cancelado,
};

export interface DadosStatusEquipe {
  statusEquipeID?: number;
  nomeStatus?: string;
  statusEquipe?: {
    statusEquipeID?: number;
    nomeStatus?: string;
  } | null;
}

export function resolverClasseStatusEquipe(
  equipe: Equipe & DadosStatusEquipe,
): ClasseStatusEquipe {
  const statusId = equipe.statusEquipe?.statusEquipeID ?? equipe.statusEquipeID;
  const nomeNormalizado = (
    equipe.statusEquipe?.nomeStatus ??
    equipe.nomeStatus ??
    ""
  )
    .trim()
    .toLowerCase();

  return (
    (statusId !== undefined
      ? MAPA_STATUS_EQUIPE_POR_ID[statusId]
      : undefined) ??
    MAPA_STATUS_EQUIPE_POR_NOME[nomeNormalizado] ??
    STATUS.default
  );
}
