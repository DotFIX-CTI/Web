import { api } from "./api";
import { DomainException } from "./domainException";

export interface TipoFuncionario {
  tipoFuncionarioID: number;
  nomeTipo: string;
}

export interface Funcionario {
  funcionarioID: number;
  nome: string;
  email: string;
  senha?: string;
  imgUrl?: string | null;
  tipoFuncionario?: TipoFuncionario | null;
}

export interface CadastrarFuncionarioInput {
  nome: string;
  email: string;
  senha: string;
  imgUrl?: string | null;
  tipoFuncionarioID?: number;
  fotoArquivo?: File | null;
}

export type AtualizarFuncionarioInput = Partial<CadastrarFuncionarioInput>;

function montarFormData(dados: CadastrarFuncionarioInput): FormData {
  const formData = new FormData();

  formData.append("nome", dados.nome);
  formData.append("email", dados.email);
  formData.append("senha", dados.senha);

  if (dados.imgUrl) {
    formData.append("imgUrl", dados.imgUrl);
  }

  if (dados.tipoFuncionarioID !== undefined) {
    formData.append("tipoFuncionarioID", String(dados.tipoFuncionarioID));
  }

  if (dados.fotoArquivo) {
    formData.append("foto", dados.fotoArquivo);
  }

  return formData;
}

// POST (multipart/form-data)
export async function cadastrarFuncionario(
  dados: CadastrarFuncionarioInput,
): Promise<Funcionario> {
  try {
    const formData = montarFormData(dados);

    const response = await api.post<Funcionario>("Funcionario", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

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
  dados: AtualizarFuncionarioInput,
): Promise<Funcionario> {
  try {
    const response = await api.put<Funcionario>(`Funcionario/${id}`, dados, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
