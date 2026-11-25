"use client";

import { useRouter } from "next/navigation";
import { Erro } from "@/api/domainException";
import { toastSucesso } from "@/utils/toast";
import { useState, FormEvent } from "react";
import {
  Funcionario,
  cadastrarFuncionario,
  atualizarFuncionario,
} from "@/api/funcionario";

interface UseFuncionarioOptions {
  funcionario?: Funcionario | null;
  onSucesso?: (data: Funcionario) => void;
}

export function useFuncionario({
  funcionario = null,
  onSucesso,
}: UseFuncionarioOptions = {}) {
  const router = useRouter();

  const isEdicao = Boolean(funcionario?.funcionarioID);

  const [nome, setNome] = useState(() => funcionario?.nome ?? "");
  const [email, setEmail] = useState(() => funcionario?.email ?? "");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim() || !email.trim()) {
      Erro("Preencha pelo menos o nome e o e-mail.", undefined);
      return;
    }

    if (!isEdicao && !senha.trim()) {
      Erro("Informe uma senha para o novo funcionário.", undefined);
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
          ? await atualizarFuncionario(
              funcionario.funcionarioID,
              payload as Partial<Funcionario>,
            )
          : await cadastrarFuncionario({
              nome: nome.trim(),
              email: email.trim(),
              senha,
            });

      onSucesso?.(resultado);
      toastSucesso("Funcionário cadastrado com sucesso!");
      router.push("/dashboard");
    } catch (error: unknown) {
      Erro("Não foi possível salvar o funcionário.", error);
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
