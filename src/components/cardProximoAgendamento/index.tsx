import Icon from "@/utils/icon";
import CardData from "../cardData";
import style from "./card.module.css";

export default function CardProximoAgendamento() {
  return (
    <article className={`flex ${style.info}`}>
      <CardData />
      <div className="between">
        <div className="flex_c">
          <h4>Jucelino Pinheiro</h4>
          <p>jucelino@gmail.com</p>
        </div>
        <div className={`flex ${style.contatos}`}>
          <Icon name="mail" size={32}/>
          <Icon name="whatsapp" size={32}/>
        </div>
      </div>
    </article>
  );
}
