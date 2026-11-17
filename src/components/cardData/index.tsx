import { Agendamento } from "@/api/agendamento";
import { formatarData, formatarHora } from "@/utils/formatarData";
import { mapaStatus, Status } from "@/utils/status";

interface CardDataProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function CardData({ agendamento, nomeEquipe }: CardDataProps) {
  const classeStatus =
    mapaStatus[agendamento.statusAgendamentoID] || Status.cancelado;

  const hora = formatarHora(agendamento.data);
  const data = formatarData(agendamento.data);

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
