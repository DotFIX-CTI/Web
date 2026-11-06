import Icon from "@/utils/icon";
import CardData from "../cardData";
import style from "./card.module.css";
import Link from "next/link";

export default function CardProximoAgendamento() {
  return (
    <Link href="/detalheAgendamento" className={`flex ${style.info} gap-4`}>
      <CardData />
      <div className="between">
        <div className="flex_c">
          <h4>Jucelino Pinheiro</h4>
          <p>jucelino@gmail.com</p>
        </div>
        <div className={`flex ${style.contatos} gap-4`}>
          <Icon name="mail" size={32} />
          <Icon name="whatsapp" size={32} />
        </div>
      </div>
    </Link>
  );
}
