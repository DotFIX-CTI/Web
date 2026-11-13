import Main from "@/utils/main";
import style from "./visualizacao.module.css";

export default function LoadingVisualizacao() {
  return (
    <Main>
      <section className={style.visualizacao}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={style.secao} key={`bloco1-${index}`}>
            <div className={`skeleton_text w-32 h-7 ${style.data}`} />
            <div className={style.scroll_secao}>
              {Array.from({ length: 5 }).map((_, cardIndex) => (
                <article
                  key={`card1-${index}-${cardIndex}`}
                  className="card gap-4"
                >
                  <div className="flex between items-center">
                    <div className="skeleton_text w-1/2 h-6" />
                    <div className="skeleton_circle w-8 h-8 flex-shrink-0" />
                  </div>
                  <div className="flex_c gap-2">
                    <div className="skeleton_text w-full" />
                    <div className="skeleton_text w-3/4" />
                  </div>
                  <div className="flex between items-center mt-2">
                    <div className="skeleton_text w-24" />
                    <div className="skeleton_button" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <div className={style.secao} key={`bloco2-${index}`}>
            <div className={`skeleton_text w-32 h-7 ${style.data}`} />
            <div className={style.scroll_secao}>
              {Array.from({ length: 2 }).map((_, cardIndex) => (
                <article
                  key={`card2-${index}-${cardIndex}`}
                  className="card gap-4"
                >
                  <div className="flex between items-center">
                    <div className="skeleton_text w-1/2 h-6" />
                    <div className="skeleton_circle w-8 h-8 flex-shrink-0" />
                  </div>
                  <div className="flex_c gap-2">
                    <div className="skeleton_text w-full" />
                    <div className="skeleton_text w-3/4" />
                  </div>
                  <div className="flex between items-center mt-2">
                    <div className="skeleton_text w-24" />
                    <div className="skeleton_button" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Main>
  );
}
