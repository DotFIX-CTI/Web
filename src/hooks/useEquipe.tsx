import { toastErro } from "@/utils/toast";
import { useEffect, useState } from "react";
import { Equipe, listarEquipePorId } from "@/api/equipe";

export function useEquipe(id: number) {
  const [equipe, setEquipe] = useState<Equipe | undefined>(undefined);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id !== "number" || !Number.isFinite(id) || id <= 0) {
      setEquipe(undefined);
      setErro("ID de equipe inválido.");
      setCarregando(false);
      return;
    }

    let cancelado = false;

    async function carregar() {
      try {
        setCarregando(true);
        setErro(null);
        const dados = await listarEquipePorId(id);
        if (!cancelado) {
          setEquipe(dados);
        }
      } catch (error: unknown) {
        if (!cancelado) {
          const mensagem =
            error instanceof Error
              ? error.message
              : "Erro ao carregar os detalhes da equipe.";
          console.error(error);
          setErro(mensagem);
          toastErro(mensagem);
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, [id]);

  return { equipe, carregando, erro };
}
