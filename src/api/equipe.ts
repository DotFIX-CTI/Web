import { api } from "./api";
import { DomainException } from "./domainException";

export interface Funcionario {
  funcionarioID: number;
  nome: string;
  email: string;
  foto?: string; // Não presente na API ainda
}

export interface Equipe {
  equipeID: number;
  nomeEquipe: string;
  latitude: number;
  longitude: number;
  statusEquipeID: number;
  nomeStatus: string;
  enderecoAtual: string;
  funcionarios: [Funcionario, Funcionario]; // Exige exatamente 2 membros por equipe
  foto?: string; // Não presente na API ainda
}

// POST
export async function cadastrarEquipe(
  dados: Omit<Equipe, "equipeID">,
): Promise<Equipe> {
  try {
    const response = await api.post<Equipe>("Equipe", dados);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao cadastrar Equipe"));
  }
}

// GET (todos)
export async function listarEquipe(): Promise<Equipe[]> {
  try {
    const response = await api.get<Equipe[]>("Equipe");
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao listar Equipes"));
  }
}

// GET (por ID)
export async function listarEquipePorId(id: string | number): Promise<Equipe> {
  try {
    const response = await api.get<Equipe>(`Equipe/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao buscar Equipe"));
  }
}

// PUT
export async function atualizarEquipe(
  id: number,
  dados: Partial<Equipe>,
): Promise<Equipe> {
  try {
    const response = await api.put<Equipe>(`Equipe/${id}`, dados);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao atualizar Equipe"));
  }
}

// DELETE
export async function deletarEquipe(equipeId: string | number): Promise<void> {
  try {
    await api.delete(`Equipe/${equipeId}`);
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao excluir Equipe"));
  }
}
