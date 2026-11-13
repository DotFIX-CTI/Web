import Icon from "@/utils/icon";
import Image from "next/image";
import Link from "next/link";
import style from "./card.module.css";
import { Props } from "@/utils/status";

export default function CardEquipe() {
  return (
    <article className={`card between gap-4 ${Props.cancelado}`}>
      <h2>Equipe de Redes</h2>
      <div className={`flex_c gap-4`}>
        <div className="flex gap-2">
          <Image
            src="/img/user.png"
            width={32}
            height={32}
            alt="Picture of the author"
            className="user"
          />
          <div>
            <h5>Arthur Sales</h5>
            <p>arthur@gmail.com</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Image
            src="/img/user.png"
            width={32}
            height={32}
            alt="Picture of the author"
            className="user"
          />
          <div>
            <h5>Diego Castro</h5>
            <p>diego@gmail.com</p>
          </div>
        </div>
      </div>
      <p className="center gap-1">
        <Icon name="local" size={20} />
        Av. Paulista, 1000 - 12º andar - Datacenter B
      </p>
      <div className={`flex_c gap-2 ${style.action} ${Props.cancelado}_bg`}>
        <Link href="/adicionarEquipe" className={`${style.link_icon}`}>
          <Icon name="edit" size={24} />
        </Link>
        <Link href="/detalheEquipe" className={`${style.link_icon}`}>
          <Icon name="description" size={24} />
        </Link>
      </div>
    </article>
  );
}
