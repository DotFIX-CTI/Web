import { useEffect, useState, useCallback } from "react";
import {
  Equipe,
  listarEquipe,
  cadastrarEquipe,
  atualizarEquipe,
  deletarEquipe,
} from "@/api/equipe";
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

  const criar = async (dados: Omit<Equipe, "equipeID"> | Equipe) => {
    try {
      setErro(null);
      const criada = await cadastrarEquipe(dados);
      setEquipes((prev) => [...prev, criada]);
      return criada;
    } catch (error: any) {
      setErro(error.message);
      throw error;
    }
  };

  const atualizar = async (id: number, dados: Partial<Equipe>) => {
    try {
      setErro(null);
      const atualizada = await atualizarEquipe(id, dados);
      setEquipes((prev) =>
        prev.map((eq) =>
          eq.equipeID === id ? { ...eq, ...atualizada } : eq,
        ),
      );
      return atualizada;
    } catch (error: any) {
      setErro(error.message);
      throw error;
    }
  };

  const remover = async (id: number) => {
    try {
      setErro(null);
      await deletarEquipe(id);
      setEquipes((prev) => prev.filter((eq) => eq.equipeID !== id));
    } catch (error: any) {
      setErro(error.message);
      throw error;
    }
  };

  return {
    equipes,
    carregando,
    erro,
    recarregar: carregarDados,
    criar,
    atualizar,
    remover,
  };
}
