import { Agendamento } from "@/api/agendamento";
import {
  resolverStatusAgendamento,
  StatusClasse,
} from "@/hooks/useDadosAgendamentos";
import { formatarData, formatarHora } from "@/utils/formatarData";

export interface DadosFormatadosAgendamento {
  classeStatus: StatusClasse;
  nomeStatus: string;
  enderecoCompleto: string;
  equipeId: number;
  equipeExibida: string;
  dataAgendamento: string;
  dataFormatada: string;
  horaFormatada: string;
}

export function obterDadosAgendamento(
  agendamento: Agendamento,
): DadosFormatadosAgendamento {
  const classeStatus = resolverStatusAgendamento(agendamento);
  const nomeStatus = agendamento.statusAgendamento?.nomeStatus ?? "";

  const enderecoCompleto = `${agendamento.logradouro}, ${agendamento.numero} - ${agendamento.bairro}, ${agendamento.cidade} - ${agendamento.estado}${
    agendamento.cep ? `, ${agendamento.cep}` : ""
  }`;

  const equipeId = agendamento.equipe?.equipeID ?? 0;

  const equipeExibida = agendamento.equipe?.nomeEquipe || `Equipe #${equipeId}`;

  const dataAgendamento = agendamento.dataAgendamento || "";
  const dataFormatada = formatarData(dataAgendamento);
  const horaFormatada = formatarHora(dataAgendamento);

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
