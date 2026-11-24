import { useState, useEffect, useCallback } from "react";
import {
  Agendamento,
  AtualizarAgendamentoPayload,
  CriarAgendamentoPayload,
  listarAgendamento,
  cadastrarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
} from "@/api/agendamento";
import { Erro } from "@/api/domainException";

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    listarAgendamento()
      .then((payload) => {
        if (cancelado) return;
        setAgendamentos(Array.isArray(payload) ? payload : []);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        Erro("Erro ao carregar agendamentos.", error);
        setErro("Erro ao carregar agendamentos.");
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
      const payload = await listarAgendamento();
      const lista = Array.isArray(payload) ? payload : [];
      setAgendamentos(lista);
      return lista;
    } catch (error: unknown) {
      Erro("Erro ao carregar agendamentos.", error);
      setErro("Erro ao carregar agendamentos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  const criar = async (novoAgendamento: CriarAgendamentoPayload) => {
    try {
      setErro(null);
      const criado = await cadastrarAgendamento(novoAgendamento);
      setAgendamentos((prev) => [criado, ...prev]);
      return criado;
    } catch (error: unknown) {
      Erro("Erro ao cadastrar agendamento.", error);
    }
  };

  const atualizar = async (
    id: number,
    payload: AtualizarAgendamentoPayload,
  ) => {
    try {
      setErro(null);
      const atualizado = await atualizarAgendamento(id, payload);
      setAgendamentos((prev) =>
        prev.map((item) =>
          item.agendamentoID === id ? { ...item, ...atualizado } : item,
        ),
      );
      return atualizado;
    } catch (error: unknown) {
      Erro("Erro ao atualizar agendamento.", error);
    }
  };

  const remover = async (id: number) => {
    try {
      setErro(null);
      await deletarAgendamento(String(id));
      setAgendamentos((prev) =>
        prev.filter((item) => item.agendamentoID !== id),
      );
    } catch (error: unknown) {
      Erro("Erro ao remover agendamento.", error);
    }
  };

  return {
    agendamentos,
    carregando,
    erro,
    recarregar,
    criar,
    atualizar,
    remover,
  };
}
