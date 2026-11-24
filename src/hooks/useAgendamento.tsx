import { useState, useEffect } from "react";
import { Agendamento, listarAgendamentoPorId } from "@/api/agendamento";

export function useAgendamento(id: number) {
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setAgendamento(null);
      setErro("ID de agendamento inválido.");
      setCarregando(false);
      return;
    }

    let cancelado = false;

    async function buscar() {
      try {
        setCarregando(true);
        setErro(null);
        const dados = await listarAgendamentoPorId(id);
        if (!cancelado) {
          setAgendamento(dados);
        }
      } catch (error: unknown) {
        if (!cancelado) {
          const mensagem =
            error instanceof Error
              ? error.message
              : "Agendamento não encontrado.";
          setErro(mensagem);
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscar();

    return () => {
      cancelado = true;
    };
  }, [id]);

  return { agendamento, carregando, erro };
}
