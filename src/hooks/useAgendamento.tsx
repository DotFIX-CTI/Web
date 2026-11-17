import { useState, useEffect } from "react";
import { Agendamento, listarAgendamentoPorId } from "@/api/agendamento";

export function useAgendamento(id: number | undefined) {
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCarregando(false);
      return;
    }

    async function buscar() {
      try {
        setCarregando(true);
        setErro(null);
        const dados = await listarAgendamentoPorId(id!);
        setAgendamento(dados);
      } catch (error: any) {
        setErro(error.message || "Agendamento não encontrado.");
      } finally {
        setCarregando(false);
      }
    }

    buscar();
  }, [id]);

  return { agendamento, carregando, erro };
}
