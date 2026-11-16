"use client"

import Main from "@/utils/main";
import CardProximoAgendamento from "@/components/cardProximoAgendamento";
import Calendario from "@/components/calendario";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { Equipe, listarEquipe } from "@/api/equipe";

export default function Dashboard() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await listarEquipe();
        setEquipes(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <Main>
      <section className={`grid gap-12 max_width`}>
        <div className="flex_c between gap-4 self-center">
          <Calendario />
          <div className="flex between">
            <Button icon="reschudule" variant="secondary" link="/reagendamento">
              Validar Reagendamentos
            </Button>
            <Button icon="add" link="/agendamento">
              Agendamento
            </Button>
          </div>
        </div>
        <article className={`card_scroll max_height`}>
          <div className="flex_c">
            <h2>Próximos Agendamentos...</h2>
            <hr />
          </div>
          <div className="flex_c scroll gap-4">
            {equipes.map((item) => (
              <CardProximoAgendamento key={item.equipeID} equipe={item} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
