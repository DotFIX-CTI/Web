import { Agendamento } from "@/api/agendamento";
import { formatarData, formatarHora } from "@/utils/formatarData";
import { useDadosAgendamento } from "@/hooks/useDadosAgendamentos";

interface CardDataProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function CardData({ agendamento, nomeEquipe }: CardDataProps) {
  const { classeStatus, equipeExibida } = useDadosAgendamento(
    agendamento,
    nomeEquipe,
  );

  const hora = formatarHora(agendamento.dataAgendamento);
  const data = formatarData(agendamento.dataAgendamento);

  return (
    <article className={`card gap-2 ${classeStatus}`} style={{ width: "100%" }}>
      <div className="flex_c">
        <h4>{data}</h4>
        <p>{hora}</p>
      </div>
      <h5>{nomeEquipe || equipeExibida }</h5>
    </article>
  );
}
