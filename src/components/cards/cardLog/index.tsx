import Icon from "@/utils/icon";
import { Agendamento } from "@/api/agendamento";
import { formatarDataEHora } from "@/utils/formatarData";
import { resolverStatusAgendamento } from "@/hooks/useDadosAgendamentos";

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
  statusClass,
}: CardLogProps) {
  const tituloFinal = titulo ?? agendamento?.nomeServico;

  const tempoFinal =
    tempoRelativo ??
    (agendamento?.dataAgendamento &&
      formatarDataEHora(agendamento.dataAgendamento));

  const enderecoFinal =
    endereco ?? (agendamento && montarEndereco(agendamento));

  const classeStatusFinal =
    statusClass ??
    (agendamento ? resolverStatusAgendamento(agendamento) : "default");

  return (
    <article className={`card gap-2 ${classeStatusFinal}`}>
      <h2>{tituloFinal}</h2>
      <div className="flex_c gap-1">
        <h5>{tempoFinal}</h5>
        <div className="center gap-2 smooth_info">
          <Icon name="local" size={20} />
          <p className="small_txt">{enderecoFinal}</p>
        </div>
      </div>
    </article>
  );
}
