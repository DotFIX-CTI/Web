"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";

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
  const [erroCep, setErroCep] = useState("");

  async function buscarCep(valorCep: string) {
    const cleanCep = valorCep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    setErroCep("");

    try {
      // Axios
      const response = await axios.get(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = response.data;

      if (data.erro) {
        setErroCep("CEP não encontrado.");
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
    } catch (err) {
      setErroCep("Erro ao consultar o CEP.");
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
    if (erroCep) setErroCep("");

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
    erroCep,
    buscarCep,
    handleCepChange,
    handleEnderecoChange,
  };
}
