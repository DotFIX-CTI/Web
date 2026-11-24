"use client";

import Image from "next/image";
import Main from "@/utils/main";
import Button from "@/components/button";
import Pesquisa from "@/components/pesquisa";
import CardReagendamento from "@/components/cards/cardReagendamento";
import { useRouter } from "next/navigation";
import { useEquipes } from "@/hooks/useEquipes";
import { useState, useMemo } from "react";
import { toastSucesso, toastErro } from "@/utils/toast";
import { formatarDataEHora } from "@/utils/formatarData";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { obterDadosAgendamento } from "@/utils/agendamento";

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

  // Lista de agendamentos filtrados
  const agendamentosFiltrados = useMemo(() => {
    const termo = termoPesquisa.trim().toLowerCase();
    if (!termo) return agendamentos;

    return agendamentos.filter((a) => {
      const { equipeExibida } = obterDadosAgendamento(a);
      const nomeCliente = a.nomeCliente?.toLowerCase() || "";
      const nomeServico = a.nomeServico?.toLowerCase() || "";
      const nomeEq = equipeExibida.toLowerCase();

      return (
        nomeCliente.includes(termo) ||
        nomeServico.includes(termo) ||
        nomeEq.includes(termo)
      );
    });
  }, [agendamentos, termoPesquisa]);

  const agendamentoAtivo = useMemo(() => {
    if (selecionadoId) {
      const encontrado = agendamentos.find(
        (a) => a.agendamentoID === selecionadoId,
      );
      if (encontrado) return encontrado;
    }
    return agendamentosFiltrados[0] || agendamentos[0] || null;
  }, [selecionadoId, agendamentos, agendamentosFiltrados]);

  const dadosAtivos = useMemo(() => {
    if (!agendamentoAtivo) return null;
    return obterDadosAgendamento(agendamentoAtivo);
  }, [agendamentoAtivo]);

  const equipeAtiva = useMemo(() => {
    if (!dadosAtivos?.equipeId) return null;
    return equipes.find((e) => e.equipeID === dadosAtivos.equipeId) || null;
  }, [dadosAtivos, equipes]);

  const handleValidar = async () => {
    if (!agendamentoAtivo || !dadosAtivos) return;

    const equipeId =
      dadosAtivos.equipeId ?? agendamentoAtivo.equipe?.equipeID ?? 0;

    if (!equipeId) {
      toastErro("O agendamento não possui uma equipe válida vinculada.");
      return;
    }

    try {
      setSalvando(true);
      await atualizar(agendamentoAtivo.agendamentoID, {
        nomeCliente: agendamentoAtivo.nomeCliente,
        emailCliente: agendamentoAtivo.emailCliente ?? "",
        telefoneCliente: agendamentoAtivo.telefoneCliente ?? "",
        nomeServico: agendamentoAtivo.nomeServico,
        descricao: agendamentoAtivo.descricao,
        cep: agendamentoAtivo.cep ?? "",
        logradouro: agendamentoAtivo.logradouro,
        bairro: agendamentoAtivo.bairro,
        cidade: agendamentoAtivo.cidade,
        estado: agendamentoAtivo.estado,
        complemento: agendamentoAtivo.complemento,
        numero: agendamentoAtivo.numero,
        dataAgendamento:
          dadosAtivos.dataAgendamento || agendamentoAtivo.dataAgendamento,
        equipeID: equipeId,
        statusAgendamentoID: 1,
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

  const mapaStatus: Record<number, string> = {
    1: "confirmado",
    2: "pendente",
    3: "cancelado",
  };

  const classeStatus = agendamentoAtivo
    ? mapaStatus[Number(agendamentoAtivo.statusAgendamento)] || "cancelado"
    : "cancelado";

  return (
    <Main>
      <section className="grid gap-12 max_width max_height">
        {agendamentoAtivo && dadosAtivos ? (
          <article className={`card between gap-6 ${classeStatus}`}>
            <div className="flex_c gap-1">
              <h1 className="upper">{agendamentoAtivo.nomeServico}</h1>
              {dadosAtivos.dataAgendamento && (
                <h4>{formatarDataEHora(dadosAtivos.dataAgendamento)}</h4>
              )}
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
              <h3>{equipeAtiva?.nomeEquipe || dadosAtivos.equipeExibida}</h3>
              <div className="flex_c gap-4">
                {equipeAtiva?.funcionarios &&
                equipeAtiva.funcionarios.length > 0 ? (
                  equipeAtiva.funcionarios.map((funcionario) => (
                    <div key={funcionario.funcionarioID} className="flex gap-2">
                      <Image
                        src={funcionario.foto || "/img/user.png"}
                        width={40}
                        height={40}
                        alt={`Foto de ${funcionario.nome}`}
                        className="user"
                      />
                      <div>
                        <h5>{funcionario.nome}</h5>
                        <p>{funcionario.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2">
                    <Image
                      src="/img/user.png"
                      width={40}
                      height={40}
                      alt="Foto de funcionário"
                      className="user"
                    />
                    <div>
                      <h5>Funcionários não vinculados</h5>
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
              agendamentosFiltrados.map((item) => {
                const { equipeExibida } = obterDadosAgendamento(item);

                return (
                  <CardReagendamento
                    key={item.agendamentoID}
                    agendamento={item}
                    nomeEquipe={equipeExibida}
                    ativo={
                      agendamentoAtivo?.agendamentoID === item.agendamentoID
                    }
                    onClick={() => setSelecionadoId(item.agendamentoID)}
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
