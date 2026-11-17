import { useEffect, useState, useCallback } from "react";
import { Equipe, listarEquipe } from "@/api/equipe";
import { toastErro } from "@/utils/toast";

export function useEquipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await listarEquipe();
      setEquipes(dados);
    } catch (error: any) {
      console.error(error);
      setErro(error.message || "Não foi possível carregar as equipes.");
      toastErro(error.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return { equipes, carregando, recarregar: carregarDados };
}
