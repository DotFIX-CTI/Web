import Main from "@/utils/main";
import CardProximoAgendamento from "@/components/cardProximoAgendamento";
import Calendario from "@/components/calendario";

export default function Dashboard() {
  return (
    <Main>
      <section className={`grid gap-12 max_width`}>
        <Calendario className="min_height" />
        <article className={`card_scroll max_height`}>
          <div className="flex_c">
            <h2>Próximos Agendamentos...</h2>
            <hr />
          </div>
          <div className="flex_c scroll gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardProximoAgendamento key={index} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
