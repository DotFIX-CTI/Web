"use client";

import { useRef, useState, useMemo } from "react";
import Main from "@/utils/main";
import style from "./equipe.module.css";
import CardEquipe from "@/components/cardEquipe";
import Button from "@/components/button";
import { useEquipes } from "@/hooks/useEquipes";
import Pesquisa from "@/components/pesquisa";

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
    const termo = termoPesquisa.trim().toLowerCase();
    if (!termo) return equipes;

    return equipes.filter((eq) => {
      const nome = eq.nomeEquipe?.toLowerCase() || "";
      const membro1 = eq.membros?.[0]?.nome?.toLowerCase() || "";
      const membro2 = eq.membros?.[1]?.nome?.toLowerCase() || "";
      return (
        nome.includes(termo) ||
        membro1.includes(termo) ||
        membro2.includes(termo)
      );
    });
  }, [equipes, termoPesquisa]);

  return (
    <Main className={`flex_c ${style.container}`} justify="flex-start">
      <div className={`center between ${style.info}`}>
        <h1>Equipes do Sistema</h1>
        <div className="flex gap-4">
          <Pesquisa
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Pesquisar equipes ou membros..."
          />
          <Button icon="add" link="/adicionarEquipe">
            Equipe
          </Button>
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
