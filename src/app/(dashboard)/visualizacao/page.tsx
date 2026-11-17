"use client";

import { useMemo } from "react";
import Main from "@/utils/main";
import style from "./visualizacao.module.css";
import Card from "@/components/card";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useEquipes } from "@/hooks/useEquipes";
import { Agendamento } from "@/api/agendamento";

function formatarData(dataISO: string): string {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

export default function Visualizacao() {
  const { agendamentos, carregando, erro } = useAgendamentos();
  const { equipes } = useEquipes();

  const mapaEquipes = useMemo(() => {
    const mapa: Record<number, string> = {};
    equipes.forEach((eq) => {
      mapa[eq.equipeID] = eq.nomeEquipe;
    });
    return mapa;
  }, [equipes]);

  const agendamentosPorData = useMemo(() => {
    const ordenados = [...agendamentos].sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
    );

    return ordenados.reduce<Record<string, Agendamento[]>>((acc, item) => {
      const dataFormatada = formatarData(item.data);

      if (!acc[dataFormatada]) {
        acc[dataFormatada] = [];
      }

      acc[dataFormatada].push(item);
      return acc;
    }, {});
  }, [agendamentos]);

  const secoes = Object.entries(agendamentosPorData);

  if (carregando || secoes.length === 0 || erro) {
    return (
      <Main className={`${style.container}`}>
        {carregando ? (
          <h1>Carregando agendamentos...</h1>
        ) : secoes.length === 0 ? (
          <h1>Nenhum agendamento encontrado.</h1>
        ) : (
          <h3>{erro}</h3>
        )}
      </Main>
    );
  }

  return (
    <Main className={`${style.container}`}>
      <section className={style.visualizacao}>
        {secoes.map(([data, listaDoDia]) => (
          <div className={style.secao} key={data}>
            <h2 className={style.data}>{data}</h2>

            <div className={style.scroll_secao}>
              {listaDoDia.map((agendamento) => (
                <Card
                  key={agendamento.agendamentoID}
                  agendamento={agendamento}
                  nomeEquipe={mapaEquipes[agendamento.equipeID]}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </Main>
  );
}
