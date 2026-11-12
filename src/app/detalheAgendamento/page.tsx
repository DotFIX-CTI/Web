"use client";

import Main from "@/utils/main";
import { Props } from "@/utils/status";
import CardEquipe from "@/components/cardEquipe";
import CardMapa from "@/components/cardMapa";
import Button from "@/components/button";

export default function DetalheAgendamento() {
  return (
    <Main>
      <section className="grid gap-12 max_width">
        <div className="flex_c gap-12 max_height">
          <article className={`card between gap-4 ${Props.cancelado}`}>
            <div className="flex_c gap-4">
              <div className="flex_c">
                <h1 className="upper">Link dedicado 10gbps</h1>
                <h4>03/03/2026</h4>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                lectus sit amet tellus facilisis consectetur. Proin vel mollis
                urna. Fusce mollis dignissim luctus. Morbi convallis libero
                vitae venenatis rutrum.
              </p>
            </div>
            <Button icon="reschudule" link="/reagendamento" variant="attention">
              Reagendar
            </Button>
          </article>
          <CardEquipe />
        </div>
        <CardMapa />
      </section>
    </Main>
  );
}
