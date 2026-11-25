import axios from "axios";
import { toastErro } from "@/utils/toast";

function extrairErrosValidation(errors: unknown): string | null {
  if (!errors || typeof errors !== "object") return null;

  const mensagens = Object.values(errors as Record<string, unknown>)
    .flatMap((val) => (Array.isArray(val) ? val : [val]))
    .filter(
      (msg): msg is string => typeof msg === "string" && msg.trim().length > 0,
    );

  return mensagens.length > 0 ? mensagens.join(" | ") : null;
}

export const DomainException = (
  error: unknown,
  fallbackMessage = "Ocorreu um erro inesperado.",
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      if (typeof obj.mensagem === "string" && obj.mensagem.trim())
        return obj.mensagem;
      if (typeof obj.message === "string" && obj.message.trim())
        return obj.message;

      const errosValidacao = extrairErrosValidation(obj.errors);
      if (errosValidacao) return errosValidacao;

      if (typeof obj.title === "string" && obj.title.trim()) return obj.title;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallbackMessage;
};

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
