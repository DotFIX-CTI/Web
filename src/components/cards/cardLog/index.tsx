import Icon from "@/utils/icon";
import { Status } from "@/utils/status";
import { Agendamento } from "@/api/agendamento";
import { formatarDataEHora } from "@/utils/formatarData";

export interface CardLogProps {
  agendamento?: Agendamento;
  titulo?: string;
  tempoRelativo?: string;
  endereco?: string;
  statusClass?: string;
}

function montarEndereco(agendamento: Agendamento): string {
  const parteRua = [agendamento.logradouro, agendamento.numero]
    .filter(Boolean)
    .join(", ");
  const parteBairroCidade = [
    agendamento.bairro,
    [agendamento.cidade, agendamento.estado].filter(Boolean).join(" - "),
  ]
    .filter(Boolean)
    .join(" - ");

  return [parteRua, parteBairroCidade, agendamento.cep]
    .filter(Boolean)
    .join(", ");
}

export default function CardLog({
  agendamento,
  titulo,
  tempoRelativo,
  endereco,
  statusClass = Status.default ?? Status.cancelado,
}: CardLogProps) {
  const tituloFinal = titulo ?? agendamento?.nomeServico;

  const tempoFinal =
    tempoRelativo ??
    (agendamento?.dataAgendamento &&
      formatarDataEHora(agendamento.dataAgendamento));

  const enderecoFinal =
    endereco ?? (agendamento && montarEndereco(agendamento));

  return (
    <article className={`card gap-2 ${statusClass}`}>
      <h2>{tituloFinal}</h2>
      <div>
        <h5>{tempoFinal}</h5>
        <div className="center gap-2 smooth_info">
          <Icon name="local" size={20} />
          <p className="small_txt">{enderecoFinal}</p>
        </div>
      </div>
    </article>
  );
}
