"use client";

import { useRouter } from "next/navigation";
import { Erro } from "@/api/domainException";
import { toastSucesso } from "@/utils/toast";
import { useState, useEffect, FormEvent } from "react";
import {
  Funcionario,
  cadastrarFuncionario,
  atualizarFuncionario,
  atualizarSenhaFuncionario,
  obterUrlImagem,
} from "@/api/funcionario";

interface UseFuncionarioOptions {
  funcionario?: Funcionario | null;
  onSucesso?: (data: Funcionario) => void;
}

function resolverPreviewInicial(
  funcionario?: Funcionario | null,
): string | null {
  if (!funcionario) return null;
  const url = obterUrlImagem(funcionario?.imgUrl, funcionario?.funcionarioID);
  return url || null;
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
  const [fotoArquivo, setFotoArquivo] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(() =>
    resolverPreviewInicial(funcionario),
  );
  const [removerFoto, setRemoverFoto] = useState(false);

  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Libera object URLs criadas localmente quando o preview mudar ou desmontar
  useEffect(() => {
    return () => {
      if (fotoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(fotoPreview);
      }
    };
  }, [fotoPreview]);

  // Sincroniza estado quando a prop funcionario mudar durante a renderização
  const [prevFuncionario, setPrevFuncionario] = useState(funcionario);
  if (prevFuncionario !== funcionario) {
    setPrevFuncionario(funcionario);
    setNome(funcionario?.nome ?? "");
    setEmail(funcionario?.email ?? "");
    setSenha("");
    setFotoArquivo(null);
    setFotoPreview(resolverPreviewInicial(funcionario));
    setRemoverFoto(false);
    setErro(null);
  }

  const setFoto = (file: File | null) => {
    if (fotoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(fotoPreview);
    }

    setFotoArquivo(file);

    if (file) {
      setFotoPreview(URL.createObjectURL(file));
      setRemoverFoto(false);
    } else {
      setFotoPreview(resolverPreviewInicial(funcionario));
    }
  };

  const handleRemoverFoto = () => {
    if (fotoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(fotoPreview);
    }

    setFotoArquivo(null);
    setFotoPreview(null);
    setRemoverFoto(true);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const nomeFormatado = nome.trim();
    const emailFormatado = email.trim();

    if (!nomeFormatado || !emailFormatado) {
      const msg = "Preencha pelo menos o nome e o e-mail.";
      setErro(msg);
      Erro(msg, undefined);
      return;
    }

    if (!isEdicao && !senha.trim()) {
      const msg = "Informe uma senha para o novo funcionário.";
      setErro(msg);
      Erro(msg, undefined);
      return;
    }

    setLoading(true);

    try {
      let resultado: Funcionario;

      if (isEdicao && funcionario?.funcionarioID) {
        resultado = await atualizarFuncionario(funcionario.funcionarioID, {
          nome: nomeFormatado,
          email: emailFormatado,
          fotoArquivo,
          removerImagem: removerFoto,
        });

        if (senha.trim()) {
          await atualizarSenhaFuncionario(
            funcionario.funcionarioID,
            senha.trim(),
          );
        }

        toastSucesso("Funcionário atualizado com sucesso!");
      } else {
        resultado = await cadastrarFuncionario({
          nome: nomeFormatado,
          email: emailFormatado,
          senha,
          fotoArquivo,
        });

        toastSucesso("Funcionário cadastrado com sucesso!");
      }

      onSucesso?.(resultado);
      router.push("/equipe");
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o funcionário.";
      setErro(msg);
      Erro("Não foi possível salvar o funcionário.", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    isEdicao,
    values: {
      nome,
      email,
      senha,
      fotoArquivo,
      fotoPreview,
      removerFoto,
    },
    setters: {
      setNome,
      setEmail,
      setSenha,
      setFoto,
      removerFoto: handleRemoverFoto,
    },
    erro,
    loading,
    handleSubmit,
  };
}
