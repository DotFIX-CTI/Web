import { Props } from "@/utils/status";
import Icon from "@/utils/icon";

export default function CardReagendamento() {
  return (
    <article className={`card gap-4 ${Props.cancelado}`}>
      <div className="flex_c">
        <h3 className="upper">Link dedicado 10gbps</h3>
        <h5>Equipe de Redes</h5>
      </div>
      <div className="center gap-1 smooth_info">
        <Icon name="local" size={24} />
        <p>R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690</p>
      </div>
    </article>
  );
}
