import { api } from "./api";

export interface SedeEmpresa {
  sedeID: number;
  nome: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
}

export const sedeEmpresaPadrao: SedeEmpresa = {
  sedeID: 1,
  nome: "Sede Principal DotFIX",
  cep: "01310-100",
  logradouro: "Avenida Paulista",
  numero: "1000",
  bairro: "Bela Vista",
  cidade: "São Paulo",
  estado: "SP",
  latitude: -23.56491,
  longitude: -46.65198,
};

export async function obterSedeEmpresa(): Promise<SedeEmpresa> {
  try {
    const response = await api.get<SedeEmpresa>("SedeEmpresa");
    return response.data;
  } catch {
    return sedeEmpresaPadrao;
  }
}
