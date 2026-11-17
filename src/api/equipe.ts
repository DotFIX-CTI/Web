import { api } from "./api";
import { equipesMock } from "./equipesMock";

export interface Membro {
  id: number;
  nome: string;
  email: string;
  foto?: string;
}

export interface Equipe {
  equipeID: number;
  nomeEquipe: string;
  latitude: number;
  longitude: number;
  statusEquipeID: number;
  foto?: string;
  membros: [Membro, Membro]; // Exige exatamente 2 membros por equipe
}

// POST
export async function cadastrarEquipe(dados: Equipe): Promise<any> {
  try {
    const response = await api.post("Equipe", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro ao cadastrar Equipe";
    throw new Error(mensagemErro);
  }
}

// GET Mock
export async function listarEquipe(): Promise<Equipe[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(equipesMock);
    });
  });
}

// GET Original
// export async function listarEquipe(): Promise<Equipe[]> {
//   try {
//     const response = await api.get<Equipe[]>("Equipe");
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data || "Erro ao listar Equipes");
//   }
// }

// GET - ID Original
export async function listarEquipePorId(id: number): Promise<Equipe> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(equipesMock[id]);
    });
  });
}

// GET - ID Original
// export async function listarEquipePorId(id: string): Promise<Equipe> {
//   try {
//     const response = await api.get<Equipe>("Equipe/" + id);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data || "Erro ao buscar Equipe");
//   }
// }

// DELETE
export async function deletarEquipe(EquipeId: string): Promise<void> {
  try {
    await api.delete("Equipe/" + EquipeId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Equipe.");
  }
}
