import style from "./card.module.css";

export default function CardData() {
  return (
    <article
      className={`${style.card}`}
      style={{ borderLeft: "20px solid var(--primary)" }}
    >
      <h4>01/03/2026</h4>
      <p>15:00</p>
      <p className={`${style.equipe}`}>Equipe de Redes</p>
    </article>
  );
}
