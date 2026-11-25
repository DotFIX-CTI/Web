import { useState, useEffect } from "react";
import { Erro } from "@/api/domainException";
import { Agendamento, listarAgendamentoPorId } from "@/api/agendamento";

export function useAgendamento(id: number) {
  const idValido = Boolean(id && !Number.isNaN(id));

  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [carregando, setCarregando] = useState(idValido);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!idValido) {
      return;
    }

    let cancelado = false;

    listarAgendamentoPorId(id)
      .then((dados) => {
        if (cancelado) return;
        setAgendamento(dados);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        Erro("Agendamento não encontrado.", error);
        setErro("Agendamento não encontrado.");
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
    agendamento: idValido ? agendamento : null,
    carregando: idValido ? carregando : false,
    erro: idValido ? erro : "ID de agendamento inválido.",
  };
}
