import { useEffect, useState } from "react";
import { Agendamento, listarAgendamento } from "@/api/agendamento";

const STATUS_CONCLUIDO_ID = 1;

function pertenceAEquipe(agendamento: Agendamento, equipeId: number): boolean {
  return agendamento.equipe?.equipeID === equipeId;
}

export function useLog(equipeId: number) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!equipeId || Number.isNaN(equipeId)) {
      setAgendamentos([]);
      setCarregando(false);
      return;
    }

    let cancelado = false;

    async function buscar() {
      try {
        setCarregando(true);
        setErro(null);
        const todos = await listarAgendamento();

        if (!cancelado) {
          const concluidosDaEquipe = todos.filter(
            (item) =>
              pertenceAEquipe(item, equipeId) &&
              item.statusAgendamento?.statusAgendamentoID ===
                STATUS_CONCLUIDO_ID,
          );
          setAgendamentos(concluidosDaEquipe);
        }
      } catch (error: unknown) {
        if (!cancelado) {
          setErro(
            error instanceof Error
              ? error.message
              : "Erro ao carregar agendamentos concluídos.",
          );
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
  }, [equipeId]);

  return { agendamentos, carregando, erro };
}
