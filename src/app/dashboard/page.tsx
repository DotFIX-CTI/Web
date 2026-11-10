import Main from "@/utils/main";
import style from "./dashboard.module.css";
import CardProximoAgendamento from "@/components/cardProximoAgendamento";

export default function Dashboard() {
  return (
    <Main>
      <section className={`${style.dashboard} grid gap-12`}>
        <article>Calendário</article>
        <article className={`card_scroll max_height`}>
          <div className="flex_c">
            <h2>Próximos Agendamentos...</h2>
            <hr />
          </div>
          <div className="flex_c scroll gap-4">
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
            <CardProximoAgendamento />
          </div>
        </article>
      </section>
    </Main>
  );
}
