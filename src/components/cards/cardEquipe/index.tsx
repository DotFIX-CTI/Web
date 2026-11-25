import Link from "next/link";
import Image from "next/image";
import Icon from "@/utils/icon";
import { Equipe } from "@/api/equipe";
import style from "./card.module.css";

const STATUS = {
  default: "default",
  pendente: "pendente",
  atrasado: "atrasado",
  cancelado: "cancelado",
} as const;

type ClasseStatusEquipe = (typeof STATUS)[keyof typeof STATUS];

const MAPA_STATUS_EQUIPE_POR_ID: Record<number, ClasseStatusEquipe> = {
  1: STATUS.default,
  2: STATUS.pendente,
  3: STATUS.atrasado,
  4: STATUS.cancelado,
};

const MAPA_STATUS_EQUIPE_POR_NOME: Record<string, ClasseStatusEquipe> = {
  ativo: STATUS.default,
  ativa: STATUS.default,
  disponivel: STATUS.default,
  disponível: STATUS.default,
  pendente: STATUS.pendente,
  atrasado: STATUS.atrasado,
  inativo: STATUS.cancelado,
  inativa: STATUS.cancelado,
  cancelado: STATUS.cancelado,
};

function resolverClasseStatusEquipe(equipe: Equipe): ClasseStatusEquipe {
  const eqAny = equipe as Equipe & {
    statusEquipeID?: number;
    nomeStatus?: string;
    statusEquipe?: {
      statusEquipeID?: number;
      nomeStatus?: string;
    } | null;
  };

  const statusId = eqAny.statusEquipe?.statusEquipeID ?? eqAny.statusEquipeID;
  const nomeNormalizado = (
    eqAny.statusEquipe?.nomeStatus ??
    eqAny.nomeStatus ??
    ""
  )
    .trim()
    .toLowerCase();

  return (
    (statusId !== undefined
      ? MAPA_STATUS_EQUIPE_POR_ID[statusId]
      : undefined) ??
    MAPA_STATUS_EQUIPE_POR_NOME[nomeNormalizado] ??
    STATUS.default
  );
}

interface CardEquipeProps {
  equipe: Equipe;
}

export default function CardEquipe({ equipe }: CardEquipeProps) {
  const classeStatus = resolverClasseStatusEquipe(equipe);

  return (
    <article className={`card between gap-4 ${classeStatus}`}>
      <h2>{equipe.nomeEquipe}</h2>

      <div className="flex_c gap-4">
        {equipe.funcionarios?.map((funcionario) => (
          <div key={funcionario.funcionarioID} className="flex gap-2">
            <Image
              src={funcionario.imgUrl || "/img/user.png"}
              width={32}
              height={32}
              alt={`Foto de ${funcionario.nome}`}
              className="user"
            />
            <div>
              <h5>{funcionario.nome}</h5>
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
