import Main from "@/utils/main";

export default function LoadingReagendamento() {
  return (
    <Main>
      <section className="grid gap-12 max_width">
        <article className="card between gap-6">
          <div className="flex_c gap-1">
            <div className="skeleton_text w-3/4 h-8 mb-1" />
            <div className="skeleton_text w-32 h-5 mb-2" />
            <div className="flex_c gap-1">
              <div className="skeleton_text w-full" />
              <div className="skeleton_text w-full" />
              <div className="skeleton_text w-4/5" />
            </div>
          </div>
          <div className="flex_c gap-1">
            <div className="skeleton_text w-32 h-5 mb-1" />
            <div className="flex_c gap-1">
              <div className="skeleton_text w-full" />
              <div className="skeleton_text w-2/3" />
            </div>
          </div>
          <div className="flex_c gap-4">
            <div className="skeleton_text w-40 h-6" />
            <div className="flex_c gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="skeleton_circle w-14 h-14 flex-shrink-0" />
                  <div className="flex_c gap-1 flex-1">
                    <div className="skeleton_text w-32 h-5" />
                    <div className="skeleton_text w-44" />
                  </div>
                </div>
              ))}
              <div className="skeleton_button" />
            </div>
          </div>
        </article>
        <article className="card_scroll max_height">
          <div className="skeleton w-full h-12 mb-6" />
          <div className="flex_c scroll gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-4 items-center p-4 bg-[var(--surface)]/30"
              >
                <div className="skeleton_circle w-12 h-12 flex-shrink-0" />
                <div className="flex_c gap-2 flex-1">
                  <div className="skeleton_text w-3/4 h-4" />
                  <div className="skeleton_text w-1/2 h-3" />
                </div>
                <div className="skeleton w-20 h-8" />
              </div>
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
