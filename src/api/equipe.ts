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
export async function cadastrarEquipe(
  dados: Omit<Equipe, "equipeID"> | Equipe,
): Promise<Equipe> {
  try {
    const response = await api.post("Equipe", dados);
    return response.data;
  } catch {
    const novoID =
      equipesMock.length > 0
        ? Math.max(...equipesMock.map((e) => e.equipeID)) + 1
        : 1;
    const novaEquipe: Equipe = {
      ...(dados as Equipe),
      equipeID:
        "equipeID" in dados && dados.equipeID ? dados.equipeID : novoID,
      latitude: dados.latitude ?? -23.55052,
      longitude: dados.longitude ?? -46.633308,
      statusEquipeID: dados.statusEquipeID ?? 1,
    };
    equipesMock.push(novaEquipe);
    return novaEquipe;
  }
}

// GET Mock
export async function listarEquipe(): Promise<Equipe[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...equipesMock]);
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

// GET - ID Mockado
export async function listarEquipePorId(id: number): Promise<Equipe> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = equipesMock.find((e) => e.equipeID === id);
      if (item) {
        resolve(item);
      } else {
        reject(new Error("Equipe não encontrada."));
      }
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

// PUT
export async function atualizarEquipe(
  id: number,
  dados: Partial<Equipe>,
): Promise<Equipe> {
  try {
    const response = await api.put(`Equipe/${id}`, dados);
    return response.data;
  } catch {
    const index = equipesMock.findIndex((e) => e.equipeID === id);
    if (index !== -1) {
      equipesMock[index] = { ...equipesMock[index], ...dados };
      return equipesMock[index];
    }
    throw new Error("Equipe não encontrada para atualização.");
  }
}

// DELETE
export async function deletarEquipe(
  EquipeId: string | number,
): Promise<void> {
  try {
    await api.delete("Equipe/" + EquipeId);
  } catch {
    const idNum = Number(EquipeId);
    const index = equipesMock.findIndex((e) => e.equipeID === idNum);
    if (index !== -1) {
      equipesMock.splice(index, 1);
    }
  }
}
