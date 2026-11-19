"use client";

import Main from "@/utils/main";
import Button from "@/components/button";
import CardMapa from "@/components/cards/cardMapa";
import CardEquipe from "@/components/cards/cardEquipe";
import { useParams } from "next/navigation";
import { useEquipe } from "@/hooks/useEquipe";
import { useAgendamento } from "@/hooks/useAgendamento";
import { formatarDataEHora } from "@/utils/formatarData";
import { obterDadosAgendamento } from "@/utils/agendamento";

export default function DetalheAgendamento() {
  const params = useParams<{ id: string }>();

  // 1. Busca os dados do agendamento pelo ID da rota (/detalheAgendamento/[id])
  const {
    agendamento,
    carregando: carregandoAg,
    erro,
  } = useAgendamento(Number(params.id));

  const dadosAgendamento = agendamento
    ? obterDadosAgendamento(agendamento)
    : null;

  // 2. Busca os dados da equipe vinculada assim que o agendamento carregar
  const { equipe, carregando: carregandoEq } = useEquipe(
    dadosAgendamento?.equipeId,
  );

  if (carregandoAg) {
    return (
      <Main>
        <h1>Carregando detalhes do agendamento...</h1>
      </Main>
    );
  }

  if (erro || !agendamento || !dadosAgendamento) {
    return (
      <Main>
        <h1>{erro ?? "Agendamento não encontrado."}</h1>
      </Main>
    );
  }

  const dataFormatada = dadosAgendamento.dataAgendamento
    ? formatarDataEHora(dadosAgendamento.dataAgendamento)
    : "";

  return (
    <Main>
      <section className="grid3 gap-12 max_width max_height">
        <div className="flex_c gap-8">
          <article
            className={`card between gap-4 h-[100%] ${dadosAgendamento.classeStatus}`}
          >
            <div className="flex_c gap-4">
              <div className="flex_c">
                <h1 className="upper">{agendamento.nomeServico}</h1>
                {dataFormatada && <h4>{dataFormatada}</h4>}
              </div>
              <p>
                {agendamento.descricao ||
                  "Nenhuma descrição informada para este serviço."}
              </p>
            </div>

            <div className="flex between">
              <Button
                icon="reschudule"
                link={`/agendamento?id=${agendamento.agendamentoID}&modo=reagendar`}
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
