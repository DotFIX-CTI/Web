"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Main from "@/utils/main";
import { estado } from "@/utils/estados";
import style from "./agendamento.module.css";
import Select, { Option } from "@/components/select";
import CardSugestao from "@/components/cards/cardSugestao";
import Calendario from "@/components/calendario";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import { useBuscarCep } from "@/hooks/useBuscarCep";
import { useAgendamento } from "@/hooks/useAgendamento";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useEquipes } from "@/hooks/useEquipes";
import { toastErro, toastSucesso } from "@/utils/toast";

const opcoesEstados: Option[] = Object.entries(estado).map(([sigla, nome]) => ({
  label: nome,
  value: sigla.toUpperCase(),
}));

export default function Agendamento() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idEdicao = idParam ? Number(idParam) : undefined;

  const { agendamento, carregando: carregandoAgendamento } =
    useAgendamento(idEdicao);

  const [fase, setFase] = useState(false);
  const { criar, atualizar } = useAgendamentos();
  const { equipes } = useEquipes();

  // Estados controlados dos campos do formulário
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [descricao, setDescricao] = useState("");
  const [equipeIdSelecionada, setEquipeIdSelecionada] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState<string>("");

  const {
    cep,
    endereco,
    erroCep,
    buscarCep,
    handleCepChange,
    handleEnderecoChange,
  } = useBuscarCep();

  const opcoesEquipes: Option[] = useMemo(
    () =>
      equipes.map((eq) => ({
        label: eq.nomeEquipe,
        value: String(eq.equipeID),
      })),
    [equipes],
  );

  const equipeAtual = useMemo(
    () => equipes.find((eq) => String(eq.equipeID) === equipeIdSelecionada),
    [equipes, equipeIdSelecionada],
  );

  useEffect(() => {
    if (!agendamento) return;

    setNomeCliente(agendamento.nomeCliente || "");
    setEmailCliente(agendamento.emailCliente || "");
    setTelefoneCliente(agendamento.telefoneCliente || "");
    setNomeServico(agendamento.nomeServico || "");
    setDescricao(agendamento.descricao || "");
    setEquipeIdSelecionada(String(agendamento.equipeID || ""));
    setDataSelecionada(agendamento.data || "");

    if (agendamento.cep) {
      handleCepChange({ target: { value: agendamento.cep } } as any);
    }
    handleEnderecoChange("estado", agendamento.estado || "");
    handleEnderecoChange("rua", agendamento.logradouro || "");
    handleEnderecoChange("bairro", agendamento.bairro || "");
    handleEnderecoChange("cidade", agendamento.cidade || "");
    handleEnderecoChange("complemento", agendamento.complemento || "");
    handleEnderecoChange("numero", agendamento.numero || "");
  }, [agendamento]);

  const alternarFase = () => {
    setFase((faseAnterior) => {
      const novaFase = !faseAnterior;
      if (typeof window !== "undefined") {
        setTimeout(() => {
          if (novaFase) {
            const el = document.getElementById("etapa3");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            const el = document.getElementById("etapa1");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 80);
      }
      return novaFase;
    });
  };

  const handleSalvar = async () => {
    const payload: Parameters<typeof criar>[0] = {
      nomeCliente,
      emailCliente,
      telefoneCliente,
      nomeServico,
      descricao,
      cep,
      logradouro: endereco.rua,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      complemento: endereco.complemento,
      numero: endereco.numero,
      data: dataSelecionada || new Date().toISOString(),
      latitude: agendamento?.latitude || "0",
      longitude: agendamento?.longitude || "0",
      equipeID: Number(equipeIdSelecionada),
      statusAgendamentoID: agendamento?.statusAgendamentoID || 1,
    };

    try {
      if (idEdicao) {
        await atualizar(idEdicao, payload);
        router.push(`/detalheAgendamento/${idEdicao}`);
      } else {
        const novo = await criar(payload);
        router.push(`/detalheAgendamento/${novo.agendamentoID}`);
      }
      toastSucesso(`Agendamento ${idEdicao ? "editado" : "salvo"} com sucesso`);
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      toastErro("Não foi possível salvar agendamento");
    }
  };

  if (idEdicao && carregandoAgendamento) {
    return (
      <Main>
        <h1>Carregando dados do agendamento...</h1>
      </Main>
    );
  }

  return (
    <Main>
      <section className={`flex ${style.containerEtapas}`}>
        <article
          id="etapa1"
          className={`card gap-8 between ${style.parte1} ${
            fase ? style.after : style.before
          } ${fase ? style.parte1MobileHidden : ""}`}
        >
          <div className="flex_c gap-4">
            <div>
              <h2>1ª Etapa - Cliente</h2>
              <hr />
            </div>
            <div className={style.grid_etapa1}>
              <Input
                label="Nome do Cliente"
                placeholder="Gustavo"
                icon="user"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
                errorMessage="Nome obrigatório"
              />
              <Input
                label="Email"
                placeholder="email@email.com"
                icon="email"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
              />
              <Input
                label="Telefone"
                placeholder="(11) 11111-1111"
                icon="whatsapp"
                value={telefoneCliente}
                onChange={(e) => setTelefoneCliente(e.target.value)}
              />
            </div>
          </div>

          <div className="flex_c gap-4">
            <div>
              <h2>2ª Etapa - Problema & Local</h2>
              <hr />
            </div>
            <div className={style.grid_etapa2}>
              <div className="flex_c gap-4">
                <Input
                  label="Nome do Serviço"
                  placeholder="Serviço de..."
                  icon="service"
                  value={nomeServico}
                  onChange={(e) => setNomeServico(e.target.value)}
                  required
                  errorMessage="Nome do Serviço obrigatório"
                />
                <Input
                  label="Descrição"
                  placeholder="Descrição do problema..."
                  textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              <div className="flex_c gap-4">
                <div className={style.grid_etapa2_1}>
                  <Input
                    label="CEP"
                    placeholder="11111-111"
                    icon="local"
                    maxLength={9}
                    value={cep}
                    onChange={handleCepChange}
                    onBlur={() => buscarCep(cep)}
                    error={!!erroCep}
                    errorMessage={erroCep}
                  />
                  <div className={style.estadoWrapper}>
                    <div className={style.uf}>
                      <p>{endereco.estado || "--"}</p>
                    </div>
                    <Select
                      label="Estado"
                      placeholder="Selecione o estado"
                      options={opcoesEstados}
                      value={endereco.estado}
                      onChange={(valor: string) =>
                        handleEnderecoChange("estado", valor)
                      }
                      required
                      errorMessage="Estado obrigatório"
                    />
                  </div>
                </div>

                <Input
                  label="Rua / Logradouro"
                  placeholder="Rua..."
                  icon="street"
                  value={endereco.rua}
                  onChange={(e) => handleEnderecoChange("rua", e.target.value)}
                  required
                  errorMessage="Rua obrigatório"
                />

                <div className={style.grid_etapa2_1}>
                  <Input
                    label="Bairro"
                    placeholder="Bairro..."
                    icon="map"
                    value={endereco.bairro}
                    onChange={(e) =>
                      handleEnderecoChange("bairro", e.target.value)
                    }
                    required
                    errorMessage="Bairro obrigatório"
                  />
                  <Input
                    label="Cidade"
                    placeholder="Cidade..."
                    icon="city"
                    value={endereco.cidade}
                    onChange={(e) =>
                      handleEnderecoChange("cidade", e.target.value)
                    }
                    required
                    errorMessage="Cidade obrigatório"
                  />
                </div>

                <div className={style.grid_etapa2_2}>
                  <Input
                    label="Complemento"
                    placeholder="Complemento..."
                    icon="complement"
                    value={endereco.complemento}
                    onChange={(e) =>
                      handleEnderecoChange("complemento", e.target.value)
                    }
                    required
                    errorMessage="Complemento obrigatório"
                  />
                  <Input
                    label="Número"
                    placeholder="1111"
                    icon="number"
                    value={endereco.numero}
                    onChange={(e) =>
                      handleEnderecoChange("numero", e.target.value)
                    }
                    required
                    errorMessage="Número obrigatório"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.botoes}>
            <Button icon="cancel" link="/dashboard" variant="secondary">
              Cancelar
            </Button>
            <Button
              icon="next"
              onClick={alternarFase}
              className={fase ? style.btnRotated : ""}
            >
              {fase ? "Voltar" : "Próximo"}
            </Button>
          </div>
        </article>

        <article
          id="etapa3"
          className={`card gap-4 between ${style.parte2} ${
            !fase ? style.display : ""
          }`}
        >
          <div>
            <h2>3ª Etapa - Equipe & Local</h2>
            <hr />
          </div>
          <div className={style.sugestao}>
            <div className="flex_c between gap-4">
              <div className="flex_c gap-2">
                <Select
                  label="Equipe"
                  placeholder="Selecione a equipe"
                  options={opcoesEquipes}
                  value={equipeIdSelecionada}
                  onChange={(valor: string) => setEquipeIdSelecionada(valor)}
                  required
                  errorMessage="Equipe obrigatório"
                />

                <div className="flex_c gap-6">
                  {equipeAtual?.membros?.map((membro) => (
                    <div key={membro.id} className="flex gap-2">
                      <Image
                        src={membro.foto || "/img/user.png"}
                        width={32}
                        height={32}
                        alt={membro.nome}
                        className="user"
                      />
                      <div>
                        <h5>{membro.nome}</h5>
                        <p>{membro.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Calendario
                compact
                onSelectDate={(novaData) => {
                  if (novaData) setDataSelecionada(novaData.toISOString());
                }}
              />
            </div>

            <div className={style.sugestoesLista}>
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSugestao key={index} />
              ))}
            </div>
          </div>

          <div className={style.botoes}>
            <Button
              icon="left"
              variant="secondary"
              onClick={alternarFase}
            >
              Voltar
            </Button>
            <Button icon="save" onClick={handleSalvar}>
              {idEdicao ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </article>
      </section>
    </Main>
  );
}
