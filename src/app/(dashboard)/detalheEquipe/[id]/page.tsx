"use client";

import Icon from "@/utils/icon";
import Main from "@/utils/main";
import Button from "@/components/button";
import CardMapa from "@/components/cards/cardMapa";
import CardEquipe from "@/components/cards/cardEquipe";
import { useEffect, useState } from "react";
import { Erro } from "@/api/domainException";
import { useParams, useRouter } from "next/navigation";
import { Equipe, listarEquipePorId } from "@/api/equipe";

export default function DetalheEquipePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const equipeId = Number(params?.id);
  const idValido = Boolean(equipeId && !Number.isNaN(equipeId));

  const [equipe, setEquipe] = useState<Equipe | null>(null);
  const [carregando, setCarregando] = useState(idValido);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!idValido) {
      Erro("ID da equipe inválido.");
      return;
    }

    let ativo = true;

    listarEquipePorId(equipeId)
      .then((dados: Equipe) => {
        if (!ativo) return;
        setEquipe(dados);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (!ativo) return;
        Erro("Erro ao carregar detalhes da equipe.", error);
        setErro("Erro ao carregar detalhes da equipe.");
      })
      .finally(() => {
        if (!ativo) return;
        setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [equipeId, idValido]);

  if (!idValido) {
    return (
      <Main>
        <h1>ID da equipe inválido.</h1>
      </Main>
    );
  }

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

  const statusLabel =
    (
      equipe as Equipe & {
        nomeStatus?: string;
        statusEquipe?: { nomeStatus?: string };
      }
    ).statusEquipe?.nomeStatus ??
    (equipe as Equipe & { nomeStatus?: string }).nomeStatus ??
    `Equipe #${equipe.equipeID}`;

  return (
    <Main>
      <section className="grid3 gap-12 max_width max_height">
        <div className="flex_c gap-8">
          <article className="card between gap-4 h-[100%]">
            <div className="flex_c gap-4">
              <div className="flex_c">
                <h1 className="upper">{equipe.nomeEquipe}</h1>
                <h4>{statusLabel}</h4>
              </div>

              <p>
                {equipe.enderecoAtual ||
                  "Localização atual em campo monitorada pelo GPS."}
              </p>

              {(equipe.latitude != null || equipe.longitude != null) && (
                <p className="flex gap-1 small_txt">
                  <Icon name="local" size={18} />
                  Lat: {equipe.latitude ?? "—"} | Long:{" "}
                  {equipe.longitude ?? "—"}
                </p>
              )}
            </div>

            <div className="flex between gap-4">
              <Button
                icon="left"
                variant="secondary"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Button
                icon="edit"
                variant="attention"
                link={`/adicionarEquipe?id=${equipe.equipeID}`}
              >
                Editar
              </Button>
            </div>
          </article>

          <CardEquipe equipe={equipe} />
        </div>

        <CardMapa equipe={equipe} />
      </section>
    </Main>
  );
}
