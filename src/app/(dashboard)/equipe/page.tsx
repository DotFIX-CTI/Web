"use client";

import { useRef } from "react";
import Main from "@/utils/main";
import style from "./equipe.module.css";
import CardEquipe from "@/components/cardEquipe";
import Button from "@/components/button";
import { useEquipes } from "@/hooks/useEquipes";
import Pesquisa from "@/components/pesquisa";

export default function Equipes() {
  const { carregando, equipes } = useEquipes();

  const scrollRef = useRef<HTMLElement>(null);

  const handleWheel = (e: any) => {
    if (window.innerWidth <= 1200) return;

    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <Main className={`flex_c ${style.container}`} justify="flex-start">
      <div className={`center between ${style.info}`}>
        <h1>Equipes do Sistema</h1>
        <div className="flex gap-4">
          <Pesquisa />
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
          {equipes.map((item) => (
            <CardEquipe key={item.equipeID} equipe={item} />
          ))}
        </section>
      )}
    </Main>
  );
}
