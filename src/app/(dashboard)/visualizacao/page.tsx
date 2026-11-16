"use client";

import { useMemo } from "react";
import Main from "@/utils/main";
import style from "./visualizacao.module.css";
import Card from "@/components/card";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useEquipes } from "@/hooks/useEquipes";
import { Agendamento } from "@/api/agendamento";

// Função auxiliar para formatar "2026-11-17T09:00:00" -> "17/11/2026"
function formatarData(dataISO: string): string {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

export default function Visualizacao() {
  const { agendamentos, carregando, erro } = useAgendamentos();
  const { equipes } = useEquipes();

  // 1. Cria um mapa rápido { [equipeID]: nomeDaEquipe } para não usar .find() dentro de dois loops
  const mapaEquipes = useMemo(() => {
    const mapa: Record<number, string> = {};
    equipes.forEach((eq) => {
      mapa[eq.equipeID] = eq.nomeEquipe;
    });
    return mapa;
  }, [equipes]);

  // 2. Ordena por data e agrupa em: { "16/11/2026": [Agendamento], "17/11/2026": [Agendamento, Agendamento] }
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

  // Converte o objeto agrupado em array de [data, listaDeCards] para fazer o .map
  const secoes = Object.entries(agendamentosPorData);

  if (carregando) {
    return (
      <Main>
        <h1>Carregando agendamentos...</h1>
      </Main>
    );
  }

  if (erro) {
    return (
      <Main>
        <p>{erro}</p>
      </Main>
    );
  }

  if (secoes.length === 0) {
    return (
      <Main>
        <p>Nenhum agendamento encontrado.</p>
      </Main>
    );
  }

  return (
    <Main>
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
