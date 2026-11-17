import CardData from "../cardData";
import style from "./card.module.css";
import Link from "next/link";
import Button from "../button";
import { Agendamento } from "@/api/agendamento";

interface CardProximoAgendamentoProps {
  agendamento: Agendamento;
  nomeEquipe?: string;
}

export default function CardProximoAgendamento({
  agendamento,
  nomeEquipe,
}: CardProximoAgendamentoProps) {
  const temEmail = Boolean(agendamento.emailCliente);
  const temTelefone = Boolean(agendamento.telefoneCliente);

  // Limpa caracteres não numéricos para o link do WhatsApp (ex: "(11) 98765-4321" -> "5511987654321")
  const telefoneLimpo = agendamento.telefoneCliente?.replace(/\D/g, "");

  return (
    <article className="center between gap-2">
      <Link
        href={`/detalheAgendamento/${agendamento.agendamentoID}`}
        className={`grid3 gap-4 ${style.info}`}
      >
        <CardData agendamento={agendamento} nomeEquipe={nomeEquipe} />

        <div className="flex_c">
          <h4>{agendamento.nomeCliente}</h4>
          <p>{agendamento.emailCliente || agendamento.nomeServico}</p>
        </div>
      </Link>

      {(temEmail || temTelefone) && (
        <div
          className={`flex_c ${style.contatos} gap-2`}
        >
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
              link={`https://wa.me/55${telefoneLimpo}`}
            />
          )}
        </div>
      )}
    </article>
  );
}
