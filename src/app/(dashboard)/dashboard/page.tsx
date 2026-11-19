"use client";

import Main from "@/utils/main";
import Button from "@/components/button";
import Pesquisa from "@/components/pesquisa";
import Calendario from "@/components/calendario";
import CardProximoAgendamento from "@/components/cards/cardProximoAgendamento";
import { useState, useMemo } from "react";
import { useEquipes } from "@/hooks/useEquipes";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { obterDadosAgendamento } from "@/utils/agendamento";

function parseDataLocal(dataStr: string): Date {
  if (!dataStr) return new Date(NaN);

  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(dataStr)) {
    return new Date(dataStr);
  }

  const [dataParte, horaParte = "00:00:00"] = dataStr.split("T");
  const [ano, mes, dia] = dataParte.split("-").map(Number);
  const [hora, minuto, segundo = 0] = horaParte.split(":").map(Number);

  return new Date(
    ano,
    (mes || 1) - 1,
    dia || 1,
    hora || 0,
    minuto || 0,
    segundo || 0,
  );
}

export default function Dashboard() {
  const { agendamentos, carregando, erro } = useAgendamentos();
  const { equipes } = useEquipes();
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // Mapeia ID -> Nome da equipe para repassar ao card
  const mapaEquipes = useMemo(() => {
    const mapa: Record<number, string> = {};
    equipes.forEach((eq) => {
      mapa[eq.equipeID] = eq.nomeEquipe;
    });
    return mapa;
  }, [equipes]);

  // Filtra por data selecionada (se houver) ou exibe os próximos agendamentos futuros
  const proximosAgendamentos = useMemo(() => {
    const agora = new Date();
    const termo = termoPesquisa.trim().toLowerCase();

    return agendamentos
      .filter((item) => {
        const naoCancelado = item.statusAgendamentoID !== 4;
        if (!naoCancelado) return false;

        const { dataAgendamento, equipeExibida } = obterDadosAgendamento(
          item,
          undefined,
          mapaEquipes,
        );
        const dataItem = parseDataLocal(dataAgendamento);

        if (termo) {
          const nomeCliente = item.nomeCliente?.toLowerCase() || "";
          const nomeServico = item.nomeServico?.toLowerCase() || "";
          const nomeEq = equipeExibida.toLowerCase();
          const batePesquisa =
            nomeCliente.includes(termo) ||
            nomeServico.includes(termo) ||
            nomeEq.includes(termo);
          if (!batePesquisa) return false;
        }

        if (Number.isNaN(dataItem.getTime())) return false;

        // Se o usuário clicou em um dia no calendário, filtra exatamente aquele dia
        if (dataSelecionada) {
          return (
            dataItem.getFullYear() === dataSelecionada.getFullYear() &&
            dataItem.getMonth() === dataSelecionada.getMonth() &&
            dataItem.getDate() === dataSelecionada.getDate()
          );
        }

        // Caso contrário, mantém o comportamento padrão (agendamentos futuros)
        return dataItem >= agora;
      })
      .sort((a, b) => {
        const dataA = parseDataLocal(
          obterDadosAgendamento(a).dataAgendamento,
        ).getTime();
        const dataB = parseDataLocal(
          obterDadosAgendamento(b).dataAgendamento,
        ).getTime();
        return dataA - dataB;
      });
  }, [agendamentos, dataSelecionada, termoPesquisa, mapaEquipes]);

  return (
    <Main>
      <section className="grid gap-12 max_width">
        <div className="flex_c between gap-4 self-center">
          <Calendario
            agendamentos={agendamentos}
            onSelectDate={setDataSelecionada}
          />

          <div className="flex between">
            <Button icon="reschudule" variant="secondary" link="/reagendamento">
              Validar Reagendamentos
            </Button>
            <Button icon="add" link="/agendamento">
              Agendamento
            </Button>
          </div>
        </div>

        <article className="card_scroll gap-2 max_height">
          <div className="flex_c">
            <h2>
              {dataSelecionada
                ? `Agendamentos de ${dataSelecionada.toLocaleDateString("pt-BR")}`
                : "Próximos Agendamentos..."}
            </h2>
            <hr />
          </div>
          <Pesquisa
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Pesquisar agendamento..."
          />
          <div className="flex_c scroll gap-4">
            {carregando ? (
              <h5>Carregando próximos agendamentos...</h5>
            ) : erro ? (
              <h5>{erro}</h5>
            ) : proximosAgendamentos.length === 0 ? (
              <h5>
                {dataSelecionada
                  ? "Nenhum agendamento encontrado para este dia."
                  : "Nenhum agendamento futuro encontrado."}
              </h5>
            ) : (
              proximosAgendamentos.map((item) => {
                const { equipeExibida } = obterDadosAgendamento(
                  item,
                  undefined,
                  mapaEquipes,
                );

                return (
                  <CardProximoAgendamento
                    key={item.agendamentoID}
                    agendamento={item}
                    nomeEquipe={equipeExibida}
                  />
                );
              })
            )}
          </div>
        </article>
      </section>
    </Main>
  );
}
