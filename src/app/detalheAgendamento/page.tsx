"use client";

import Header from "@/components/header";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";
import style from "./detalhe.module.css";
import Image from "next/image";
import Button from "@/components/button";
import dynamic from "next/dynamic";
import Icon from "@/utils/icon";

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
          <article className={`flex_c between card default`}>
            <div className="flex_c gap-1">
              <h1 className="upper">Link dedicado 10gbps</h1>
              <h2>03/03/2026</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                lectus sit amet tellus facilisis consectetur. Proin vel mollis
                urna. Fusce mollis dignissim luctus. Morbi convallis libero
                vitae venenatis rutrum.
              </p>
            </div>
            <div className="flex_c gap-4">
              <div className="flex_c gap-2">
                <h2>Equipe de Redes</h2>
                <div className={`flex_c gap-4`}>
                  <div className="flex gap-2">
                    <Image
                      src="/img/user.png"
                      width={32}
                      height={32}
                      alt="Picture of the author"
                      className="user"
                    />
                    <div>
                      <h4>Arthur Sales</h4>
                      <p>arthur@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/img/user.png"
                      width={32}
                      height={32}
                      alt="Picture of the author"
                      className="user"
                    />
                    <div>
                      <h4>Diego Castro</h4>
                      <p>diego@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button icon="user">Reagendar</Button>
            </div>
          </article>

          {/* Card do Mapa */}
          <article className={`card ${style.cliente}`}>
            <MapaDinamico />
            <div className={`center ${style.info} gap-16`}>
              <div className="flex gap-2">
                <Icon name="user" size={24} />
                <h4>Jucelino</h4>
              </div>
              <div className="flex gap-2">
                <Icon name="mail" size={24} />
                <Icon name="whatsapp" size={24} />
              </div>
            </div>
          </article>
        </section>
      </Main>
    </>
  );
}
