export type DiaCalendario = {
  dia: number;
  mesAtual: boolean;
  vazio?: boolean;
};

export const Semana = {
  segunda: "seg",
  terca: "ter",
  quarta: "qua",
  quinta: "qui",
  sexta: "sex",
  sabado: "sab",
  domingo: "dom",
} as const;

export type StatusType = keyof typeof Semana;

export function obterDiasDoMesPorSemana(
  ano: number,
  mes: number,
): Record<StatusType, DiaCalendario[]> {
  const diasPorSemana: Record<StatusType, DiaCalendario[]> = {
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
    domingo: [],
  };

  const primeiroDiaMes = new Date(ano, mes, 1);
  const ultimoDiaMes = new Date(ano, mes + 1, 0);

  const diaSemanaPrimeiro = primeiroDiaMes.getDay();
  const diffInicio = diaSemanaPrimeiro === 0 ? 6 : diaSemanaPrimeiro - 1;

  const dataInicio = new Date(primeiroDiaMes);
  dataInicio.setDate(primeiroDiaMes.getDate() - diffInicio);

  const diaSemanaUltimo = ultimoDiaMes.getDay();
  const diffFim = diaSemanaUltimo === 0 ? 0 : 7 - diaSemanaUltimo;

  const dataFim = new Date(ultimoDiaMes);
  dataFim.setDate(ultimoDiaMes.getDate() + diffFim);

  for (let d = new Date(dataInicio); d <= dataFim; d.setDate(d.getDate() + 1)) {
    const diaSemana = d.getDay();
    const diaDoMes = d.getDate();
    const mesAtual = d.getMonth() === mes && d.getFullYear() === ano;

    const item: DiaCalendario = { dia: diaDoMes, mesAtual };

    switch (diaSemana) {
      case 1:
        diasPorSemana.segunda.push(item);
        break;
      case 2:
        diasPorSemana.terca.push(item);
        break;
      case 3:
        diasPorSemana.quarta.push(item);
        break;
      case 4:
        diasPorSemana.quinta.push(item);
        break;
      case 5:
        diasPorSemana.sexta.push(item);
        break;
      case 6:
        diasPorSemana.sabado.push(item);
        break;
      case 0:
        diasPorSemana.domingo.push(item);
        break;
    }
  }

  const tamanhoMaximo = Math.max(
    6,
    ...Object.values(diasPorSemana).map((arr) => arr.length),
  );

  Object.keys(diasPorSemana).forEach((key) => {
    const coluna = diasPorSemana[key as StatusType];
    while (coluna.length < tamanhoMaximo) {
      coluna.push({ dia: 0, mesAtual: false, vazio: true });
    }
  });

  return diasPorSemana;
}
