import CardData from "../cardData";
import style from "./card.module.css";
import Link from "next/link";
import Button from "../../button";
import { Agendamento } from "@/api/agendamento";
import { obterDadosAgendamento } from "@/utils/agendamento";

interface CardProximoAgendamentoProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function CardProximoAgendamento({
  agendamento,
  nomeEquipe,
}: CardProximoAgendamentoProps) {
  obterDadosAgendamento(agendamento, nomeEquipe);
  const temEmail = Boolean(agendamento.emailCliente);
  const temTelefone = Boolean(agendamento.telefoneCliente);

  const telefoneLimpo = agendamento.telefoneCliente?.replace(/\D/g, "");

  return (
    <article className={`center between gap-2 ${style.info}`}>
      <Link
        href={`/detalheAgendamento/${agendamento.agendamentoID}`}
        className={`grid3 gap-4 items-center`}
      >
        <CardData agendamento={agendamento} nomeEquipe={nomeEquipe} />

        <div className="flex_c">
          <h4>{agendamento.nomeCliente}</h4>
          <p>{agendamento.emailCliente || agendamento.nomeServico}</p>
        </div>
      </Link>

      {(temEmail || temTelefone) && (
        <div className={`flex_c ${style.contatos} gap-2`}>
          {temEmail && (
            <Button
              icon="mail"
              noText
              link={`mailto:${agendamento.emailCliente}`}
            />
          )}
          {temTelefone && (
            <Button
              icon="whatsapp"
              noText
              target="_blank"
              link={`https://wa.me/55${telefoneLimpo}?text=Olá, ${agendamento.nomeCliente}! Nós da DotFIX queremos entrar em contato com você(s)`}
            />
          )}
        </div>
      )}
    </article>
  );
}
