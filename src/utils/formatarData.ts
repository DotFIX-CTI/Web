export function formatarData(dataObj: string) {
  const data = new Date(dataObj);
  const dataFormatada = data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return dataFormatada;
}

export function formatarHora(dataObj: string) {
  const data = new Date(dataObj);
  const horaFormatada = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return horaFormatada;
}

export function formatarDataEHora(dataObj: string) {
  const data = new Date(dataObj);
  const dataFormatada = data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dataFormatada;
}
