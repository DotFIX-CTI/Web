export const Props = {
  default: "default",
  pendente: "pendente",
  atrasado: "atrasado",
  cancelado: "cancelado",
} as const;

export type StatusType = keyof typeof Props;
