import Header from "@/components/header";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";
import style from "./dashboard.module.css";
import CardProximoAgendamento from "@/components/cardProximoAgendamento";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Menubar />
      <Main>
        <section className={`${style.grid}`}>
          <article>Calendário</article>
          <article className={`card_scroll ${style.proximos_agendamentos}`}>
            <div className="flex_c">
              <h2>Próximos Agendamentos...</h2>
              <hr />
            </div>
            <div className={`flex_c ${style.scroll} gap-4`}>
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
    </>
  );
}
