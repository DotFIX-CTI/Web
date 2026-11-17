import { Equipe } from "@/api/equipe";
import { mapaStatus, Status } from "@/utils/status";

interface CardDataProps {
  equipe: Equipe;
}
export default function CardData({ equipe }: CardDataProps) {
  const classeStatus = mapaStatus[equipe.statusEquipeID] || Status.cancelado;

  return (
    <article className={`card ${classeStatus}`} style={{ width: "100%" }}>
      <h4>01/03/2026</h4>
      <p>15:00</p>
      <h5 className="self-end">{equipe.nomeEquipe}</h5>
    </article>
  );
}
