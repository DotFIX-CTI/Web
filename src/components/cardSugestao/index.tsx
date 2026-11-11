import { Props } from "@/utils/status";

export default function CardSugestao() {
  return (
    <article className={`card_small gap-2 ${Props.default}`}>
      <div className="center between">
        <h4>01/03/2026</h4>
        <h5>15:00</h5>
      </div>
      <h5 className="end">Equipe de Redes</h5>
    </article>
  );
}
