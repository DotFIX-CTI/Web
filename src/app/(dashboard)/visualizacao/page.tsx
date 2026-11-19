"use client";

import { useMemo } from "react";
import Main from "@/utils/main";
import style from "./visualizacao.module.css";
import Card from "@/components/cards/card";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useEquipes } from "@/hooks/useEquipes";
import { Agendamento } from "@/api/agendamento";
import { useVisualizacao } from "@/context/visualizacaoContext";

function formatarData(dataISO: string): string {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Visualizacao() {
  const { agendamentos, carregando, erro } = useAgendamentos();
  const { equipes } = useEquipes();
  const { termoBusca, apenasHistorico } = useVisualizacao();

  const mapaEquipes = useMemo(() => {
    const mapa: Record<number, string> = {};
    equipes.forEach((eq) => {
      mapa[eq.equipeID] = eq.nomeEquipe;
    });
    return mapa;
  }, [equipes]);

  const agendamentosPorData = useMemo(() => {
    const busca = normalizarTexto(termoBusca);

    const inicioHoje = new Date();
    inicioHoje.setHours(0, 0, 0, 0);

    const filtrados = agendamentos.filter((item) => {
      const dataItem = new Date(item.data);
      const ehPassado = dataItem < inicioHoje;

      // Filtro histórico
      if (apenasHistorico ? !ehPassado : ehPassado) {
        return false;
      }

      // Filtro de pesquisa
      if (busca) {
        const nomeEquipe = mapaEquipes[item.equipeID] ?? "";
        const camposTexto = [nomeEquipe]
          .filter(Boolean)
          .map((v) => normalizarTexto(String(v)));

        const corresponde = camposTexto.some((campo) => campo.includes(busca));
        if (!corresponde) return false;
      }

      return true;
    });

    const ordenados = [...filtrados].sort(
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
  }, [agendamentos, mapaEquipes, termoBusca, apenasHistorico]);

  const secoes = Object.entries(agendamentosPorData);

  if (carregando || erro || secoes.length === 0) {
    return (
      <Main className={`${style.container}`}>
        {carregando ? (
          <h1>Carregando agendamentos...</h1>
        ) : erro ? (
          <h3>{erro}</h3>
        ) : (
          <h1>
            {termoBusca || apenasHistorico
              ? "Nenhum agendamento corresponde ao filtro."
              : "Nenhum agendamento encontrado."}
          </h1>
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
