"use client";

import { useParams } from "next/navigation";
import Main from "@/utils/main";
import { mapaStatus, Status } from "@/utils/status";
import CardEquipe from "@/components/cardEquipe";
import CardMapa from "@/components/cardMapa";
import Button from "@/components/button";
import { useAgendamento } from "@/hooks/useAgendamento";
import { useEquipe } from "@/hooks/useEquipe";
import { formatarDataEHora } from "@/utils/formatarData";

export default function DetalheAgendamento() {
  const params = useParams<{ id: string }>();

  // 1. Busca os dados do agendamento pelo ID da rota (/detalheAgendamento/[id])
  const {
    agendamento,
    carregando: carregandoAg,
    erro,
  } = useAgendamento(Number(params.id));

  // 2. Busca os dados da equipe vinculada assim que o agendamento carregar
  const { equipe, carregando: carregandoEq } = useEquipe(
    agendamento ? Number(agendamento.equipeID) : undefined,
  );

  if (carregandoAg) {
    return (
      <Main>
        <h1>Carregando detalhes do agendamento...</h1>
      </Main>
    );
  }

  if (erro || !agendamento) {
    return (
      <Main>
        <h1>{erro ?? "Agendamento não encontrado."}</h1>
      </Main>
    );
  }

  const classeStatus =
    mapaStatus[agendamento.statusAgendamentoID] || Status.cancelado;

  const dataFormatada = formatarDataEHora(agendamento.data);

  return (
    <Main>
      <section className="grid3 gap-12 max_width max_height">
        <div className="flex_c gap-8">
          <article className={`card between gap-4 h-[100%] ${classeStatus}`}>
            <div className="flex_c gap-4">
              <div className="flex_c">
                <h1 className="upper">{agendamento.nomeServico}</h1>
                <h4>{dataFormatada}</h4>
              </div>
              <p>
                {agendamento.descricao ||
                  "Nenhuma descrição informada para este serviço."}
              </p>
            </div>

            <div className="flex between">
              <Button
                icon="reschudule"
                link={`/reagendamento/${agendamento.agendamentoID}`}
                variant="attention"
              >
                Reagendar
              </Button>
              <Button
                icon="edit"
                link={`/agendamento?id=${agendamento.agendamentoID}`}
                variant="secondary"
              >
                Editar
              </Button>
            </div>
          </article>
          {carregandoEq ? (
            <p>Carregando equipe...</p>
          ) : equipe ? (
            <CardEquipe equipe={equipe} />
          ) : (
            <p>Equipe não encontrada.</p>
          )}
        </div>
        <CardMapa agendamento={agendamento} />
      </section>
    </Main>
  );
}
