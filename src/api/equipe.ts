import { api } from "./api";

export interface Equipe {
  equipeID: number;
  nomeEquipe: string;
  latitude: number;
  longitude: number;
  statusEquipeID: number;
  foto?: string;
}

// TESTE
export const equipesMock: Equipe[] = [
  {
    equipeID: 1,
    nomeEquipe: "Equipe Alpha - Centro",
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
  },
  {
    equipeID: 2,
    nomeEquipe: "Equipe Bravo - Zona Sul",
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
  },
  {
    equipeID: 3,
    nomeEquipe: "Equipe Charlie - ABC",
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
  },
  {
    equipeID: 4,
    nomeEquipe: "Equipe Delta - Zona Leste",
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
  },
  {
    equipeID: 5,
    nomeEquipe: "Equipe Echo - Zona Norte",
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
  },
  {
    equipeID: 6,
    nomeEquipe: "Equipe Alpha - Centro",
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
  },
  {
    equipeID: 7,
    nomeEquipe: "Equipe Bravo - Zona Sul",
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
  },
  {
    equipeID: 8,
    nomeEquipe: "Equipe Charlie - ABC",
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
  },
  {
    equipeID: 9,
    nomeEquipe: "Equipe Delta - Zona Leste",
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
  },
  {
    equipeID: 10,
    nomeEquipe: "Equipe Echo - Zona Norte",
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
  },
  {
    equipeID: 11,
    nomeEquipe: "Equipe Alpha - Centro",
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
  },
  {
    equipeID: 12,
    nomeEquipe: "Equipe Bravo - Zona Sul",
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
  },
  {
    equipeID: 13,
    nomeEquipe: "Equipe Charlie - ABC",
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
  },
  {
    equipeID: 14,
    nomeEquipe: "Equipe Delta - Zona Leste",
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
  },
  {
    equipeID: 15,
    nomeEquipe: "Equipe Echo - Zona Norte",
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
  },
  {
    equipeID: 16,
    nomeEquipe: "Equipe Alpha - Centro",
    latitude: -23.55052,
    longitude: -46.633308,
    statusEquipeID: 1,
  },
  {
    equipeID: 17,
    nomeEquipe: "Equipe Bravo - Zona Sul",
    latitude: -23.61293,
    longitude: -46.69745,
    statusEquipeID: 2,
  },
  {
    equipeID: 18,
    nomeEquipe: "Equipe Charlie - ABC",
    latitude: -23.62291,
    longitude: -46.55482,
    statusEquipeID: 1,
  },
  {
    equipeID: 19,
    nomeEquipe: "Equipe Delta - Zona Leste",
    latitude: -23.54167,
    longitude: -46.47139,
    statusEquipeID: 3,
  },
  {
    equipeID: 20,
    nomeEquipe: "Equipe Echo - Zona Norte",
    latitude: -23.48011,
    longitude: -46.62583,
    statusEquipeID: 1,
  },
];

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
    }, 1000);
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
    }, 1000);
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
