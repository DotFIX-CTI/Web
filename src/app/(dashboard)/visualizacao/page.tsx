import Main from "@/utils/main";
import style from "./visualizacao.module.css";
import Card from "@/components/card";

export default function Visualizacao() {
  return (
    <Main>
      <section className={style.visualizacao}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={style.secao} key={`bloco1-${index}`}>
            <h2 className={style.data}>03/05/25</h2>
            <div className={style.scroll_secao}>
              {Array.from({ length: 5 }).map((_, cardIndex) => (
                <Card key={`card1-${index}-${cardIndex}`} />
              ))}
            </div>
          </div>
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={style.secao} key={`bloco2-${index}`}>
            <h2 className={style.data}>03/02/26</h2>
            <div className={style.scroll_secao}>
              {Array.from({ length: 2 }).map((_, cardIndex) => (
                <Card key={`card2-${index}-${cardIndex}`} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </Main>
  );
}
