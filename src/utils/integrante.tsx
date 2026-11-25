import Image from "next/image";
import { Funcionario } from "@/api/funcionario";

interface IntegranteProps {
  funcionario: Funcionario;
  onSelect?: (funcionario: Funcionario) => void;
}

export default function Integrante({ funcionario, onSelect }: IntegranteProps) {
  return (
    <div
      className="flex between center"
      onClick={() => onSelect?.(funcionario)}
      style={onSelect ? { cursor: "pointer" } : undefined}
    >
      <div className="flex center gap-2">
        <Image
          src={funcionario.imgUrl || "/img/user.png"}
          width={40}
          height={40}
          alt={`Foto de ${funcionario.nome}`}
          className="user"
        />
        <div>
          <h5>{funcionario.nome}</h5>
          <p>{funcionario.email}</p>
        </div>
      </div>
    </div>
  );
}
