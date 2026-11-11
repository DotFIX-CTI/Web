import { Props } from "@/utils/status";

export default function CardSugestao() {
  return (
    <article className={`card_small gap-2 ${Props.default}`}>
      <div className="center between">
        <h5>01/03/2026</h5>
        <h5>15:00</h5>
      </div>
      <p className="end">Equipe de Redes</p>
    </article>
  );
}
