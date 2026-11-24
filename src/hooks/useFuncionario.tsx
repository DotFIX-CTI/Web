"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Funcionario,
  cadastrarFuncionario,
  atualizarEquipe,
} from "@/api/funcionario";

interface UseFuncionarioOptions {
  funcionario?: Funcionario | null;
  onSucesso?: (data: Funcionario) => void;
}

export function useFuncionario({
  funcionario = null,
  onSucesso,
}: UseFuncionarioOptions = {}) {
  const isEdicao = Boolean(funcionario?.funcionarioID);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.nome ?? "");
      setEmail(funcionario.email ?? "");
      setSenha("");
    } else {
      setNome("");
      setEmail("");
      setSenha("");
    }
    setErro(null);
  }, [funcionario]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim() || !email.trim()) {
      setErro("Preencha pelo menos o nome e o e-mail.");
      return;
    }

    if (!isEdicao && !senha.trim()) {
      setErro("Informe uma senha para o novo funcionário.");
      return;
    }

    setLoading(true);

    try {
      const payload: Record<string, unknown> = {
        nome: nome.trim(),
        email: email.trim(),
      };

      if (senha.trim()) {
        payload.senha = senha;
      }

      const resultado =
        isEdicao && funcionario?.funcionarioID
          ? await atualizarEquipe(
              funcionario.funcionarioID,
              payload as Partial<Funcionario>,
            )
          : await cadastrarFuncionario(
              payload as Omit<Funcionario, "funcionarioID">,
            );

      onSucesso?.(resultado);
    } catch (error: any) {
      setErro(error?.message || "Não foi possível salvar o funcionário.");
    } finally {
      setLoading(false);
    }
  }

  return {
    isEdicao,
    values: { nome, email, senha },
    setters: { setNome, setEmail, setSenha },
    erro,
    loading,
    handleSubmit,
  };
}
