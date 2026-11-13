import Main from "@/utils/main";

export default function LoadingDashboard() {
  return (
    <Main>
      <section className={`grid gap-12 max_width max_height`}>
        <article className="card gap-12 center_c between">
          <div className="center between w-full">
            <div className="skeleton w-12 h-12 rounded-md" />
            <div className="flex gap-2 items-baseline">
              <div className="skeleton_text w-36 h-10" />
              <div className="skeleton_text w-16 h-6" />
            </div>
            <div className="skeleton w-12 h-12 rounded-md" />
          </div>
          <div className="flex justify-between w-full gap-4">
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div key={colIndex} className="flex_c gap-4 flex-1 items-center">
                <div className="skeleton_text w-8 h-6" />
                <div className="flex_c gap-2 w-full">
                  {Array.from({ length: 6 }).map((_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="skeleton w-full h-10 rounded-md"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className={`card_scroll h-full`}>
          <div className="flex_c mb-4">
            <div className="skeleton_text w-64 h-6 mb-2" />
            <hr />
          </div>
          <div className="flex_c scroll gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-4 items-center p-4 bg-[var(--surface)]/30 rounded-2xl"
              >
                <div className="skeleton_circle w-12 h-12 flex-shrink-0" />
                <div className="flex_c gap-2 flex-1">
                  <div className="skeleton_text w-3/4 h-4" />
                  <div className="skeleton_text w-1/2 h-3" />
                </div>
                <div className="skeleton w-20 h-8 rounded-md" />
              </div>
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
