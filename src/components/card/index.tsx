import Icon from "@/utils/icon";
import { Props } from "@/utils/status";

export default function Card() {
  return (
    <article
      className={`card flex_c gap-2 between ${Props.cancelado}`}
      style={{ width: 400, minHeight: 240 }}
    >
      <h3 className="upper">Link dedicado 10gbps</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus
        sit amet tellus facilisis consectetur. Proin vel mollis urna. Fusce
        mollis dignissim luctus. Morbi convallis libero vitae venenatis rutrum.
      </p>
      <div className="flex_c gap-2">
        <h5>Equipe de Redes</h5>
        <div className="center gap-1 smooth_info">
          <Icon name="local" size={24} />
          <p>R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690</p>
        </div>
      </div>
    </article>
  );
}
