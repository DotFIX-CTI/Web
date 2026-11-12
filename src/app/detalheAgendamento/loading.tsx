import Main from "@/utils/main";

export default function LoadingDetalheAgendamento() {
  return (
    <Main>
      <section className="grid gap-12 max_width">
        <div className="flex_c gap-12 max_height">
          <article className="card between gap-4">
            <div className="flex_c gap-4">
              <div className="flex_c gap-2">
                <div className="skeleton_text w-3/4 h-8" />
                <div className="skeleton_text w-32 h-5" />
              </div>
              <div className="flex_c gap-2 mt-2">
                <div className="skeleton_text w-full" />
                <div className="skeleton_text w-full" />
                <div className="skeleton_text w-4/5" />
              </div>
            </div>
            <div className="skeleton_button" />
          </article>
          <article className="card gap-4">
            <div className="center gap-4">
              <div className="skeleton_circle w-14 h-14 flex-shrink-0" />
              <div className="flex_c gap-2 flex-1">
                <div className="skeleton_text w-40 h-5" />
                <div className="skeleton_text w-28" />
              </div>
            </div>
          </article>
        </div>
        <article className="card w-full h-full min-h-72 overflow-hidden">
          <div className="skeleton w-full h-full" />
        </article>
      </section>
    </Main>
  );
}