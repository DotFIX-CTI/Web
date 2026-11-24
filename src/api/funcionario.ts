import { api } from "./api";
import { DomainException } from "./domainException";

export interface Funcionario {
  funcionarioID: number;
  nome: string;
  email: string;
  foto?: string; // Não presente na API ainda
}

// POST
export async function cadastrarFuncionario(
  dados: Omit<Funcionario, "funcionarioID">,
): Promise<Funcionario> {
  try {
    const response = await api.post<Funcionario>("Funcionario", dados);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao cadastrar Funcionario"));
  }
}

// GET (todos)
export async function listarEquipe(): Promise<Funcionario[]> {
  try {
    const response = await api.get<Funcionario[]>("Funcionario");
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao listar Equipes"));
  }
}

// GET (por ID)
export async function listarEquipePorId(
  id: string | number,
): Promise<Funcionario> {
  try {
    const response = await api.get<Funcionario>(`Funcionario/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao buscar Funcionario"));
  }
}

// PUT
export async function atualizarEquipe(
  id: number,
  dados: Partial<Funcionario>,
): Promise<Funcionario> {
  try {
    const response = await api.put<Funcionario>(`Funcionario/${id}`, dados);
    return response.data;
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao atualizar Funcionario"));
  }
}

// DELETE
export async function deletarEquipe(
  funcionarioID: string | number,
): Promise<void> {
  try {
    await api.delete(`Funcionario/${funcionarioID}`);
  } catch (error: any) {
    throw new Error(DomainException(error, "Erro ao excluir Funcionario"));
  }
}
