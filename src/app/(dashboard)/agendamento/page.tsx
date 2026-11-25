"use client";

import Image from "next/image";
import Main from "@/utils/main";
import Input from "@/components/input";
import Button from "@/components/button";
import Calendario from "@/components/calendario";
import Select, { Option } from "@/components/select";
import CardSugestao from "@/components/cards/cardSugestao";
import { estado } from "@/utils/estados";
import { useEquipes } from "@/hooks/useEquipes";
import { useBuscarCep } from "@/hooks/useBuscarCep";
import { useState, useEffect, useMemo } from "react";
import { toastErro, toastSucesso } from "@/utils/toast";
import { useAgendamento } from "@/hooks/useAgendamento";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { obterDadosAgendamento } from "@/utils/agendamento";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Agendamento as AgendamentoType,
  AtualizarAgendamentoPayload,
  CriarAgendamentoPayload,
} from "@/api/agendamento";
import style from "./agendamento.module.css";

const opcoesEstados: Option[] = Object.entries(estado).map(([sigla, nome]) => ({
  label: nome,
  value: sigla.toUpperCase(),
}));

interface FormularioAgendamentoProps {
  idEdicao: number;
  isReagendamento: boolean;
  agendamento?: AgendamentoType | null;
}

function FormularioAgendamento({
  idEdicao,
  isReagendamento,
  agendamento,
}: FormularioAgendamentoProps) {
  const router = useRouter();

  const dadosIniciais = useMemo(
    () => (agendamento ? obterDadosAgendamento(agendamento) : null),
    [agendamento],
  );

  // false = 1ª e 2ª etapa (avançar para "Próximo")
  // true  = 3ª etapa aberta (permite "Voltar")
  const [fase, setFase] = useState(isReagendamento);

  const { criar, atualizar } = useAgendamentos();
  const { equipes } = useEquipes();

  // Estados controlados inicializados diretamente a partir de `agendamento`
  const [nomeCliente, setNomeCliente] = useState(
    () => agendamento?.nomeCliente || "",
  );
  const [emailCliente, setEmailCliente] = useState(
    () => agendamento?.emailCliente || "",
  );
  const [telefoneCliente, setTelefoneCliente] = useState(
    () => agendamento?.telefoneCliente || "",
  );
  const [nomeServico, setNomeServico] = useState(
    () => agendamento?.nomeServico || "",
  );
  const [descricao, setDescricao] = useState(
    () => agendamento?.descricao || "",
  );
  const [equipeIdSelecionada, setEquipeIdSelecionada] = useState(() =>
    dadosIniciais?.equipeId ? String(dadosIniciais.equipeId) : "",
  );
  const [dataSelecionada, setDataSelecionada] = useState<string>(
    () => dadosIniciais?.dataAgendamento || "",
  );

  const {
    cep,
    endereco,
    erro,
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

  // Esse useEffect sincroniza com um sistema externo (DOM / scroll), então é válido
  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetId = fase ? "etapa3" : "etapa1";
    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [fase]);

  const irParaProximaEtapa = () => {
    setFase(true);
  };

  const voltarEtapaAnterior = () => {
    setFase(false);
  };

  const handleSalvar = async () => {
    const dataFinal = dataSelecionada || new Date().toISOString();
    const equipeNum = Number(equipeIdSelecionada);

    if (!Number.isInteger(equipeNum) || equipeNum <= 0) {
      toastErro("Selecione uma equipe válida.");
      return;
    }

    const basePayload: CriarAgendamentoPayload = {
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
      equipeID: equipeNum,
      dataAgendamento: dataFinal,
    };

    try {
      if (idEdicao) {
        const updatePayload: AtualizarAgendamentoPayload = {
          ...basePayload,
          statusAgendamentoID:
            agendamento?.statusAgendamento?.statusAgendamentoID ?? 1,
        };
        await atualizar(idEdicao, updatePayload);
        router.push(`/detalheAgendamento/${idEdicao}`);
      } else {
        const novo = await criar(basePayload);
        if (!novo) {
          throw new Error("Falha ao criar agendamento");
        }
        router.push(`/detalheAgendamento/${novo.agendamentoID}`);
      }

      toastSucesso(
        isReagendamento
          ? "Agendamento reagendado com sucesso"
          : `Agendamento ${idEdicao ? "editado" : "salvo"} com sucesso`,
      );
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      toastErro("Não foi possível salvar agendamento");
    }
  };

  return (
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
                  error={!!erro}
                  errorMessage={erro}
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
            type="button"
            icon="next"
            onClick={irParaProximaEtapa}
            disabled={fase}
            className={fase ? style.btnOff : ""}
          >
            Próximo
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

              <div className="flex_c gap-2">
                {equipeAtual?.funcionarios?.map((funcionario) => (
                  <div key={funcionario.funcionarioID} className="flex gap-2">
                    <Image
                      src={funcionario.imgUrl || "/img/user.png"}
                      width={32}
                      height={32}
                      alt={funcionario.nome}
                      className="user"
                    />
                    <div>
                      <h5>{funcionario.nome}</h5>
                      <p>{funcionario.email}</p>
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
            type="button"
            icon="next"
            variant="secondary"
            onClick={voltarEtapaAnterior}
            disabled={!fase}
            className={`${style.btnRotated} ${!fase ? style.btnOff : ""}`}
          >
            Voltar
          </Button>
          <Button type="button" icon="save" onClick={handleSalvar}>
            {isReagendamento ? "Reagendar" : idEdicao ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </article>
    </section>
  );
}

export default function Agendamento() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const modo = searchParams.get("modo");
  const isReagendamento = modo === "reagendar";
  const idEdicao = idParam ? Number(idParam) : NaN;

  const { agendamento, carregando: carregandoAgendamento } =
    useAgendamento(idEdicao);

  if (idEdicao && carregandoAgendamento) {
    return (
      <Main>
        <h1>Carregando dados do agendamento...</h1>
      </Main>
    );
  }

  const formKey = agendamento
    ? `edit-${agendamento.agendamentoID ?? idEdicao}-${isReagendamento ? "reag" : "norm"}`
    : `create-${isReagendamento ? "reag" : "norm"}`;

  return (
    <Main>
      <FormularioAgendamento
        key={formKey}
        idEdicao={idEdicao}
        isReagendamento={isReagendamento}
        agendamento={agendamento}
      />
    </Main>
  );
}
