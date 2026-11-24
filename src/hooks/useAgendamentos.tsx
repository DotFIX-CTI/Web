import { toastErro } from "@/utils/toast";
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

function formatarMensagemErro(error: any, fallback: string): string {
  const msg = typeof error?.message === "string" ? error.message.trim() : "";

  if (!msg) return fallback;
  if (
    msg.startsWith("<!DOCTYPE") ||
    msg.startsWith("<html") ||
    msg.includes("Site Fantasma")
  ) {
    return "Rota não encontrada ou resposta inesperada do servidor.";
  }

  return msg;
}

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const payload = await listarAgendamento();
      setAgendamentos(Array.isArray(payload) ? payload : []);
    } catch (error: any) {
      const mensagem =
        error?.message && !error.message.trim().startsWith("<!DOCTYPE")
          ? error.message
          : "Erro ao carregar agendamentos.";

      setErro(mensagem);
      toastErro(mensagem);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (novoAgendamento: CriarAgendamentoPayload) => {
    try {
      setErro(null);
      const criado = await cadastrarAgendamento(novoAgendamento);
      setAgendamentos((prev) => [criado, ...prev]);
      return criado;
    } catch (error: any) {
      const mensagem = formatarMensagemErro(
        error,
        "Erro ao cadastrar agendamento.",
      );
      setErro(mensagem);
      toastErro(mensagem);
      throw new Error(mensagem);
    }
  };

  const atualizar = async (id: number, payload: AtualizarAgendamentoPayload) => {
    try {
      setErro(null);
      const atualizado = await atualizarAgendamento(id, payload);
      setAgendamentos((prev) =>
        prev.map((item) =>
          item.agendamentoID === id ? { ...item, ...atualizado } : item,
        ),
      );
      return atualizado;
    } catch (error: any) {
      const mensagem = formatarMensagemErro(
        error,
        "Erro ao atualizar agendamento.",
      );
      setErro(mensagem);
      toastErro(mensagem);
      throw new Error(mensagem);
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
      const mensagem = formatarMensagemErro(
        error,
        "Erro ao remover agendamento.",
      );
      setErro(mensagem);
      toastErro(mensagem);
      throw new Error(mensagem);
    }
  };

  return {
    agendamentos,
    carregando,
    erro,
    recarregar: carregar,
    criar,
    atualizar,
    remover,
  };
}
