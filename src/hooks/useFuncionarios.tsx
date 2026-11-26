"use client";

import { useEffect, useState } from "react";
import { Funcionario, listarFuncionarios } from "@/api/funcionario";
import { Erro } from "@/api/domainException";

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    setCarregando(true);

    listarFuncionarios()
      .then((dados) => {
        if (cancelado) return;
        setFuncionarios(Array.isArray(dados) ? dados : []);
        setErro(null);
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        Erro("Erro ao carregar os funcionários.", error);
        setErro("Erro ao carregar os funcionários.");
      })
      .finally(() => {
        if (cancelado) return;
        setCarregando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return {
    funcionarios,
    carregando,
    erro,
  };
}
