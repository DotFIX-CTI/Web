"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Main from "@/utils/main";
import Select from "@/components/select";
import Integrante from "@/components/integrante";
import InputImage from "@/components/inputImage";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import { useEquipe } from "@/hooks/useEquipe";
import { Membro } from "@/api/equipe";
import { useEquipes } from "@/hooks/useEquipes";
import Pesquisa from "@/components/pesquisa";
import { toastErro, toastInfo, toastSucesso } from "@/utils/toast";

export default function AdicionarEquipe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idEdicao = idParam ? Number(idParam) : undefined;

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [membro1Id, setMembro1Id] = useState("");
  const [membro2Id, setMembro2Id] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const { equipes } = useEquipes();
  const { equipe, carregando } = useEquipe(idEdicao);

  const todosIntegrantes = useMemo(() => {
    const mapa = new Map<number, Membro>();

    equipes.forEach((eq) => {
      eq.membros?.forEach((m) => mapa.set(m.id, m));
    });

    equipe?.membros?.forEach((m) => mapa.set(m.id, m));

    return Array.from(mapa.values());
  }, [equipes, equipe]);

  const opcoesIntegrantes = useMemo(
    () =>
      todosIntegrantes.map((m) => ({
        label: m.nome,
        value: String(m.id),
      })),
    [todosIntegrantes],
  );

  const integrante1 = useMemo(
    () => todosIntegrantes.find((m) => String(m.id) === membro1Id),
    [todosIntegrantes, membro1Id],
  );

  const integrante2 = useMemo(
    () => todosIntegrantes.find((m) => String(m.id) === membro2Id),
    [todosIntegrantes, membro2Id],
  );

  const integrantesFiltrados = useMemo(() => {
    const termo = termoPesquisa.trim().toLowerCase();
    if (!termo) return todosIntegrantes;

    return todosIntegrantes.filter(
      (m) =>
        m.nome.toLowerCase().includes(termo) ||
        m.email.toLowerCase().includes(termo),
    );
  }, [todosIntegrantes, termoPesquisa]);

  useEffect(() => {
    if (!equipe) return;

    setNomeEquipe(equipe.nomeEquipe || "");

    if (equipe.membros?.[0]) {
      setMembro1Id(String(equipe.membros[0].id));
    }
    if (equipe.membros?.[1]) {
      setMembro2Id(String(equipe.membros[1].id));
    }
  }, [equipe]);

  const handleSalvar = async () => {
    const payload = {
      nomeEquipe,
      email,
      ...(senha ? { senha } : {}),
      statusEquipeID: equipe?.statusEquipeID ?? 1,
      membros: integrante1 && integrante2 ? [integrante1, integrante2] : [],
    };

    try {
      if (idEdicao) {
        router.push(`/detalheEquipe/${idEdicao}`);
        toastInfo(`Equipe '${equipe?.nomeEquipe}' editada!`);
      } else {
        router.push("/equipe");
        toastSucesso("Equipe adicionada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
      toastErro(`Erro ao ${idEdicao ? "editar" : "salvar"} equipe!`);
    }
  };

  const handleExcluir = async () => {
    if (!idEdicao) return;
    router.push("/equipe");
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
                    label="1º Integrante"
                    placeholder="Selecione o primeiro integrante"
                    options={opcoesIntegrantes}
                    value={membro1Id}
                    onChange={(valor: string) => setMembro1Id(valor)}
                    required
                    errorMessage="1º Integrante obrigatório"
                  />
                  {integrante1 && (
                    <div className="flex between center gap-2">
                      <div className="flex center gap-2">
                        <Image
                          src={integrante1.foto || "/img/user.png"}
                          width={40}
                          height={40}
                          alt={integrante1.nome}
                          className="user"
                        />
                        <div>
                          <h5>{integrante1.nome}</h5>
                          <p>{integrante1.email}</p>
                        </div>
                      </div>

                      <Button
                        icon="cancel"
                        variant="secondary"
                        onClick={() => setMembro1Id("")}
                        noText
                      />
                    </div>
                  )}
                </div>

                <div className="flex_c gap-4">
                  <Select
                    label="2º Integrante"
                    placeholder="Selecione o segundo integrante"
                    options={opcoesIntegrantes}
                    value={membro2Id}
                    onChange={(valor: string) => setMembro2Id(valor)}
                    required
                    errorMessage="2º Integrante obrigatório"
                  />
                  {integrante2 && (
                    <div className="flex between center gap-2">
                      <div className="flex center gap-2">
                        <Image
                          src={integrante2.foto || "/img/user.png"}
                          width={40}
                          height={40}
                          alt={integrante2.nome}
                          className="user"
                        />
                        <div>
                          <h5>{integrante2.nome}</h5>
                          <p>{integrante2.email}</p>
                        </div>
                      </div>

                      <Button
                        icon="cancel"
                        variant="secondary"
                        onClick={() => setMembro2Id("")}
                        noText
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            icon={idEdicao ? "save" : "add"}
            onClick={handleSalvar}
            className="self-end"
          >
            {idEdicao ? "Salvar" : "Adicionar"}
          </Button>

          {idEdicao && (
            <Button
              icon="delete"
              variant="attention"
              className="delete"
              onClick={handleExcluir}
              noText
            />
          )}
        </article>

        <article className={`card_scroll max_height`}>
          <Pesquisa
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Buscar integrante..."
          />
          <div className="scroll gap-6">
            {integrantesFiltrados.length === 0 ? (
              <p>Nenhum integrante encontrado.</p>
            ) : (
              integrantesFiltrados.map((membro) => (
                <Integrante
                  key={membro.id}
                  membro={membro}
                  onSelect={(selecionado) => {
                    const idStr = String(selecionado.id);
                    if (!membro1Id) {
                      setMembro1Id(idStr);
                    } else if (!membro2Id && membro1Id !== idStr) {
                      setMembro2Id(idStr);
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
