"use client";

import CardEquipe from "@/components/cardEquipe";
import Header from "@/components/header";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";
import style from "./equipe.module.css";
import { useRef } from "react";
import Button from "@/components/button";

export default function Equipes() {
  const scrollRef = useRef<HTMLElement>(null);

  const handleWheel = (e: any) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <>
      <Header />
      <Menubar />
      <Main className="flex_c">
        <div
          className="flex between center"
          style={{ padding: "0 10% 24px" }}
        >
          <h1>Equipes do Sistema</h1>
          <Button icon="add" link="/adicionarEquipe">Equipe</Button>
        </div>
        <section
          className={`${style.grid}`}
          ref={scrollRef}
          onWheel={handleWheel}
        >
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
          <CardEquipe />
        </section>
      </Main>
    </>
  );
}
