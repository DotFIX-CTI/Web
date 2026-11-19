"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface VisualizacaoContextType {
  buscaAberta: boolean;
  setBuscaAberta: React.Dispatch<React.SetStateAction<boolean>>;
  termoBusca: string;
  setTermoBusca: React.Dispatch<React.SetStateAction<string>>;
  apenasHistorico: boolean;
  setApenasHistorico: React.Dispatch<React.SetStateAction<boolean>>;
}

const VisualizacaoContext = createContext<VisualizacaoContextType | null>(null);

export function VisualizacaoProvider({ children }: { children: ReactNode }) {
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [apenasHistorico, setApenasHistorico] = useState(false);

  return (
    <VisualizacaoContext.Provider
      value={{
        buscaAberta,
        setBuscaAberta,
        termoBusca,
        setTermoBusca,
        apenasHistorico,
        setApenasHistorico,
      }}
    >
      {children}
    </VisualizacaoContext.Provider>
  );
}

export function useVisualizacao() {
  const ctx = useContext(VisualizacaoContext);
  if (!ctx) {
    throw new Error(
      "useVisualizacao deve ser usado dentro de VisualizacaoProvider",
    );
  }
  return ctx;
}
