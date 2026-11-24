"use client";

import Main from "@/utils/main";
import Button from "@/components/button";
import Pesquisa from "@/components/pesquisa";
import Calendario from "@/components/calendario";
import CardProximoAgendamento from "@/components/cards/cardProximoAgendamento";
import { useState, useMemo } from "react";
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
  const { agendamentos = [], carregando, erro, recarregar } = useAgendamentos();
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const proximosAgendamentos = useMemo(() => {
    if (!Array.isArray(agendamentos) || agendamentos.length === 0) return [];

    const agora = new Date();
    const termo = termoPesquisa.trim().toLowerCase();

    return agendamentos
      .filter((item) => {
        if (!item) return false;

        const { dataAgendamento, equipeExibida } = obterDadosAgendamento(item);
        const dataItem = parseDataLocal(dataAgendamento);

        if (Number.isNaN(dataItem.getTime())) {
          console.warn("Agendamento com data inválida ignorado:", item);
          return false;
        }

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

        if (dataSelecionada) {
          return (
            dataItem.getFullYear() === dataSelecionada.getFullYear() &&
            dataItem.getMonth() === dataSelecionada.getMonth() &&
            dataItem.getDate() === dataSelecionada.getDate()
          );
        }

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
  }, [agendamentos, dataSelecionada, termoPesquisa]);

  const temFiltroAtivo = Boolean(dataSelecionada || termoPesquisa.trim());

  const limparFiltros = () => {
    setDataSelecionada(null);
    setTermoPesquisa("");
  };

  const renderListaAgendamentos = () => {
    if (carregando) {
      return <h5>Carregando próximos agendamentos...</h5>;
    }

    if (erro) {
      const mensagemSegura =
        typeof erro === "string" &&
        (erro.trim().startsWith("<!DOCTYPE") || erro.trim().startsWith("<html"))
          ? "Rota não encontrada ou resposta inesperada do servidor."
          : typeof erro === "string"
            ? erro
            : "Erro ao consultar a API.";

      return (
        <div className="flex_c gap-2">
          <h5>Não foi possível carregar os agendamentos.</h5>
          <p>{mensagemSegura}</p>
          <Button icon="loading" variant="secondary" onClick={recarregar}>
            Tentar novamente
          </Button>
        </div>
      );
    }

    if (proximosAgendamentos.length === 0) {
      return (
        <div className="flex_c gap-2">
          <h5>
            {termoPesquisa.trim()
              ? "Nenhum agendamento encontrado para essa pesquisa."
              : dataSelecionada
                ? "Nenhum agendamento encontrado para este dia."
                : "Nenhum agendamento futuro encontrado."}
          </h5>
          {temFiltroAtivo && (
            <Button icon="delete" variant="secondary" onClick={limparFiltros}>
              Limpar filtros
            </Button>
          )}
        </div>
      );
    }

    return proximosAgendamentos.map((item) => {
      const { equipeExibida } = obterDadosAgendamento(item);

      return (
        <CardProximoAgendamento
          key={item.agendamentoID}
          agendamento={item}
          nomeEquipe={equipeExibida}
        />
      );
    });
  };

  return (
    <Main>
      <section className="grid gap-12 max_width">
        <div className="flex_c between gap-4 self-center">
          <Calendario
            agendamentos={Array.isArray(agendamentos) ? agendamentos : []}
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
          <div className="flex_c scroll gap-4">{renderListaAgendamentos()}</div>
        </article>
      </section>
    </Main>
  );
}
