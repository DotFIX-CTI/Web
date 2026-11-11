import { Props } from "@/utils/status";

export default function CardData() {
  return (
    <article className={`card ${Props.cancelado}`} style={{ width: "100%" }}>
      <h4>01/03/2026</h4>
      <p>15:00</p>
      <h5 className="end">Equipe de Redes</h5>
    </article>
  );
}
