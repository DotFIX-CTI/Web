import { toastErro } from "@/utils/toast";
import { useEffect, useState } from "react";
import { Equipe, listarEquipePorId } from "@/api/equipe";

export function useEquipe(id: number | undefined) {
  const [equipe, setEquipe] = useState<Equipe | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      try {
        setCarregando(true);
        setErro(null);
        const dados = await listarEquipePorId(id!);
        setEquipe(dados);
      } catch (error: any) {
        console.error(error);
        setErro(error.message || "Erro ao carregar os detalhes da equipe.");
        toastErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  return { equipe, carregando, erro };
}
