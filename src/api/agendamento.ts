import { agendamentosMock } from "./agendamentosMock";
import { api } from "./api";

export interface Agendamento {
  agendamentoID: number;
  nomeCliente: string;
  emailCliente?: string;
  telefoneCliente?: string;
  nomeServico: string;
  descricao?: string;
  cep?: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
  numero: string;
  data: string;
  latitude: string;
  longitude: string;
  statusAgendamentoID: number;
  equipeID: number;
}

// POST
export async function cadastrarAgendamento(
  dados: Omit<Agendamento, "agendamentoID"> | Agendamento,
): Promise<Agendamento> {
  try {
    const response = await api.post("Agendamento", dados);
    return response.data;
  } catch {
    const novoID =
      agendamentosMock.length > 0
        ? Math.max(...agendamentosMock.map((a) => a.agendamentoID)) + 1
        : 1;
    const novo: Agendamento = {
      ...(dados as Agendamento),
      agendamentoID:
        "agendamentoID" in dados && dados.agendamentoID
          ? dados.agendamentoID
          : novoID,
    };
    agendamentosMock.unshift(novo);
    return novo;
  }
}

// GET Mockado
export async function listarAgendamento(): Promise<Agendamento[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...agendamentosMock]);
    });
  });
}

// GET Original
// export async function listarAgendamento(): Promise<Agendamento[]> {
//   try {
//     const response = await api.get<Agendamento[]>("Agendamento");
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data || "Erro ao listar Agendamentos");
//   }
// }

// GET - ID Mockado
export async function listarAgendamentoPorId(id: number): Promise<Agendamento> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = agendamentosMock.find((a) => a.agendamentoID === id);
      if (item) {
        resolve(item);
      } else {
        reject(new Error("Agendamento não encontrado."));
      }
    });
  });
}

// GET - ID Original
// export async function listarAgendamentoPorId(id: string): Promise<Agendamento> {
//   try {
//     const response = await api.get<Agendamento>("Agendamento/" + id);
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response?.data || "Erro ao buscar Agendamento");
//   }
// }

// PUT
export async function atualizarAgendamento(
  id: number,
  dados: Partial<Agendamento>,
): Promise<Agendamento> {
  try {
    const response = await api.put(`Agendamento/${id}`, dados);
    return response.data;
  } catch {
    const index = agendamentosMock.findIndex((a) => a.agendamentoID === id);
    if (index !== -1) {
      agendamentosMock[index] = { ...agendamentosMock[index], ...dados };
      return agendamentosMock[index];
    }
    throw new Error("Agendamento não encontrado para atualização.");
  }
}

// DELETE
export async function deletarAgendamento(
  AgendamentoId: string | number,
): Promise<void> {
  try {
    await api.delete("Agendamento/" + AgendamentoId);
  } catch {
    const idNum = Number(AgendamentoId);
    const index = agendamentosMock.findIndex((a) => a.agendamentoID === idNum);
    if (index !== -1) {
      agendamentosMock.splice(index, 1);
    }
  }
}
