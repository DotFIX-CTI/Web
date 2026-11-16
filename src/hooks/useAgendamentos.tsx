import { useState, useEffect, useCallback } from "react";
import {
  Agendamento,
  listarAgendamento,
  cadastrarAgendamento,
  deletarAgendamento,
} from "@/api/agendamento";
import { toastErro } from "@/utils/toast";

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await listarAgendamento();
      setAgendamentos(dados);
    } catch (error: any) {
      setErro(error.message || "Erro ao carregar agendamentos.");
      toastErro(error.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (novoAgendamento: Omit<Agendamento, "agendamentoID">) => {
    try {
      setErro(null);
      const criado = await cadastrarAgendamento(novoAgendamento as Agendamento);
      setAgendamentos((prev) => [...prev, criado]);
      return criado;
    } catch (error: any) {
      setErro(error.message);
      throw error;
    }
  };

  const remover = async (id: number) => {
    try {
      setErro(null);
      await deletarAgendamento(String(id));
      setAgendamentos((prev) =>
        prev.filter((item) => item.agendamentoID !== id),
      );
    } catch (error: any) {
      setErro(error.message);
      throw error;
    }
  };

  return {
    agendamentos,
    carregando,
    erro,
    recarregar: carregar,
    criar,
    remover,
  };
}
