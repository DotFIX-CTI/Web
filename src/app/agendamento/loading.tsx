import Main from "@/utils/main";
import style from "./agendamento.module.css";

export default function LoadingAgendamento() {
  return (
    <Main>
      <section className={`flex max_height ${style.containerEtapas}`}>
        <article className={`card gap-8 between ${style.parte1}`}>
          <div className="flex_c gap-8">
            <div className="flex_c gap-2">
              <div>
                <div className="skeleton_text w-48 h-6 mb-2" />
                <hr />
              </div>
              <div className={`${style.grid_etapa1}`}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex_c gap-1">
                    <div className="skeleton_text w-28" />
                    <div className="skeleton w-full h-12" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex_c gap-2">
              <div>
                <div className="skeleton_text w-64 h-6 mb-2" />
                <hr />
              </div>
              <div className={`${style.grid_etapa2}`}>
                <div className="flex_c gap-4">
                  <div className="flex_c gap-1">
                    <div className="skeleton_text w-32" />
                    <div className="skeleton w-full h-12" />
                  </div>
                  <div className="flex_c gap-1">
                    <div className="skeleton_text w-24" />
                    <div className="skeleton w-full h-24" />
                  </div>
                  <div className="flex_c gap-1">
                    <div className="skeleton_text w-20" />
                    <div className="skeleton w-full h-12" />
                  </div>
                </div>

                <div className="flex_c between">
                  <div className={`${style.grid_etapa2_1}`}>
                    <div className="flex_c gap-1">
                      <div className="skeleton_text w-16" />
                      <div className="skeleton w-full h-12" />
                    </div>
                    <div className="small_txt flex_c gap-1">
                      <div className="skeleton_text w-20" />
                      <div className="skeleton_text w-full" />
                    </div>
                  </div>
                  <div className="flex_c gap-1">
                    <div className="skeleton_text w-36" />
                    <div className="skeleton w-full h-12" />
                  </div>
                  <div className={`${style.grid_etapa2_1}`}>
                    <div className="flex_c gap-1">
                      <div className="skeleton_text w-20" />
                      <div className="skeleton w-full h-12" />
                    </div>
                    <div className="flex_c gap-1">
                      <div className="skeleton_text w-20" />
                      <div className="skeleton w-full h-12" />
                    </div>
                  </div>
                  <div className={`${style.grid_etapa2_2}`}>
                    <div className="flex_c gap-1">
                      <div className="skeleton_text w-28" />
                      <div className="skeleton w-full h-12" />
                    </div>
                    <div className="flex_c gap-1">
                      <div className="skeleton_text w-20" />
                      <div className="skeleton w-full h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex between">
            <div className="skeleton skeleton_button" />
            <div className="skeleton skeleton_button" />
          </div>
        </article>
        {/* <article className={`card gap-4 between ${style.parte2}`}>
          <div>
            <div className="skeleton_text w-56 h-6 mb-2" />
            <hr />
          </div>
          <div className={`grid2 gap-8 ${style.sugestao}`}>
            <div className="flex_c between gap-4">
              <div className="flex_c gap-4">
                <div className="flex_c gap-1">
                  <div className="skeleton_text w-20" />
                  <div className="skeleton w-full h-12" />
                </div>
                <div className="flex_c gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="skeleton_circle w-8 h-8" />
                      <div className="flex_c gap-1">
                        <div className="skeleton_text w-28" />
                        <div className="skeleton_text w-36" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="skeleton w-full h-48 rounded-lg" />
            </div>
            <div className="flex_c between gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton w-full h-16 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="skeleton skeleton_button self-end" />
        </article> */}
      </section>
    </Main>
  );
}
