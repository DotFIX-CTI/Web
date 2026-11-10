"use client";

import Main from "@/utils/main";
import style from "./detalhe.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/utils/icon";
import { Props } from "@/utils/status";
import dynamic from "next/dynamic";
import CardLog from "@/components/cardLog";

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

export default function DetallheEquipe() {
  return (
    <Main>
      <section className="flex_c gap-12">
        <div className={`${style.grid} gap-12`}>
          <article className="card gap-4">
            <div className="center gap-4">
              <Image
                src="/img/user.png"
                width={80}
                height={80}
                alt="Picture of the author"
                className="user"
              />
              <h2>Equipe de Redes</h2>
            </div>
            <div className="flex_c gap-4">
              <div className="flex gap-2">
                <Image
                  src="/img/user.png"
                  width={80}
                  height={80}
                  alt="Picture of the author"
                  className="user"
                />
                <div>
                  <h5>Arthur Sales</h5>
                  <p>arthur@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/img/user.png"
                  width={80}
                  height={80}
                  alt="Picture of the author"
                  className="user"
                />
                <div>
                  <h5>Arthur Sales</h5>
                  <p>arthur@gmail.com</p>
                </div>
              </div>
            </div>
            <Link href="/adicionarEquipe" className={`${style.edit}`}>
              <Icon name="edit" size={36} />
            </Link>
          </article>
          <article className="card_mapa">
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
              <div className={`center gap-1`}>
                <Icon name="local" size={20} />
                <p>
                  R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690
                </p>
              </div>
            </div>
            <MapaDinamico />
          </article>
        </div>
        <article className={`card_scroll_h ${style.cards_log}`}>
          <div className="scroll_h gap-8">
            <CardLog />
            <CardLog />
            <CardLog />
            <CardLog />
            <CardLog />
          </div>
        </article>
      </section>
    </Main>
  );
}
