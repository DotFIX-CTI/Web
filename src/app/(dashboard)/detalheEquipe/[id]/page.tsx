"use client";

import { useParams } from "next/navigation";
import Main from "@/utils/main";
import Icon from "@/utils/icon";
import CardMapa from "@/components/cardMapa";
import CardLog from "@/components/cardLog";
import Image from "next/image";
import Link from "next/link";
import { Status } from "@/utils/status";
import { useEquipe } from "@/hooks/useEquipe";

export default function DetalheEquipe() {
  const params = useParams<{ id: string }>();
  const { equipe, carregando, erro } = useEquipe(Number(params.id));

  if (carregando) {
    return (
      <Main>
        <h1>Carregando detalhes da equipe...</h1>
      </Main>
    );
  }

  if (erro || !equipe) {
    return (
      <Main>
        <h1>{erro ?? "Equipe não encontrada."}</h1>
      </Main>
    );
  }

  return (
    <Main>
      <section className="grid gap-12 max_width">
        <div className="flex_c gap-8 max_height">
          <article className="card gap-4">
            <div className="center gap-4">
              <Image
                src={equipe.foto || "/img/user.png"}
                width={80}
                height={80}
                alt={`Foto da ${equipe.nomeEquipe}`}
                className="user"
              />
              <h2>{equipe.nomeEquipe}</h2>
            </div>

            <div className="flex_c gap-4">
              {equipe.membros?.map((membro) => (
                <div key={membro.id} className="flex gap-2">
                  <Image
                    src={membro.foto || "/img/user.png"}
                    width={40}
                    height={40}
                    alt={membro.nome}
                    className="user"
                  />
                  <div>
                    <h5>{membro.nome}</h5>
                    <p>{membro.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/adicionarEquipe?id=${equipe.equipeID}`}
              className={`edit ${Status.cancelado}_bg`}
            >
              <Icon name="edit" size={36} />
            </Link>
          </article>

          <CardMapa />
        </div>
        <article className="card_scroll max_height">
          <div className="scroll gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <CardLog key={index} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
