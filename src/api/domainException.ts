import { toastErro } from "@/utils/toast";
import axios from "axios";

export const DomainException = (
  error: unknown,
  fallbackMessage = "Ocorreu um erro inesperado.",
): string => {
  // 1. Tratamento específico para erros do Axios
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) return data;
    if (data?.message) return String(data.message);
    if (data?.title) return String(data.title);
  }

  // 2. Tratamento para instâncias padrão de Error
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  // 3. Tratamento caso uma string pura tenha sido lançada
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  // 4. Mensagem padrão caso nenhuma anterior se aplique
  return fallbackMessage;
};

// Tratativa mais fácil de Erro
export const Erro = (
  fallback: string,
  error?: unknown,
  setErro?: (mensagem: string) => void,
): string => {
  const mensagem =
    error !== undefined ? DomainException(error, fallback) : fallback;

  toastErro(mensagem);
  setErro?.(mensagem);

  return mensagem;
};
