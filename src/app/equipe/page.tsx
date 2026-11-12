"use client";

import { useRef } from "react";
import Main from "@/utils/main";
import style from "./equipe.module.css";
import CardEquipe from "@/components/cardEquipe";
import Button from "@/components/button";

export default function Equipes() {
  const scrollRef = useRef<HTMLElement>(null);

  const handleWheel = (e: any) => {
    if (window.innerWidth <= 1200) return;

    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <Main className={`flex_c gap-4 ${style.container}`}>
      <div className={`center between ${style.info}`}>
        <h1>Equipes do Sistema</h1>
        <Button icon="add" link="/adicionarEquipe">
          Equipe
        </Button>
      </div>
      <section
        className={`${style.grid_equipe} gap-12`}
        ref={scrollRef}
        onWheel={handleWheel}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <CardEquipe key={index} />
        ))}
      </section>
    </Main>
  );
}
