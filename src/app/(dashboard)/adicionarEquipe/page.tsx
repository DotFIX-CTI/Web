"use client";

import Image from "next/image";
import Main from "@/utils/main";
import Input from "@/components/input";
import Button from "@/components/button";
import Select from "@/components/select";
import Integrante from "@/utils/integrante";
import Pesquisa from "@/components/pesquisa";
import InputImage from "@/components/inputImage";
import { Funcionario } from "@/api/equipe";
import { useEquipe } from "@/hooks/useEquipe";
import { useEquipes } from "@/hooks/useEquipes";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toastErro, toastInfo, toastSucesso } from "@/utils/toast";

export default function AdicionarEquipe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idEdicao = idParam ? Number(idParam) : NaN;

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [funcionario1Id, setFuncionario1Id] = useState("");
  const [funcionario2Id, setFuncionario2Id] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const { equipes, criar, atualizar, remover } = useEquipes();
  const { equipe, carregando } = useEquipe(idEdicao);

  const todosFuncionarios = useMemo(() => {
    const mapa = new Map<number, Funcionario>();

    equipes.forEach((eq) => {
      eq.funcionarios?.forEach((f) => mapa.set(f.funcionarioID, f));
    });

    equipe?.funcionarios?.forEach((f) => mapa.set(f.funcionarioID, f));

    return Array.from(mapa.values());
  }, [equipes, equipe]);

  const opcoesFuncionarios = useMemo(
    () =>
      todosFuncionarios.map((f) => ({
        label: f.nome,
        value: String(f.funcionarioID),
      })),
    [todosFuncionarios],
  );

  const funcionario1 = useMemo(
    () =>
      todosFuncionarios.find((f) => String(f.funcionarioID) === funcionario1Id),
    [todosFuncionarios, funcionario1Id],
  );

  const funcionario2 = useMemo(
    () =>
      todosFuncionarios.find((f) => String(f.funcionarioID) === funcionario2Id),
    [todosFuncionarios, funcionario2Id],
  );

  const funcionariosFiltrados = useMemo(() => {
    const termo = termoPesquisa.trim().toLowerCase();
    if (!termo) return todosFuncionarios;

    return todosFuncionarios.filter(
      (f) =>
        f.nome.toLowerCase().includes(termo) ||
        f.email.toLowerCase().includes(termo),
    );
  }, [todosFuncionarios, termoPesquisa]);

  useEffect(() => {
    if (!equipe) return;

    setNomeEquipe(equipe.nomeEquipe || "");

    if (equipe.funcionarios?.[0]) {
      setFuncionario1Id(String(equipe.funcionarios[0].funcionarioID));
    }
    if (equipe.funcionarios?.[1]) {
      setFuncionario2Id(String(equipe.funcionarios[1].funcionarioID));
    }
  }, [equipe]);

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

  if (idEdicao && carregando) {
    return (
      <Main>
        <h1>Carregando dados da equipe...</h1>
      </Main>
    );
  }

  return (
    <Main>
      <section className="grid2 gap-8 max_width">
        <article className="card between max_height">
          <div className="flex_c gap-8">
            <h2>{idEdicao ? "Editar Equipe" : "Adicionar Equipe"}</h2>
            <div className="grid gap-4">
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
                <Input
                  label="Email"
                  placeholder="gustavo@gmail.com"
                  icon="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  errorMessage="Email obrigatório"
                />
                <Input
                  label="Senha de acesso"
                  placeholder="********"
                  icon="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required={!idEdicao}
                  errorMessage="Senha obrigatória"
                />
                <Input
                  label="Confirmar Senha"
                  placeholder="********"
                  icon="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required={!idEdicao}
                  errorMessage="Senha incorreta"
                />
              </div>

              <div className="flex_c gap-12">
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
                        <Image
                          src={funcionario1.foto || "/img/user.png"}
                          width={40}
                          height={40}
                          alt={funcionario1.nome}
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
                        <Image
                          src={funcionario2.foto || "/img/user.png"}
                          width={40}
                          height={40}
                          alt={funcionario2.nome}
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
              funcionariosFiltrados.map((funcionario) => (
                <Integrante
                  key={funcionario.funcionarioID}
                  membro={funcionario}
                  onSelect={(selecionado) => {
                    const idStr = String(selecionado.funcionarioID);
                    if (!funcionario1Id) {
                      setFuncionario1Id(idStr);
                    } else if (!funcionario2Id && funcionario1Id !== idStr) {
                      setFuncionario2Id(idStr);
                    }
                  }}
                />
              ))
            )}
          </div>
        </article>
      </section>
    </Main>
  );
}
