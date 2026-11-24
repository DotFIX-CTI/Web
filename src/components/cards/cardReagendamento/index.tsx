import Icon from "@/utils/icon";
import { Agendamento } from "@/api/agendamento";
import {
  resolverStatusAgendamento,
  useDadosAgendamento,
} from "@/hooks/useDadosAgendamentos";

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
  const dadosFormatados = useDadosAgendamento(agendamento, nomeEquipe);
  const classeStatus = resolverStatusAgendamento(agendamento);

  const titulo = agendamento?.nomeServico || "Link dedicado 10gbps";
  const equipe =
    nomeEquipe || dadosFormatados?.equipeExibida || "Equipe de Redes";
  const endereco =
    dadosFormatados?.enderecoCompleto ||
    "R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690";

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
