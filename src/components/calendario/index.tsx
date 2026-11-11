"use client";

import { useState } from "react";
import style from "./calendario.module.css";
import {
  obterDiasDoMesPorSemana,
  Semana,
  StatusType,
} from "@/utils/calendario";
import Icon from "@/utils/icon";

interface CalendarioProps {
  compact?: boolean;
}

export default function Calendario({ compact = false }: CalendarioProps) {
  const [dataAtual, setDataAtual] = useState(new Date(2026, 10, 1));

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const diasDoMes = obterDiasDoMesPorSemana(ano, mes);

  const nomeMesBruto = dataAtual.toLocaleDateString("pt-BR", { month: "long" });
  const nomeMes = nomeMesBruto.charAt(0).toUpperCase() + nomeMesBruto.slice(1);

  const avancarMes = () => {
    setDataAtual(new Date(ano, mes + 1, 1));
  };

  const voltarMes = () => {
    setDataAtual(new Date(ano, mes - 1, 1));
  };

  const tamanhoIcone = compact ? 24 : 48;

  return (
    <div className={`center_c ${compact ? `gap-4 ${style.compact}` : "gap-12"}`}>
      <div className="center between" style={{ width: "100%" }}>
        <button onClick={voltarMes} className={`${style.botao} ${style.left}`}>
          <Icon name="left" size={tamanhoIcone} />
        </button>
        <div className="flex" style={{ alignItems: "baseline" }}>
          <h1 className={compact ? style.tituloCompacto : "big_txt"}>
            {nomeMes}
          </h1>
          <h3 className="end">,{ano}</h3>
        </div>
        <button
          onClick={avancarMes}
          className={`${style.botao} ${style.right}`}
        >
          <Icon name="right" size={tamanhoIcone} />
        </button>
      </div>

      <article className={`${style.calendario}`} style={{ height: "100%" }}>
        {Object.entries(Semana).map(([rawKey, value]) => {
          const key = rawKey as StatusType;
          const diasDaColuna = diasDoMes[key] || [];

          return (
            <div className={`${style.semana}`} key={key}>
              <h2>{value.charAt(0)}</h2>{" "}
              <div className={`${style.dias}`}>
                {diasDaColuna.map((item, cardIndex) => (
                  <button
                    className={`${style.dia} ${item.vazio ? style.vazio : ""}`}
                    key={cardIndex}
                    disabled={item.vazio}
                  >
                    <h4
                      className={
                        !item.mesAtual && !item.vazio ? style.outroMes : ""
                      }
                    >
                      {item.vazio ? "" : item.dia}
                    </h4>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
}
