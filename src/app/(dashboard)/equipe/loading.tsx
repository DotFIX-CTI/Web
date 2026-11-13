import Main from "@/utils/main";
import style from "./equipe.module.css";

export default function LoadingEquipe() {
  return (
    <Main className={`flex_c gap-4 ${style.container}`}>
      <div className={`center between ${style.info}`}>
        <div className="skeleton_text w-64 h-8" />
        <div className="skeleton_button" />
      </div>
      <section className={`${style.grid_equipe} gap-12`}>
        {Array.from({ length: 9 }).map((_, index) => (
          <article key={index} className="card gap-4">
            <div className="center gap-4">
              <div className="skeleton_circle w-14 h-14 flex-shrink-0" />
              <div className="flex_c gap-2 flex-1">
                <div className="skeleton_text w-40 h-5" />
                <div className="skeleton_text w-28" />
              </div>
            </div>
          </article>
        ))}
      </section>
    </Main>
  );
}
