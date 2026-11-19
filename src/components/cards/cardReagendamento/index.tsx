import { Status, mapaStatus } from "@/utils/status";
import Icon from "@/utils/icon";
import { Agendamento } from "@/api/agendamento";
import { obterDadosAgendamento } from "@/utils/agendamento";

interface CardReagendamentoProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
  ativo?: boolean;
  onClick?: () => void;
}

export default function CardReagendamento({
  agendamento,
  nomeEquipe,
  ativo,
  onClick,
}: CardReagendamentoProps) {
  obterDadosAgendamento(agendamento, nomeEquipe);

  const classeStatus = agendamento
    ? mapaStatus[agendamento.statusAgendamentoID] || Status.cancelado
    : Status.cancelado;

  const titulo = agendamento?.nomeServico || "Link dedicado 10gbps";
  const equipe =
    nomeEquipe ||
    (agendamento ? `Equipe #${agendamento.equipeID}` : "Equipe de Redes");
  const endereco = agendamento
    ? `${agendamento.logradouro}, ${agendamento.numero} - ${agendamento.bairro}, ${agendamento.cidade} - ${agendamento.estado}`
    : "R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690";

  return (
    <article
      onClick={onClick}
      className={`card gap-4 ${classeStatus} ${
        onClick ? "cursor-pointer hover:opacity-90 transition-all" : ""
      } ${ativo ? "ring-2 ring-[var(--primary)] shadow-md" : ""}`}
    >
      <div className="flex_c">
        <h3 className="upper">{titulo}</h3>
        <h5>{equipe}</h5>
      </div>
      <div className="center gap-1 smooth_info">
        <Icon name="local" size={24} />
        <p>{endereco}</p>
      </div>
    </article>
  );
}
