"use client";

import Header from "@/components/header";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";
import style from "./detalhe.module.css";
import Image from "next/image";
import Button from "@/components/button";
import dynamic from "next/dynamic";
import Icon from "@/utils/icon";
import { Props } from "@/utils/status";
import CardEquipe from "@/components/cardEquipe";

const MapaDinamico = dynamic(() => import("@/utils/mapa"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Carregando mapa...
    </div>
  ),
});

export default function DetalheAgendamento() {
  return (
    <>
      <Header />
      <Menubar />
      <Main>
        <section className={`${style.grid} gap-12`}>
          <div className={`${style.subgrid} gap-6`}>
            <article className={`flex_c between card ${Props.cancelado}`}>
              <div className="flex_c gap-1">
                <h1 className="upper">Link dedicado 10gbps</h1>
                <h2>03/03/2026</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ut lectus sit amet tellus facilisis consectetur. Proin vel
                  mollis urna. Fusce mollis dignissim luctus. Morbi convallis
                  libero vitae venenatis rutrum.
                </p>
              </div>
              <Button icon="user">Reagendar</Button>
            </article>
            <CardEquipe />
          </div>

          {/* Card do Mapa */}
          <article className={`card ${style.mapa}`}>
            <div
              className={`flex_c gap-2 ${Props.cancelado}_bg`}
              style={{ padding: "20px" }}
            >
              <div className={`flex between`}>
                <h2>CTI Brasil</h2>
                <div className={`center gap-4`}>
                  <div className="center gap-1">
                    <Icon name="user" size={24} />
                    <h4>Jucelino</h4>
                  </div>
                  <div className="flex gap-2">
                    <Icon name="mail" size={24} />
                    <Icon name="whatsapp" size={24} />
                  </div>
                </div>
              </div>
              <div className="center gap-1">
                <Icon name="local" size={20} />
                <p className="txt">
                  R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690
                </p>
              </div>
            </div>
            <MapaDinamico />
          </article>
        </section>
      </Main>
    </>
  );
}
