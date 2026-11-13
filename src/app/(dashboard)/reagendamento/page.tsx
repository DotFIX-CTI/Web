import Main from "@/utils/main";
import { Props } from "@/utils/status";
import CardReagendamento from "@/components/cardReagendamento";
import Pesquisa from "@/components/pesquisa";
import Button from "@/components/button";
import Image from "next/image";

export default function Reagendamento() {
  return (
    <Main>
      <section className="grid gap-12 max_width max_height">
        <article className={`card between gap-6 ${Props.cancelado}`}>
          <div className="flex_c gap-1">
            <h1 className="upper">Link dedicado 10gbps</h1>
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
              <Button icon="save" variant="attention" link="/dashboard">
                Validar
              </Button>
            </div>
          </div>
        </article>
        <article className={`card_scroll max_height`}>
          <Pesquisa />
          <div className="flex_c scroll gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardReagendamento key={index} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
