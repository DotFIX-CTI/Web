"use client";

import axios from "axios";
import { Erro } from "@/api/domainException";
import { useState, ChangeEvent } from "react";

export function useBuscarCep() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({
    estado: "",
    rua: "",
    bairro: "",
    cidade: "",
    complemento: "",
    numero: "",
  });
  const [loadingCep, setLoadingCep] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarCep(valorCep: string) {
    const cleanCep = valorCep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    setErro("");

    try {
      // Axios
      const response = await axios.get(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = response.data;

      if (data.erro) {
        Erro("CEP não encontrado.", undefined, setErro);
        return;
      }

      setEndereco((prev) => ({
        ...prev,
        estado: data.uf ? data.uf.toUpperCase() : "",
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        complemento: data.complemento || prev.complemento,
      }));
    } catch (error: unknown) {
      Erro("Erro ao consultar o CEP.", error, setErro);
    } finally {
      setLoadingCep(false);
    }
  }

  function handleCepChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    setCep(valor);
    if (erro) setErro("");

    if (valor.replace(/\D/g, "").length === 8) {
      buscarCep(valor);
    }
  }

  function handleEnderecoChange(campo: keyof typeof endereco, valor: string) {
    setEndereco((prev) => ({ ...prev, [campo]: valor }));
  }

  return {
    cep,
    endereco,
    loadingCep,
    erro,
    buscarCep,
    handleCepChange,
    handleEnderecoChange,
  };
}
