"use client";

import { useState, useMemo } from "react";
import Main from "@/utils/main";
import CardProximoAgendamento from "@/components/cardProximoAgendamento";
import Calendario from "@/components/calendario";
import Button from "@/components/button";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useEquipes } from "@/hooks/useEquipes";
import Pesquisa from "@/components/pesquisa";

export default function Dashboard() {
  const { agendamentos, carregando, erro } = useAgendamentos();
  const { equipes } = useEquipes();
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);

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

    return agendamentos
      .filter((item) => {
        const dataAgendamento = new Date(item.data);
        const naoCancelado = item.statusAgendamentoID !== 3;

        if (!naoCancelado) return false;

        // Se o usuário clicou em um dia no calendário, filtra exatamente aquele dia
        if (dataSelecionada) {
          return (
            dataAgendamento.getFullYear() === dataSelecionada.getFullYear() &&
            dataAgendamento.getMonth() === dataSelecionada.getMonth() &&
            dataAgendamento.getDate() === dataSelecionada.getDate()
          );
        }

        // Caso contrário, mantém o comportamento padrão (agendamentos futuros)
        return dataAgendamento >= agora;
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }, [agendamentos, dataSelecionada]);

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
          <Pesquisa />
          <div className="flex_c scroll gap-4">
            {carregando ? (
              <p>Carregando próximos agendamentos...</p>
            ) : erro ? (
              <p>{erro}</p>
            ) : proximosAgendamentos.length === 0 ? (
              <p>
                {dataSelecionada
                  ? "Nenhum agendamento encontrado para este dia."
                  : "Nenhum agendamento futuro encontrado."}
              </p>
            ) : (
              proximosAgendamentos.map((item) => (
                <CardProximoAgendamento
                  key={item.agendamentoID}
                  agendamento={item}
                  nomeEquipe={mapaEquipes[item.equipeID]}
                />
              ))
            )}
          </div>
        </article>
      </section>
    </Main>
  );
}
