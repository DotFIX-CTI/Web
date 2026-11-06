import { Props } from "@/utils/status";
import style from "./card.module.css";

export default function CardData() {
  return (
    <article className={`card ${style.card_data} ${Props.cancelado}`}>
      <h4>01/03/2026</h4>
      <p>15:00</p>
      <p className={`${style.equipe}`}>Equipe de Redes</p>
    </article>
  );
}
