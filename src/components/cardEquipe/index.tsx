import style from "./card.module.css";
import { mapaStatus, Status } from "@/utils/status";
import Icon from "@/utils/icon";
import { Equipe } from "@/api/equipe";
import Image from "next/image";
import Link from "next/link";

interface CardEquipeProps {
  equipe: Equipe;
}

export default function CardEquipe({ equipe }: CardEquipeProps) {
  const classeStatus = mapaStatus[equipe.statusEquipeID] || Status.cancelado;

  return (
    <article className={`card between gap-4 ${classeStatus}`}>
      <h2>{equipe.nomeEquipe}</h2>
      <div className="flex_c gap-4">
        <div className="flex gap-2">
          <Image
            src="/img/user.png"
            width={32}
            height={32}
            alt="Foto do membro"
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
            alt="Foto do membro"
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
        Lat: {equipe.latitude} | Long: {equipe.longitude}
      </p>

      <div className={`flex_c gap-2 ${style.action} ${classeStatus}_bg`}>
        <Link
          href={`/adicionarEquipe/${equipe.equipeID}`}
          className={style.link_icon}
        >
          <Icon name="edit" size={24} />
        </Link>
        <Link
          href={`/detalheEquipe/${equipe.equipeID}`}
          className={style.link_icon}
        >
          <Icon name="description" size={24} />
        </Link>
      </div>
    </article>
  );
}
