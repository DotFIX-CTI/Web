"use client";

import Main from "@/utils/main";
import Card from "@/components/cards/card";
import style from "./visualizacao.module.css";
import { useMemo } from "react";
import { useEquipes } from "@/hooks/useEquipes";
import { Agendamento } from "@/api/agendamento";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { obterDadosAgendamento } from "@/utils/agendamento";
import { useVisualizacao } from "@/context/visualizacaoContext";

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
      const { dataAgendamento, equipeExibida } = obterDadosAgendamento(
        item,
        undefined,
        mapaEquipes,
      );

      const dataItem = dataAgendamento ? new Date(dataAgendamento) : null;
      const ehPassado =
        dataItem && !Number.isNaN(dataItem.getTime())
          ? dataItem < inicioHoje
          : false;

      if (apenasHistorico ? !ehPassado : ehPassado) {
        return false;
      }

      if (busca) {
        const camposPesquisaveis = [
          equipeExibida,
          item.nomeServico,
          item.nomeCliente,
          item.descricao,
        ]
          .filter(Boolean)
          .map((valor) => normalizarTexto(String(valor)));

        const corresponde = camposPesquisaveis.some((campo) =>
          campo.includes(busca),
        );
        if (!corresponde) return false;
      }

      return true;
    });

    const ordenados = [...filtrados].sort((a, b) => {
      const dataA = obterDadosAgendamento(a).dataAgendamento;
      const dataB = obterDadosAgendamento(b).dataAgendamento;
      return new Date(dataA).getTime() - new Date(dataB).getTime();
    });

    return ordenados.reduce<Record<string, Agendamento[]>>((acc, item) => {
      const { dataFormatada } = obterDadosAgendamento(item);
      const chaveData = dataFormatada || "Sem data";

      if (!acc[chaveData]) {
        acc[chaveData] = [];
      }

      acc[chaveData].push(item);
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
              {listaDoDia.map((agendamento) => {
                const { equipeExibida } = obterDadosAgendamento(
                  agendamento,
                  undefined,
                  mapaEquipes,
                );

                return (
                  <Card
                    key={agendamento.agendamentoID}
                    agendamento={agendamento}
                    nomeEquipe={equipeExibida}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </Main>
  );
}
