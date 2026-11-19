import Link from "next/link";
import Icon from "@/utils/icon";
import style from "./card.module.css";
import { Agendamento } from "@/api/agendamento";
import { obterDadosAgendamento } from "@/utils/agendamento";
import { formatarData, formatarHora } from "@/utils/formatarData";

interface CardAgendamentoProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function Card({
  agendamento,
  nomeEquipe,
}: CardAgendamentoProps) {
  const { classeStatus, enderecoCompleto, equipeExibida, dataAgendamento } =
    obterDadosAgendamento(agendamento, nomeEquipe);

  return (
    <Link href={`/detalheAgendamento/${agendamento.agendamentoID}`}>
      <article
        className={`card_small flex_c gap-2 between ${classeStatus} ${style.informacoes}`}
        style={{ width: 320 }}
      >
        <h2 className="upper">{agendamento.nomeServico}</h2>

        <div className="flex_c gap-2">
          <h5>{equipeExibida}</h5>

          {dataAgendamento && (
            <p>
              {formatarData(dataAgendamento)} às {formatarHora(dataAgendamento)}
            </p>
          )}

          <div className={`center gap-1 ${style.local}`}>
            <Icon name="local" size={16} />
            <p>{enderecoCompleto}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
