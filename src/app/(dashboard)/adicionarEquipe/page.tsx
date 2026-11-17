"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Main from "@/utils/main";
import style from "./adicionar.module.css";
import Select, { Option } from "@/components/select";
import Integrante from "@/components/integrante";
import InputImage from "@/components/inputImage";
import Pesquisa from "@/components/pesquisa";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import { useEquipe } from "@/hooks/useEquipe";
import { Membro } from "@/api/equipe";

// Lista mockada de integrantes disponíveis (pode ser substituída pelo seu hook/API de usuários)
const listaIntegrantesDisponiveis: Membro[] = [
  {
    id: 101,
    nome: "Arthur Sales",
    email: "arthur.sales@empresa.com",
    foto: "/img/user.png",
  },
  {
    id: 102,
    nome: "Diego Castro",
    email: "diego.castro@empresa.com",
    foto: "/img/user.png",
  },
  {
    id: 103,
    nome: "Lucas Mendes",
    email: "lucas.mendes@empresa.com",
    foto: "/img/user.png",
  },
  {
    id: 104,
    nome: "Camila Rocha",
    email: "camila.rocha@empresa.com",
    foto: "/img/user.png",
  },
  {
    id: 105,
    nome: "Rafael Lima",
    email: "rafael.lima@empresa.com",
    foto: "/img/user.png",
  },
  {
    id: 106,
    nome: "Bruno Costa",
    email: "bruno.costa@empresa.com",
    foto: "/img/user.png",
  },
];

export default function AdicionarEquipe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idEdicao = idParam ? Number(idParam) : undefined;

  const { equipe, carregando } = useEquipe(idEdicao);

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [membro1Id, setMembro1Id] = useState("");
  const [membro2Id, setMembro2Id] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const todosIntegrantes = useMemo(() => {
    const mapa = new Map<number, Membro>();
    listaIntegrantesDisponiveis.forEach((m) => mapa.set(m.id, m));
    equipe?.membros?.forEach((m) => mapa.set(m.id, m));
    return Array.from(mapa.values());
  }, [equipe]);

  const opcoesIntegrantes: Option[] = useMemo(
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
      } else {
        router.push("/equipe");
      }
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
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
        <article className="card gap-8 max_height">
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
              <div className="flex_c gap-1">
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
                  <div className="flex gap-2">
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
                )}
              </div>

              <div className="flex_c gap-1">
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
                  <div className="flex gap-2">
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
                )}
              </div>
            </div>
          </div>

          <Button
            icon={idEdicao ? "save" : "add"}
            className={`${style.adicionar}`}
            onClick={handleSalvar}
          >
            {idEdicao ? "Salvar" : "Adicionar"}
          </Button>

          {idEdicao && (
            <Button
              icon="delete"
              variant="attention"
              className={`${style.deletar}`}
              onClick={handleExcluir}
              noText
            />
          )}
        </article>

        <article className={`card_scroll max_height`}>
          <Pesquisa />
          <div className="scroll gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Integrante key={index} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
