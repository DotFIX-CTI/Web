import Main from "@/utils/main";

export default function LoadingDetalheEquipe() {
  return (
    <Main>
      <section className="flex_c gap-12 max_width">
        <div className="grid gap-12">
          <article className="card gap-4">
            <div className="center gap-4">
              <div className="skeleton_circle w-20 h-20 flex-shrink-0" />
              <div className="skeleton_text w-48 h-8" />
            </div>
            <div className="flex_c gap-4 mt-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="skeleton_circle w-12 h-12 flex-shrink-0" />
                  <div className="flex_c gap-2 flex-1">
                    <div className="skeleton_text w-32 h-4" />
                    <div className="skeleton_text w-48 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="card w-full h-72 overflow-hidden">
            <div className="skeleton w-full h-full" />
          </article>
        </div>
        <article className="card_scroll_h">
          <div className="scroll_h gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="skeleton flex-shrink-0 w-72 h-36 p-4 flex_c justify-between"
              >
                <div className="skeleton_text w-1/2 h-4" />
                <div className="flex_c gap-2">
                  <div className="skeleton_text w-full h-3" />
                  <div className="skeleton_text w-3/4 h-3" />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
