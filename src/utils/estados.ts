export const Estados = {
  sp: "São Paulo",
  mg: "Minas Gerais",
  rj: "Rio de Janeiro",
  es: "Espírito Santo",
} as const;

export type StatusType = keyof typeof Estados;
