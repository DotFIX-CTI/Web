import Link from "next/link";
import Icon from "@/utils/icon";
import AvatarFuncionario from "@/utils/avatarFuncionario";
import { Equipe } from "@/api/equipe";
import { resolverClasseStatusEquipe } from "@/utils/statusEquipe";
import style from "./card.module.css";

interface CardEquipeProps {
  equipe: Equipe;
}

export default function CardEquipe({ equipe }: CardEquipeProps) {
  const classeStatus = resolverClasseStatusEquipe(equipe);
  const funcionarios = equipe.funcionarios ?? [];

  return (
    <article className={`card between gap-4 ${classeStatus}`}>
      <h2>{equipe.nomeEquipe}</h2>

      <div className="flex_c gap-4">
        {funcionarios.map((funcionario) => (
          <div key={funcionario.funcionarioID} className="flex gap-2">
            <AvatarFuncionario
              funcionarioID={funcionario.funcionarioID}
              nome={funcionario.nome}
              size={32}
              className="user"
            />
            <div className="flex_c">
              <div className="center gap-1">
                <h5>{funcionario.nome}</h5>
                <Link
                  href={`/adicionarFuncionario?id=${funcionario.funcionarioID}`}
                  className={`center ${classeStatus}_icon`}
                >
                  <Icon name="edit" size={16} />
                </Link>
              </div>
              <p>{funcionario.email}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="center gap-1">
        <Icon name="local" size={20} />
        Lat: {equipe.latitude} | Long: {equipe.longitude}
      </p>

      <div className={`flex_c gap-2 ${style.action} ${classeStatus}_bg`}>
        <Link
          href={`/adicionarEquipe?id=${equipe.equipeID}`}
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
