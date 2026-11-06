export const status = {
  default: "default",
  pendente: "pendente",
  atrasado: "atrasado",
  cancelado: "cancelado",
} as const;

if (!status) {
}

export type StatusType = keyof typeof status;
