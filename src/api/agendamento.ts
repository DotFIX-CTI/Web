import { api } from "./api";
import { DomainException } from "./domainException";

export interface EquipeResumo {
  equipeID: number;
  nomeEquipe: string;
}

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
  dataAgendamento: string;
  data?: string;
  latitude: string;
  longitude: string;
  statusAgendamentoID: number;
  equipeID?: number;
  equipe?: EquipeResumo[];
}

// POST
export async function cadastrarAgendamento(
  dados: Omit<Agendamento, "agendamentoID">,
): Promise<Agendamento> {
  try {
    const response = await api.post<Agendamento>("Agendamento", dados);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao cadastrar Agendamento"));
  }
}

// GET (todos)
export async function listarAgendamento(): Promise<Agendamento[]> {
  try {
    const response = await api.get<Agendamento[]>("Agendamento");
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao listar Agendamentos"));
  }
}

// GET (por ID)
export async function listarAgendamentoPorId(id: number): Promise<Agendamento> {
  try {
    const response = await api.get<Agendamento>(`Agendamento/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao buscar Agendamento"));
  }
}

// PUT
export async function atualizarAgendamento(
  id: number,
  dados: Partial<Agendamento>,
): Promise<Agendamento> {
  try {
    const response = await api.put<Agendamento>(`Agendamento/${id}`, dados);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao atualizar Agendamento"));
  }
}

// DELETE
export async function deletarAgendamento(
  agendamentoId: string | number,
): Promise<void> {
  try {
    await api.delete(`Agendamento/${agendamentoId}`);
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao excluir Agendamento"));
  }
}
