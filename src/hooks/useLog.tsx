import { useEffect, useState } from "react";
import { Agendamento, listarAgendamento } from "@/api/agendamento";
import { Erro } from "@/api/domainException";

const STATUS_CONCLUIDO_ID = 1;

function pertenceAEquipe(agendamento: Agendamento, equipeId: number): boolean {
  return agendamento.equipe?.equipeID === equipeId;
}

export function useLog(equipeId: number) {
  const idValido = Boolean(equipeId && !Number.isNaN(equipeId));

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(idValido);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!idValido) {
      return;
    }

    let cancelado = false;

    listarAgendamento()
      .then((todos) => {
        if (cancelado) return;

        const concluidosDaEquipe = todos.filter(
          (item) =>
            pertenceAEquipe(item, equipeId) &&
            item.statusAgendamento?.statusAgendamentoID === STATUS_CONCLUIDO_ID,
        );

        setAgendamentos(concluidosDaEquipe);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (cancelado) return;

        Erro("Erro ao carregar agendamentos concluídos.", error);
        setErro("Erro ao carregar agendamentos concluídos.");
      })
      .finally(() => {
        if (cancelado) return;
        setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [equipeId, idValido]);

  return {
    agendamentos: idValido ? agendamentos : [],
    carregando: idValido ? carregando : false,
    erro: idValido ? erro : null,
  };
}
