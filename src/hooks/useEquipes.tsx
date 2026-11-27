import { Erro } from "@/api/domainException";
import { useEffect, useState, useCallback } from "react";
import {
  Equipe,
  listarEquipe,
  cadastrarEquipe,
  atualizarEquipe,
  deletarEquipe,
  CriarEquipeDTO,
  AtualizarEquipeDTO,
} from "@/api/equipe";

export function useEquipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    listarEquipe()
      .then((dados) => {
        if (cancelado) return;
        setEquipes(dados);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        console.error(error);
        Erro("Não foi possível carregar as equipes.", error);
        setErro("Não foi possível carregar as equipes.");
      })
      .finally(() => {
        if (cancelado) return;
        setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    try {
      const dados = await listarEquipe();
      setEquipes(dados);
      return dados;
    } catch (error: unknown) {
      console.error(error);
      Erro("Não foi possível carregar as equipes.", error);
      setErro("Não foi possível carregar as equipes.");
    } finally {
      setCarregando(false);
    }
  }, []);

  const criar = async (dados: CriarEquipeDTO) => {
    try {
      setErro(null);
      const criada = await cadastrarEquipe(dados);
      setEquipes((prev) => [...prev, criada]);
      return criada;
    } catch (error: unknown) {
      Erro("Não foi possível criar uma nova equipe.", error);
      throw error;
    }
  };

  const atualizar = async (id: number, dados: AtualizarEquipeDTO) => {
    try {
      setErro(null);
      const atualizada = await atualizarEquipe(id, dados);
      setEquipes((prev) =>
        prev.map((eq) => (eq.equipeID === id ? { ...eq, ...atualizada } : eq)),
      );
      return atualizada;
    } catch (error: unknown) {
      Erro("Não foi possível atualizar a equipe.", error);
      throw error;
    }
  };

  const remover = async (id: number) => {
    try {
      setErro(null);
      await deletarEquipe(id);
      setEquipes((prev) => prev.filter((eq) => eq.equipeID !== id));
    } catch (error: unknown) {
      Erro("Não foi possível deletar essa equipe.", error);
      throw error;
    }
  };

  return {
    equipes,
    carregando,
    erro,
    recarregar,
    criar,
    atualizar,
    remover,
  };
}
