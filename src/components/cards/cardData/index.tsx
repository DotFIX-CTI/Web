import { Agendamento } from "@/api/agendamento";
import { obterDadosAgendamento } from "@/utils/agendamento";
import { formatarData, formatarHora } from "@/utils/formatarData";
import { mapaStatus, Status } from "@/utils/status";

interface CardDataProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function CardData({ agendamento, nomeEquipe }: CardDataProps) {
  obterDadosAgendamento(agendamento, nomeEquipe);

  const classeStatus =
    mapaStatus[agendamento.statusAgendamentoID] || Status.cancelado;

  const hora = formatarHora(agendamento.dataAgendamento);
  const data = formatarData(agendamento.dataAgendamento);

  return (
    <article className={`card gap-2 ${classeStatus}`} style={{ width: "100%" }}>
      <div className="flex_c">
        <h4>{data}</h4>
        <p>{hora}</p>
      </div>
      <h5>{nomeEquipe || `Equipe #${agendamento.equipeID}`}</h5>
    </article>
  );
}
