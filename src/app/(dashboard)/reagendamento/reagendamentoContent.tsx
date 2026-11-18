"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Main from "@/utils/main";
import { Status, mapaStatus } from "@/utils/status";
import CardReagendamento from "@/components/cardReagendamento";
import Pesquisa from "@/components/pesquisa";
import Button from "@/components/button";
import Image from "next/image";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useEquipes } from "@/hooks/useEquipes";
import { formatarDataEHora } from "@/utils/formatarData";
import { toastSucesso, toastErro } from "@/utils/toast";

interface ReagendamentoContentProps {
  idInicial?: number;
}

export default function ReagendamentoContent({
  idInicial,
}: ReagendamentoContentProps) {
  const router = useRouter();
  const { agendamentos, carregando, atualizar } = useAgendamentos();
  const { equipes } = useEquipes();

  const [selecionadoId, setSelecionadoId] = useState<number | null>(
    idInicial ?? null,
  );
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (idInicial) {
      setSelecionadoId(idInicial);
    }
  }, [idInicial]);

  const mapaEquipes = useMemo(() => {
    const mapa: Record<number, string> = {};
    equipes.forEach((eq) => {
      mapa[eq.equipeID] = eq.nomeEquipe;
    });
    return mapa;
  }, [equipes]);

  // Lista de agendamentos filtrados
  const agendamentosFiltrados = useMemo(() => {
    const termo = termoPesquisa.trim().toLowerCase();
    if (!termo) return agendamentos;

    return agendamentos.filter((a) => {
      const nomeCliente = a.nomeCliente?.toLowerCase() || "";
      const nomeServico = a.nomeServico?.toLowerCase() || "";
      const nomeEq = (mapaEquipes[a.equipeID] || "").toLowerCase();
      return (
        nomeCliente.includes(termo) ||
        nomeServico.includes(termo) ||
        nomeEq.includes(termo)
      );
    });
  }, [agendamentos, termoPesquisa, mapaEquipes]);

  const agendamentoAtivo = useMemo(() => {
    if (selecionadoId) {
      const encontrado = agendamentos.find(
        (a) => a.agendamentoID === selecionadoId,
      );
      if (encontrado) return encontrado;
    }
    return agendamentosFiltrados[0] || agendamentos[0] || null;
  }, [selecionadoId, agendamentos, agendamentosFiltrados]);

  const equipeAtiva = useMemo(() => {
    if (!agendamentoAtivo) return null;
    return equipes.find((e) => e.equipeID === agendamentoAtivo.equipeID) || null;
  }, [agendamentoAtivo, equipes]);

  const handleValidar = async () => {
    if (!agendamentoAtivo) return;
    try {
      setSalvando(true);
      await atualizar(agendamentoAtivo.agendamentoID, {
        statusAgendamentoID: 1, // Status default/confirmado
      });
      toastSucesso("Reagendamento validado com sucesso!");
      router.push("/dashboard");
    } catch {
      toastErro("Não foi possível validar o reagendamento.");
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <Main>
        <h1>Carregando reagendamentos...</h1>
      </Main>
    );
  }

  const classeStatus = agendamentoAtivo
    ? mapaStatus[agendamentoAtivo.statusAgendamentoID] || Status.cancelado
    : Status.cancelado;

  return (
    <Main>
      <section className="grid gap-12 max_width max_height">
        {agendamentoAtivo ? (
          <article className={`card between gap-6 ${classeStatus}`}>
            <div className="flex_c gap-1">
              <h1 className="upper">{agendamentoAtivo.nomeServico}</h1>
              <h4>{formatarDataEHora(agendamentoAtivo.data)}</h4>
              <p>
                {agendamentoAtivo.descricao ||
                  "Nenhuma descrição detalhada informada."}
              </p>
            </div>

            <div className="flex_c gap-1">
              <h4>Cliente & Contato</h4>
              <p>
                <strong>{agendamentoAtivo.nomeCliente}</strong>
                {agendamentoAtivo.telefoneCliente &&
                  ` • ${agendamentoAtivo.telefoneCliente}`}
                {agendamentoAtivo.emailCliente &&
                  ` • ${agendamentoAtivo.emailCliente}`}
              </p>
            </div>

            <div className="flex_c gap-4">
              <h3>
                {equipeAtiva?.nomeEquipe ||
                  mapaEquipes[agendamentoAtivo.equipeID] ||
                  "Equipe Alocada"}
              </h3>
              <div className="flex_c gap-4">
                {equipeAtiva?.membros && equipeAtiva.membros.length > 0 ? (
                  equipeAtiva.membros.map((membro) => (
                    <div key={membro.id} className="flex gap-2">
                      <Image
                        src={membro.foto || "/img/user.png"}
                        width={40}
                        height={40}
                        alt={`Foto de ${membro.nome}`}
                        className="user"
                      />
                      <div>
                        <h5>{membro.nome}</h5>
                        <p>{membro.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2">
                    <Image
                      src="/img/user.png"
                      width={40}
                      height={40}
                      alt="Foto de membro"
                      className="user"
                    />
                    <div>
                      <h5>Membros não vinculados</h5>
                      <p>Equipe em alocação</p>
                    </div>
                  </div>
                )}

                <Button
                  icon="save"
                  variant="attention"
                  onClick={handleValidar}
                  loading={salvando}
                >
                  Validar Reagendamento
                </Button>
              </div>
            </div>
          </article>
        ) : (
          <article className="card center_c gap-4">
            <h2>Nenhum agendamento selecionado</h2>
            <p>Selecione um agendamento na lista ao lado.</p>
          </article>
        )}

        <article className="card_scroll max_height">
          <Pesquisa
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Buscar por cliente, serviço ou equipe..."
          />
          <div className="flex_c scroll gap-6">
            {agendamentosFiltrados.length === 0 ? (
              <p className="p-4 text-center">Nenhum agendamento encontrado.</p>
            ) : (
              agendamentosFiltrados.map((item) => (
                <CardReagendamento
                  key={item.agendamentoID}
                  agendamento={item}
                  nomeEquipe={mapaEquipes[item.equipeID]}
                  ativo={agendamentoAtivo?.agendamentoID === item.agendamentoID}
                  onClick={() => setSelecionadoId(item.agendamentoID)}
                />
              ))
            )}
          </div>
        </article>
      </section>
    </Main>
  );
}
