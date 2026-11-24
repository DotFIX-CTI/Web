import { api } from "./api";
import { DomainException } from "./domainException";

export interface Funcionario {
  funcionarioID: number;
  nome: string;
  email: string;
  senha: string;
  foto?: string; // Não presente na API ainda
}

export const funcionarioTeste: Funcionario = {
  funcionarioID: 1,
  nome: "Gustavo",
  email: "gustavoanderson@gmail.com",
  senha: "123456",
};

// POST
export async function cadastrarFuncionario(
  dados: Omit<Funcionario, "funcionarioID">,
): Promise<Funcionario> {
  try {
    const response = await api.post<Funcionario>("Funcionario", dados);
    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao cadastrar Funcionario"));
  }
}

// GET (todos)
export async function listarFuncionarios(): Promise<Funcionario[]> {
  try {
    const response = await api.get<Funcionario[]>("Funcionario");
    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao listar Funcionarios"));
  }
}

// GET (por ID)
export async function listarFuncionarioPorId(
  id: string | number,
): Promise<Funcionario> {
  try {
    const response = await api.get<Funcionario>(`Funcionario/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao buscar Funcionario"));
  }
}

// PUT
export async function atualizarFuncionario(
  id: number,
  dados: Partial<Funcionario>,
): Promise<Funcionario> {
  try {
    const response = await api.put<Funcionario>(`Funcionario/${id}`, dados);
    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao atualizar Funcionario"));
  }
}

// DELETE
export async function deletarFuncionario(
  funcionarioID: string | number,
): Promise<void> {
  try {
    await api.delete(`Funcionario/${funcionarioID}`);
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao excluir Funcionario"));
  }
}
