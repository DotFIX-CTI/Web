import { useEffect, useState } from "react";
import { Equipe, listarEquipePorId } from "@/api/equipe";
import { Erro } from "@/api/domainException";

export function useEquipe(id?: number) {
  const idValido = typeof id === "number" && Number.isFinite(id) && id > 0;

  const [equipe, setEquipe] = useState<Equipe | null>(null);
  const [carregando, setCarregando] = useState(idValido);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!idValido) {
      return;
    }

    const equipeId = id;
    let cancelado = false;

    listarEquipePorId(equipeId)
      .then((dados) => {
        if (cancelado) return;
        setEquipe(dados);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        Erro("Erro ao carregar os detalhes da equipe.", error);
        setErro("Erro ao carregar os detalhes da equipe.");
      })
      .finally(() => {
        if (cancelado) return;
        setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [id, idValido]);

  return {
    equipe: idValido ? equipe : null,
    carregando: idValido ? carregando : false,
    erro: idValido ? erro : null,
  };
}
