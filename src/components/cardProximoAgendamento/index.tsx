import Icon from "@/utils/icon";
import CardData from "../cardData";
import style from "./card.module.css";
import Link from "next/link";
import Button from "../button";

export default function CardProximoAgendamento() {
  const email = true;
  const number = true;

  return (
    <>
      <article className="center between">
        <Link href="/detalheAgendamento" className={`flex gap-4 ${style.info}`}>
          <CardData />
          <div className="flex_c">
            <h4>Jucelino Pinheiro</h4>
            <p>jucelino@gmail.com</p>
          </div>
        </Link>
        {(email || number) && (
          <div className={`flex ${style.contatos} gap-2`}>
            {email && <Button icon="mail" noText />}
            {number && <Button icon="whatsapp" noText />}
          </div>
        )}
      </article>
    </>
  );
}
