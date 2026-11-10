import Main from "@/utils/main";
import style from "./reagendamento.module.css";
import Image from "next/image";
import { Props } from "@/utils/status";
import Pesquisa from "@/components/pesquisa";
import CardReagendamento from "@/components/cardReagendamento";
import Button from "@/components/button";

export default function Reagendamento() {
  return (
    <Main>
      <section className={`${style.grid} gap-12`}>
        <article className={`card flex_c between ${Props.cancelado}`}>
          <div className="flex_c gap-1">
            <h1 className={`upper`}>Link dedicado 10gbps</h1>
            <h4>03/03/2026</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              lectus sit amet tellus facilisis consectetur. Proin vel mollis
              urna. Fusce mollis dignissim luctus. Morbi convallis libero vitae
              venenatis rutrum.
            </p>
          </div>
          <div className="flex_c gap-1">
            <h4>Justificativa</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              lectus sit amet tellus facilisis consectetur. Proin vel mollis
              urna. Fusce mollis dignissim luctus. Morbi convallis libero vitae
              venenatis rutrum.
            </p>
          </div>
          <div className={`flex_c gap-4`}>
            <h3>Equipe de Redes</h3>
            <div className="flex gap-2">
              <Image
                src="/img/user.png"
                width={32}
                height={32}
                alt="Picture of the author"
                className="user"
              />
              <div>
                <h5>Arthur Sales</h5>
                <p>arthur@gmail.com</p>
              </div>
            </div>
            <div className="flex between">
              <div className="flex gap-2">
                <Image
                  src="/img/user.png"
                  width={32}
                  height={32}
                  alt="Picture of the author"
                  className="user"
                />
                <div>
                  <h5>Diego Castro</h5>
                  <p>diego@gmail.com</p>
                </div>
              </div>
              <Button icon="save" variant="attention">Validar</Button>
            </div>
          </div>
        </article>
        <article className={`card_scroll ${style.reagendamentos}`}>
          <Pesquisa />
          <div className="flex_c scroll gap-6">
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
            <CardReagendamento />
          </div>
        </article>
      </section>
    </Main>
  );
}
