import { Agendamento } from "@/api/agendamento";
import {
  resolverStatusAgendamento,
  StatusClasse,
} from "@/hooks/useDadosAgendamentos";

export interface DadosFormatadosAgendamento {
  classeStatus: StatusClasse;
  nomeStatus: string;
  enderecoCompleto: string;
  equipeId?: number;
  equipeExibida: string;
  dataAgendamento: string;
  dataFormatada: string;
  horaFormatada: string;
}

function parseDataLocal(dataObj: string): Date {
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

export function formatarDataAgendamento(dataObj: string): string {
  const data = parseDataLocal(dataObj);
  if (Number.isNaN(data.getTime())) return "";

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatarHoraAgendamento(dataObj: string): string {
  const data = parseDataLocal(dataObj);
  if (Number.isNaN(data.getTime())) return "";

  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function obterDadosAgendamento(
  agendamento: Agendamento,
  nomeEquipe?: string,
  mapaEquipes?: Record<number, string>,
): DadosFormatadosAgendamento {
  const classeStatus = resolverStatusAgendamento(agendamento);
  const nomeStatus = agendamento.statusAgendamento?.nomeStatus ?? "";

  const enderecoCompleto = `${agendamento.logradouro}, ${agendamento.numero} - ${agendamento.bairro}, ${agendamento.cidade} - ${agendamento.estado}${
    agendamento.cep ? `, ${agendamento.cep}` : ""
  }`;

  const equipeDoArray = agendamento.equipe?.[0];
  const equipeId = equipeDoArray?.equipeID;

  const equipeExibida =
    nomeEquipe ||
    equipeDoArray?.nomeEquipe ||
    (equipeId && mapaEquipes?.[equipeId]) ||
    (equipeId ? `Equipe #${equipeId}` : "Sem equipe");

  const dataAgendamento = agendamento.dataAgendamento || "";
  const dataFormatada = formatarDataAgendamento(dataAgendamento);
  const horaFormatada = formatarHoraAgendamento(dataAgendamento);

  return {
    classeStatus,
    nomeStatus,
    enderecoCompleto,
    equipeId,
    equipeExibida,
    dataAgendamento,
    dataFormatada,
    horaFormatada,
  };
}
