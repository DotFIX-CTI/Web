"use client";

import Icon from "@/utils/icon";
import { Agendamento } from "@/api/agendamento";
import { Equipe } from "@/api/equipe";
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
  equipe?: Equipe;
}

function resolverClasseEquipe(equipe: Equipe): string {
  const eqAny = equipe as Equipe & {
    statusEquipeID?: number;
    nomeStatus?: string;
    statusEquipe?: { statusEquipeID?: number; nomeStatus?: string } | null;
  };

  const statusId = eqAny.statusEquipe?.statusEquipeID ?? eqAny.statusEquipeID;
  const nome = (eqAny.statusEquipe?.nomeStatus ?? eqAny.nomeStatus ?? "")
    .trim()
    .toLowerCase();

  if (statusId === 2 || nome.includes("pendente")) return "pendente";
  if (statusId === 3 || nome.includes("atrasado")) return "atrasado";
  if (statusId === 4 || nome.includes("cancel") || nome.includes("inativ")) {
    return "cancelado";
  }
  return "default";
}

export default function CardMapa({ agendamento, equipe }: CardMapaProps) {
  const classeStatus = agendamento
    ? resolverStatusAgendamento(agendamento)
    : equipe
      ? resolverClasseEquipe(equipe)
      : "cancelado";

  const tituloLocal = agendamento?.nomeServico ?? equipe?.nomeEquipe;
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
    : equipe?.enderecoAtual ||
      "R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690";

  const latBruta = agendamento?.latitude ?? equipe?.latitude;
  const lngBruta = agendamento?.longitude ?? equipe?.longitude;

  const latNum = Number(latBruta);
  const lngNum = Number(lngBruta);

  const latitude = Number.isFinite(latNum) && latNum !== 0 ? latNum : -23.68395;
  const longitude =
    Number.isFinite(lngNum) && lngNum !== 0 ? lngNum : -46.61802;

  return (
    <article className="card_mapa">
      <div
        className={`flex_c gap-2 ${classeStatus}_bg`}
        style={{ padding: "20px" }}
      >
        {tituloLocal ? (
          <div className="flex between">
            <h2>{tituloLocal}</h2>
            {cliente && (
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
            )}
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
