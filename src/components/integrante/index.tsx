import Image from "next/image";
import { Membro } from "@/api/equipe";

interface IntegranteProps {
  membro: Membro;
  onSelect?: (membro: Membro) => void;
}

export default function Integrante({ membro, onSelect }: IntegranteProps) {
  return (
    <div
      className="flex between center"
      onClick={() => onSelect?.(membro)}
      style={onSelect ? { cursor: "pointer" } : undefined}
    >
      <div className="flex center gap-2">
        <Image
          src={membro.foto || "/img/user.png"}
          width={40}
          height={40}
          alt={`Foto de ${membro.nome}`}
          className="user"
        />
        <div>
          <h5>{membro.nome}</h5>
          <p>{membro.email}</p>
        </div>
      </div>
    </div>
  );
}
