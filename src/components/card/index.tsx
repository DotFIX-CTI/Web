import Link from "next/link";
import Icon from "@/utils/icon";
import { mapaStatus } from "@/utils/status";
import { Agendamento } from "@/api/agendamento";

interface CardAgendamentoProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function Card({
  agendamento,
  nomeEquipe,
}: CardAgendamentoProps) {
  const classeStatus = mapaStatus[agendamento.statusAgendamentoID] || "";
  const enderecoCompleto = `${agendamento.logradouro}, ${agendamento.numero} - ${agendamento.bairro}, ${agendamento.cidade} - ${agendamento.estado}${
    agendamento.cep ? `, ${agendamento.cep}` : ""
  }`;

  return (
    <Link href={`/detalheAgendamento/${agendamento.agendamentoID}`}>
      <article
        className={`card flex_c gap-8 between ${classeStatus}`}
        style={{ width: 400 }}
      >
        <h3 className="upper">{agendamento.nomeServico}</h3>

        <div className="flex_c gap-2">
          <h5>{nomeEquipe || `Equipe #${agendamento.equipeID}`}</h5>

          <div className="center gap-1 smooth_info_card">
            <Icon name="local" size={16} />
            <p>{enderecoCompleto}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
