"use client";

import Main from "@/utils/main";
import style from "./equipe.module.css";
import Button from "@/components/button";
import Pesquisa from "@/components/pesquisa";
import CardEquipe from "@/components/cards/cardEquipe";
import { useEquipes } from "@/hooks/useEquipes";
import { useRef, useState, useMemo } from "react";

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Equipes() {
  const { carregando, equipes } = useEquipes();
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const scrollRef = useRef<HTMLElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (window.innerWidth <= 1200) return;

    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const equipesFiltradas = useMemo(() => {
    const termo = normalizarTexto(termoPesquisa);
    if (!termo) return equipes;

    return equipes.filter((eq) => {
      const nome = normalizarTexto(eq.nomeEquipe || "");
      const funcionario1 = normalizarTexto(eq.funcionarios?.[0]?.nome || "");
      const funcionario2 = normalizarTexto(eq.funcionarios?.[1]?.nome || "");

      return (
        nome.includes(termo) ||
        funcionario1.includes(termo) ||
        funcionario2.includes(termo)
      );
    });
  }, [equipes, termoPesquisa]);

  return (
    <Main className={`flex_c ${style.container}`} justify="flex-start">
      <div className={`center between gap-12 ${style.info}`}>
        <h1>Equipes do Sistema</h1>
        <div className={`flex gap-4 ${style.filtro}`}>
          <Pesquisa
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Pesquisar equipes ou funcionários..."
          />
          <div className="flex gap-2">
            <Button icon="add" link="/adicionarEquipe">
              Equipe
            </Button>
            <Button icon="add" link="/adicionarFuncionario">
              Funcionário
            </Button>
          </div>
        </div>
      </div>
      {carregando ? (
        <h1>Carregando equipes...</h1>
      ) : (
        <section
          className={`${style.grid_equipe} gap-8`}
          ref={scrollRef}
          onWheel={handleWheel}
        >
          {equipesFiltradas.length === 0 ? (
            <p className="p-4">Nenhuma equipe encontrada.</p>
          ) : (
            equipesFiltradas.map((item) => (
              <CardEquipe key={item.equipeID} equipe={item} />
            ))
          )}
        </section>
      )}
    </Main>
  );
}
