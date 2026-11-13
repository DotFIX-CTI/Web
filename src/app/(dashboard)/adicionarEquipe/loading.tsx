import Main from "@/utils/main";

export default function LoadingAdicionarEquipe() {
  return (
    <Main>
      <section className="grid2 gap-8 max_width">
        <article className="card gap-8 max_height">
          <div className="skeleton_text w-48 h-8" />
          <div className="grid gap-4">
            <div className="flex_c gap-4">
              <div className="center gap-4">
                <div className="skeleton_circle w-20 h-20" />
                <div className="small_txt flex_c gap-2">
                  <div className="skeleton_text w-24" />
                  <div className="skeleton_text w-48" />
                </div>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex_c gap-1">
                  <div className="skeleton_text w-28" />
                  <div className="skeleton w-full h-12" />
                </div>
              ))}
            </div>
            <div className="flex_c gap-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex_c gap-1">
                  <div className="skeleton_text w-32" />
                  <div className="skeleton w-full h-12" />
                  <div className="flex gap-2 items-center mt-2">
                    <div className="skeleton_circle w-10 h-10" />
                    <div className="flex_c gap-1">
                      <div className="skeleton_text w-28" />
                      <div className="skeleton_text w-36" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="skeleton_button mt-4" />
        </article>
        <article className="card_scroll max_height">
          <div className="skeleton w-full h-12 rounded-full mb-6" />
          <div className="scroll gap-6 flex_c">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex gap-4 items-center p-3">
                <div className="skeleton_circle w-12 h-12" />
                <div className="flex_c gap-2 flex-1">
                  <div className="skeleton_text w-3/4" />
                  <div className="skeleton_text w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
