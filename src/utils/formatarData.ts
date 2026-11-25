export function parseDataLocal(dataObj: string): Date {
  if (!dataObj) return new Date(NaN);

  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(dataObj)) {
    return new Date(dataObj);
  }

  const [dataParte, horaParte = "00:00:00"] = dataObj.split("T");
  const [ano, mes, dia] = dataParte.split("-").map(Number);
  const [hora, minuto, segundo = 0] = horaParte.split(":").map(Number);

  return new Date(
    ano,
    (mes || 1) - 1,
    dia || 1,
    hora || 0,
    minuto || 0,
    segundo || 0,
  );
}

export function formatarData(dataObj: string) {
  const data = parseDataLocal(dataObj);
  if (Number.isNaN(data.getTime())) return "";

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatarHora(dataObj: string) {
  const data = parseDataLocal(dataObj);
  if (Number.isNaN(data.getTime())) return "";

  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatarDataEHora(dataObj: string) {
  const data = parseDataLocal(dataObj);
  if (Number.isNaN(data.getTime())) return "";

  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
