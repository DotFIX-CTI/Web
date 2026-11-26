"use client";

import Main from "@/utils/main";
import Input from "@/components/input";
import Button from "@/components/button";
import Select from "@/components/select";
import Pesquisa from "@/components/pesquisa";
import InputImage from "@/components/inputImage";
import { Equipe } from "@/api/equipe";
import { useState, useMemo } from "react";
import { useEquipe } from "@/hooks/useEquipe";
import { useEquipes } from "@/hooks/useEquipes";
import { Funcionario } from "@/api/funcionario";
import { useSearchParams, useRouter } from "next/navigation";
import { toastErro, toastInfo, toastSucesso } from "@/utils/toast";
import AvatarFuncionario from "@/utils/avatarFuncionario";
import { useFuncionarios } from "@/hooks/useFuncionarios";

interface FormularioEquipeProps {
  idEdicao: number;
  equipe?: Equipe | null;
}

function FormularioEquipe({ idEdicao, equipe }: FormularioEquipeProps) {
  const router = useRouter();

  const [nomeEquipe, setNomeEquipe] = useState(() => equipe?.nomeEquipe ?? "");
  const [funcionario1Id, setFuncionario1Id] = useState(() =>
    equipe?.funcionarios?.[0]
      ? String(equipe.funcionarios[0].funcionarioID)
      : "",
  );
  const [funcionario2Id, setFuncionario2Id] = useState(() =>
    equipe?.funcionarios?.[1]
      ? String(equipe.funcionarios[1].funcionarioID)
      : "",
  );
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const { equipes, criar, atualizar, remover } = useEquipes();
  const { funcionarios } = useFuncionarios();

  const funcionariosDisponiveis = useMemo(() => {
    const idsDaEquipeAtual = new Set<number>(
      equipe?.funcionarios?.map((f) => f.funcionarioID) ?? [],
    );

    return funcionarios.filter((f) => {
      const tipoId =
        f.tipoFuncionarioID ?? f.tipoFuncionario?.tipoFuncionarioID;
      if (tipoId !== 1) return false;

      const equipeDoFuncionario = f.equipeID ?? f.equipe?.equipeID ?? null;

      // Em edição, mantém os membros que já fazem parte da equipe atual
      if (idEdicao && equipeDoFuncionario === idEdicao) return true;
      if (idsDaEquipeAtual.has(f.funcionarioID)) return true;

      // Caso contrário, só quem não possui equipe
      return equipeDoFuncionario == null;
    });
  }, [funcionarios, equipe, idEdicao]);

  const opcoesFuncionarios = useMemo(
    () =>
      funcionariosDisponiveis.map((f) => ({
        label: f.nome,
        value: String(f.funcionarioID),
      })),
    [funcionariosDisponiveis],
  );

  const funcionario1 = useMemo(
    () =>
      funcionariosDisponiveis.find(
        (f) => String(f.funcionarioID) === funcionario1Id,
      ),
    [funcionariosDisponiveis, funcionario1Id],
  );

  const funcionario2 = useMemo(
    () =>
      funcionariosDisponiveis.find(
        (f) => String(f.funcionarioID) === funcionario2Id,
      ),
    [funcionariosDisponiveis, funcionario2Id],
  );

  const funcionariosFiltrados = useMemo(() => {
    const termo = termoPesquisa.trim().toLowerCase();
    if (!termo) return funcionariosDisponiveis;

    return funcionariosDisponiveis.filter(
      (f) =>
        f.nome.toLowerCase().includes(termo) ||
        f.email.toLowerCase().includes(termo),
    );
  }, [funcionariosDisponiveis, termoPesquisa]);

  const handleSalvar = async () => {
    if (!nomeEquipe.trim()) {
      toastErro("Por favor, informe o nome da equipe.");
      return;
    }

    if (!funcionario1 || !funcionario2) {
      toastErro("Selecione os 2 funcionários da equipe.");
      return;
    }

    if (funcionario1.funcionarioID === funcionario2.funcionarioID) {
      toastErro("Selecione dois funcionários diferentes para a equipe.");
      return;
    }

    const payload = {
      nomeEquipe,
      latitude: equipe?.latitude ?? -23.55052,
      longitude: equipe?.longitude ?? -46.633308,
      statusEquipeID: equipe?.statusEquipeID ?? 1,
      nomeStatus: equipe?.nomeStatus ?? "Disponível",
      enderecoAtual: equipe?.enderecoAtual ?? "",
      funcionarios: [funcionario1, funcionario2] as [Funcionario, Funcionario],
    };

    try {
      if (idEdicao) {
        await atualizar(idEdicao, payload);
        toastInfo(`Equipe '${nomeEquipe}' editada com sucesso!`);
        router.push(`/detalheEquipe/${idEdicao}`);
      } else {
        await criar(payload);
        toastSucesso("Equipe adicionada com sucesso!");
        router.push("/equipe");
      }
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
      toastErro(`Erro ao ${idEdicao ? "editar" : "salvar"} equipe!`);
    }
  };

  const handleExcluir = async () => {
    if (!idEdicao) return;
    try {
      await remover(idEdicao);
      toastSucesso("Equipe excluída com sucesso!");
      router.push("/equipe");
    } catch {
      toastErro("Erro ao excluir equipe.");
    }
  };

  return (
    <section className="grid4 gap-8 max_width">
      <article className="card between max_height">
        <div className="flex_c gap-8">
          <h2>{idEdicao ? "Editar Equipe" : "Adicionar Equipe"}</h2>
          <div className="flex_c gap-4">
            <div className="center gap-4">
              <div>
                <InputImage />
              </div>
              <div className="small_txt">
                <p>Observação:</p>
                <span>
                  Caso não tenha imagem, apenas as iniciais do nome da sua
                  equipe irão aparecer
                </span>
              </div>
            </div>

            <Input
              label="Nome da Equipe"
              placeholder="Gustavo"
              icon="user"
              value={nomeEquipe}
              onChange={(e) => setNomeEquipe(e.target.value)}
              required
              errorMessage="Nome obrigatório"
            />
            <div className="flex_c gap-4">
              <Select
                label="1º Funcionário"
                placeholder="Selecione o primeiro funcionário"
                options={opcoesFuncionarios}
                value={funcionario1Id}
                onChange={(valor: string) => setFuncionario1Id(valor)}
                required
                errorMessage="1º Funcionário obrigatório"
              />
              {funcionario1 && (
                <div className="flex between center gap-2">
                  <div className="flex center gap-2">
                    <AvatarFuncionario
                      funcionarioID={funcionario1.funcionarioID}
                      nome={funcionario1.nome}
                      size={40}
                      className="user"
                    />
                    <div>
                      <h5>{funcionario1.nome}</h5>
                      <p>{funcionario1.email}</p>
                    </div>
                  </div>

                  <Button
                    icon="cancel"
                    variant="secondary"
                    onClick={() => setFuncionario1Id("")}
                    noText
                  />
                </div>
              )}
            </div>

            <div className="flex_c gap-4">
              <Select
                label="2º Funcionário"
                placeholder="Selecione o segundo funcionário"
                options={opcoesFuncionarios}
                value={funcionario2Id}
                onChange={(valor: string) => setFuncionario2Id(valor)}
                required
                errorMessage="2º Funcionário obrigatório"
              />
              {funcionario2 && (
                <div className="flex between center gap-2">
                  <div className="flex center gap-2">
                    <AvatarFuncionario
                      funcionarioID={funcionario2.funcionarioID}
                      nome={funcionario2.nome}
                      size={40}
                      className="user"
                    />
                    <div>
                      <h5>{funcionario2.nome}</h5>
                      <p>{funcionario2.email}</p>
                    </div>
                  </div>

                  <Button
                    icon="cancel"
                    variant="secondary"
                    onClick={() => setFuncionario2Id("")}
                    noText
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex between">
          {idEdicao ? (
            <Button
              icon="delete"
              variant="attention"
              className="delete"
              onClick={handleExcluir}
              noText
            />
          ) : (
            <span />
          )}

          <Button icon={idEdicao ? "save" : "add"} onClick={handleSalvar}>
            {idEdicao ? "Salvar" : "Adicionar"}
          </Button>
        </div>
      </article>

      <article className={`card_scroll max_height`}>
        <Pesquisa
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          placeholder="Buscar funcionário..."
        />
        <div className="scroll gap-6">
          {funcionariosFiltrados.length === 0 ? (
            <p>Nenhum funcionário encontrado.</p>
          ) : (
            <div className="grid gap-8">
              {funcionariosFiltrados.map((funcionario) => {
                const idStr = String(funcionario.funcionarioID);
                const jaSelecionado =
                  funcionario1Id === idStr || funcionario2Id === idStr;

                const handleSelecionar = () => {
                  if (!funcionario1Id) {
                    setFuncionario1Id(idStr);
                    return;
                  }

                  if (!funcionario2Id && funcionario1Id !== idStr) {
                    setFuncionario2Id(idStr);
                    return;
                  }

                  if (!jaSelecionado) {
                    toastInfo(
                      "Os 2 funcionários da equipe já foram selecionados.",
                    );
                  }
                };

                return (
                  <div
                    key={funcionario.funcionarioID}
                    className="flex between center gap-2"
                    onClick={handleSelecionar}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex center gap-2">
                      <AvatarFuncionario
                        funcionarioID={funcionario.funcionarioID}
                        nome={funcionario.nome}
                        size={40}
                        className="user"
                      />
                      <div>
                        <h5>{funcionario.nome}</h5>
                        <p>{funcionario.email}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </section>
  );
}

export default function AdicionarEquipe() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idEdicao = idParam ? Number(idParam) : NaN;

  const { equipe, carregando } = useEquipe(idEdicao);

  if (idEdicao && carregando) {
    return (
      <Main>
        <h1>Carregando dados da equipe...</h1>
      </Main>
    );
  }

  const formKey = equipe ? `edit-${equipe.equipeID ?? idEdicao}` : "create";

  return (
    <Main>
      <FormularioEquipe key={formKey} idEdicao={idEdicao} equipe={equipe} />
    </Main>
  );
}
