"use client";

import Link from "next/link";
import Image from "next/image";
import Icon from "@/utils/icon";
import Main from "@/utils/main";
import CardLog from "@/components/cards/cardLog";
import CardMapa from "@/components/cards/cardMapa";
import { Status } from "@/utils/status";
import { useParams } from "next/navigation";
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
              {equipe.funcionarios?.map((funcionario) => (
                <div key={funcionario.funcionarioID} className="flex gap-2">
                  <Image
                    src={funcionario.foto || "/img/user.png"}
                    width={40}
                    height={40}
                    alt={funcionario.nome}
                    className="user"
                  />
                  <div>
                    <h5>{funcionario.nome}</h5>
                    <p>{funcionario.email}</p>
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
