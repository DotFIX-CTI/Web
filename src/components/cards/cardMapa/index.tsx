"use client";

import Icon from "@/utils/icon";
import { Agendamento } from "@/api/agendamento";
import { resolverStatusAgendamento } from "@/hooks/useDadosAgendamentos";
import dynamic from "next/dynamic";

const MapaDinamico = dynamic(() => import("@/utils/mapa"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        minHeight: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Carregando mapa...
    </div>
  ),
});

interface CardMapaProps {
  agendamento?: Agendamento;
}

export default function CardMapa({ agendamento }: CardMapaProps) {
  const classeStatus = agendamento
    ? resolverStatusAgendamento(agendamento)
    : "cancelado";

  const tituloLocal = agendamento?.nomeServico;
  const cliente = agendamento?.nomeCliente;

  const enderecoCompleto = agendamento
    ? [
        agendamento.logradouro &&
          `${agendamento.logradouro}${agendamento.numero ? `, ${agendamento.numero}` : ""}`,
        agendamento.bairro,
        agendamento.cidade &&
          `${agendamento.cidade}${agendamento.estado ? ` - ${agendamento.estado}` : ""}`,
        agendamento.cep,
      ]
        .filter(Boolean)
        .join(", ")
    : "R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690";

  const latitude = Number(agendamento?.latitude) || -23.68395;
  const longitude = Number(agendamento?.longitude) || -46.61802;

  return (
    <article className="card_mapa">
      <div
        className={`flex_c gap-2 ${classeStatus}_bg`}
        style={{ padding: "20px" }}
      >
        {tituloLocal ? (
          <div className="flex between">
            <h2>{tituloLocal}</h2>
            <div className="center gap-4">
              <div className="center gap-1">
                <Icon name="user" size={24} />
                <h4>{cliente}</h4>
              </div>
              <div className="flex gap-2">
                <Icon name="mail" size={24} />
                <Icon name="whatsapp" size={24} />
              </div>
            </div>
          </div>
        ) : (
          cliente && (
            <div className="flex between">
              <div className="center gap-1">
                <Icon name="user" size={24} />
                <h4>{cliente}</h4>
              </div>
              <div className="flex gap-2">
                <Icon name="mail" size={24} />
                <Icon name="whatsapp" size={24} />
              </div>
            </div>
          )
        )}

        {cliente ? (
          <div className="center gap-1 smooth_info">
            <Icon name="local" size={20} />
            <p>{enderecoCompleto}</p>
          </div>
        ) : (
          <div className="center gap-1 smooth_info">
            <Icon name="local" size={24} />
            <h5>{enderecoCompleto}</h5>
          </div>
        )}
      </div>

      <MapaDinamico
        latitude={latitude}
        longitude={longitude}
        tituloPopup={tituloLocal}
        classeStatus={classeStatus}
      />
    </article>
  );
}
