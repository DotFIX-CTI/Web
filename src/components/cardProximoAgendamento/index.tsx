import Icon from "@/utils/icon";
import CardData from "../cardData";
import style from "./card.module.css";
import Link from "next/link";

export default function CardProximoAgendamento() {
  const email = true;
  const number = true;

  return (
    <Link href="/detalheAgendamento" className={`flex gap-4 ${style.info}`}>
      <CardData />
      <div className="between">
        <div className="flex_c">
          <h4>Jucelino Pinheiro</h4>
          <p>jucelino@gmail.com</p>
        </div>
        {(email || number) && (
          <div className={`flex ${style.contatos} gap-4`}>
            {email && <Icon name="mail" size={32} />}
            {number && <Icon name="whatsapp" size={32} />}
          </div>
        )}
      </div>
    </Link>
  );
}
