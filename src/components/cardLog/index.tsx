import Icon from "@/utils/icon";
import { Props } from "@/utils/status";

export default function CardLog() {
  return (
    <article className={`card ${Props.cancelado}`} style={{ width: 640 }}>
      <h2>Organização de cabos de redes</h2>
      <div>
        <h5>Há 4 dias</h5>
        <div className={`center gap-1`}>
          <Icon name="local" size={20} />
          <p className="small_txt">
            R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690
          </p>
        </div>
      </div>
    </article>
  );
}
