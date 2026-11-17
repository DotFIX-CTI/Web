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
  equipeID: number;
  statusAgendamentoID: number;
}

// POST
export async function cadastrarAgendamento(dados: Agendamento): Promise<any> {
  try {
    const response = await api.post("Agendamento", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro ao cadastrar Agendamento";
    throw new Error(mensagemErro);
  }
}

// GET Mockado
export async function listarAgendamento(): Promise<Agendamento[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(agendamentosMock);
    }, 1000);
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
export async function listarEquipePorId(id: number): Promise<Agendamento> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(agendamentosMock[id]);
    }, 1000);
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

// DELETE
export async function deletarAgendamento(AgendamentoId: string): Promise<void> {
  try {
    await api.delete("Agendamento/" + AgendamentoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Agendamento.");
  }
}
