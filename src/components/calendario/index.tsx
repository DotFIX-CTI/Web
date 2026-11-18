"use client";

import { useState, useMemo } from "react";
import style from "./calendario.module.css";
import {
  obterDiasDoMesPorSemana,
  Semana,
  StatusType,
} from "@/utils/calendario";
import Icon from "@/utils/icon";
import { Agendamento } from "@/api/agendamento";
import { mapaStatus } from "@/utils/status";

// Mapeia as classes do mapaStatus para as variáveis CSS reais do global.css
const corPorStatus: Record<string, string> = {
  default: "var(--success)",
  pendente: "var(--warning)",
  atrasado: "var(--error)",
  cancelado: "var(--cancel)",
};

interface CalendarioProps {
  compact?: boolean;
  className?: string;
  agendamentos?: Agendamento[];
  onSelectDate?: (data: Date | null) => void;
}

export default function Calendario({
  compact = false,
  className = "",
  agendamentos = [],
  onSelectDate,
}: CalendarioProps) {
  const [dataAtual, setDataAtual] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  });

  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const diasDoMes = obterDiasDoMesPorSemana(ano, mes);

  const corPorDia = useMemo(() => {
    const mapa = new Map<number, string>();

    agendamentos.forEach((ag) => {
      if (ag.statusAgendamentoID === 3) return;

      // Garante leitura correta da data mesmo se vier como "YYYY-MM-DD" sem hora
      const dataStr = String(ag.data);
      const dataAg = dataStr.includes("T")
        ? new Date(dataStr)
        : new Date(`${dataStr}T12:00:00`);

      if (dataAg.getFullYear() === ano && dataAg.getMonth() === mes) {
        const chaveStatus = mapaStatus[ag.statusAgendamentoID] || "default";
        const variavelCor = corPorStatus[chaveStatus] || "var(--primary)";
        mapa.set(dataAg.getDate(), variavelCor);
      }
    });

    return mapa;
  }, [agendamentos, ano, mes]);

  const nomeMesBruto = dataAtual.toLocaleDateString("pt-BR", { month: "long" });
  const nomeMes = nomeMesBruto.charAt(0).toUpperCase() + nomeMesBruto.slice(1);

  const avancarMes = () => {
    setDiaSelecionado(null);
    setDataAtual(new Date(ano, mes + 1, 1));
    onSelectDate?.(null);
  };

  const voltarMes = () => {
    setDiaSelecionado(null);
    setDataAtual(new Date(ano, mes - 1, 1));
    onSelectDate?.(null);
  };

  const handleCliqueDia = (dia: number) => {
    if (diaSelecionado === dia) {
      setDiaSelecionado(null);
      onSelectDate?.(null);
      return;
    }

    setDiaSelecionado(dia);
    onSelectDate?.(new Date(ano, mes, dia));
  };

  const tamanhoIcone = compact ? 24 : 48;

  return (
    <div
      className={`${className} center_c ${
        compact ? `gap-4 ${style.compact}` : "gap-12"
      }`}
    >
      <div className="center between" style={{ width: "100%" }}>
        <button onClick={voltarMes} className={`${style.botao} ${style.left}`}>
          <Icon name="left" size={tamanhoIcone} />
        </button>
        <div className="flex" style={{ alignItems: "baseline" }}>
          <h1 className={compact ? style.tituloCompacto : "big_txt"}>
            {nomeMes}
          </h1>
          <h3 className="self-end">,{ano}</h3>
        </div>
        <button
          onClick={avancarMes}
          className={`${style.botao} ${style.right}`}
        >
          <Icon name="right" size={tamanhoIcone} />
        </button>
      </div>

      <article className={style.calendario}>
        {Object.entries(Semana).map(([rawKey, value]) => {
          const key = rawKey as StatusType;
          const diasDaColuna = diasDoMes[key] || [];

          return (
            <div className={style.semana} key={key}>
              <h2>{compact ? value.charAt(0) : value}</h2>
              <div className={style.dias}>
                {diasDaColuna.map((item, cardIndex) => {
                  const corEvento =
                    !item.vazio && item.mesAtual
                      ? corPorDia.get(item.dia)
                      : undefined;

                  const estaSelecionado =
                    !item.vazio && item.mesAtual && diaSelecionado === item.dia;

                  return (
                    <button
                      className={`${style.dia} ${
                        item.vazio ? style.vazio : ""
                      } ${corEvento ? style.comAgendamento : ""} ${
                        estaSelecionado ? style.selecionado : ""
                      }`}
                      key={cardIndex}
                      disabled={item.vazio}
                      onClick={() =>
                        !item.vazio &&
                        item.mesAtual &&
                        handleCliqueDia(item.dia)
                      }
                      style={
                        corEvento && !estaSelecionado
                          ? {
                              backgroundColor: `color-mix(in srgb, ${corEvento} 20%, var(--background) 100%)`,
                            }
                          : undefined
                      }
                    >
                      <h4
                        className={
                          !item.mesAtual && !item.vazio ? style.outroMes : ""
                        }
                        style={
                          corEvento && !estaSelecionado
                            ? { color: corEvento }
                            : undefined
                        }
                      >
                        {item.vazio ? "" : item.dia}
                      </h4>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
}
