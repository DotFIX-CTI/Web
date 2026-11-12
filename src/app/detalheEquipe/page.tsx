"use client";

import Main from "@/utils/main";
import Icon from "@/utils/icon";
import style from "./detalhe.module.css";
import CardMapa from "@/components/cardMapa";
import CardLog from "@/components/cardLog";
import Image from "next/image";
import Link from "next/link";

export default function DetalheEquipe() {
  return (
    <Main>
      <section className="flex_c gap-12 max_width">
        <div className="grid gap-12">
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
          <CardMapa />
        </div>
        <article className="card_scroll_h">
          <div className="scroll_h gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardLog key={index} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
