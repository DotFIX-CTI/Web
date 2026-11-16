export const Status = {
  default: "default",
  pendente: "pendente",
  atrasado: "atrasado",
  cancelado: "cancelado",
} as const;

export const mapaStatus: Record<number, string> = {
  1: Status.default,
  2: Status.pendente,
  3: Status.atrasado,
  4: Status.cancelado,
};

export type StatusType = keyof typeof Status;
