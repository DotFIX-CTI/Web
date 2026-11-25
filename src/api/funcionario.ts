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
  equipeID?: number | null;
}

export interface CadastrarFuncionarioInput {
  nome: string;
  email: string;
  senha: string;
  imgUrl?: string | null;
  tipoFuncionarioID?: number | null;
  equipeID?: number | null;
  fotoArquivo?: File | null;
}

export interface AtualizarFuncionarioInput {
  nome?: string;
  email?: string;
  imgUrl?: string | null;
  tipoFuncionarioID?: number | null;
  equipeID?: number | null;
  fotoArquivo?: File | null;
  removerImagem?: boolean;
}

export function obterUrlImagem(
  url?: string | null,
  funcionarioID?: number | null,
): string {
  if (url) {
    const limpa = url.trim();
    if (
      limpa.startsWith("blob:") ||
      limpa.startsWith("data:") ||
      limpa.startsWith("http://") ||
      limpa.startsWith("https://") ||
      limpa.startsWith("/img/")
    ) {
      return limpa;
    }
  }

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "")
    .replace(/\/+$/, "")
    .replace(/\/api$/i, "");

  if (funcionarioID) {
    return baseUrl
      ? `${baseUrl}/api/Funcionario/imagem/${funcionarioID}`
      : `/api/Funcionario/imagem/${funcionarioID}`;
  }

  if (!url) return "";

  if (baseUrl) {
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return `${baseUrl}${cleanPath}`;
  }

  return url;
}

function montarFormDataCadastro(dados: CadastrarFuncionarioInput): FormData {
  const formData = new FormData();

  formData.append("Nome", dados.nome);
  formData.append("Email", dados.email);
  formData.append("Senha", dados.senha);

  if (dados.imgUrl) {
    formData.append("ImgUrl", dados.imgUrl);
  }

  if (
    dados.tipoFuncionarioID !== undefined &&
    dados.tipoFuncionarioID !== null
  ) {
    formData.append("TipoFuncionarioID", String(dados.tipoFuncionarioID));
  }

  if (dados.equipeID !== undefined && dados.equipeID !== null) {
    formData.append("EquipeID", String(dados.equipeID));
  }

  if (dados.fotoArquivo) {
    formData.append("Img", dados.fotoArquivo);
  }

  return formData;
}

function montarFormDataAtualizacao(dados: AtualizarFuncionarioInput): FormData {
  const formData = new FormData();

  if (dados.nome !== undefined) {
    formData.append("Nome", dados.nome);
  }

  if (dados.email !== undefined) {
    formData.append("Email", dados.email);
  }

  if (dados.imgUrl !== undefined && dados.imgUrl !== null) {
    formData.append("ImgUrl", dados.imgUrl);
  }

  if (
    dados.tipoFuncionarioID !== undefined &&
    dados.tipoFuncionarioID !== null
  ) {
    formData.append("TipoFuncionarioID", String(dados.tipoFuncionarioID));
  }

  if (dados.equipeID !== undefined && dados.equipeID !== null) {
    formData.append("EquipeID", String(dados.equipeID));
  }

  if (dados.removerImagem !== undefined) {
    formData.append("RemoverImagem", String(dados.removerImagem));
  }

  if (dados.fotoArquivo) {
    formData.append("Img", dados.fotoArquivo);
  }

  return formData;
}

// POST (multipart/form-data)
export async function cadastrarFuncionario(
  dados: CadastrarFuncionarioInput,
): Promise<Funcionario> {
  try {
    const formData = montarFormDataCadastro(dados);

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

// PUT (multipart/form-data)
export async function atualizarFuncionario(
  id: number,
  dados: AtualizarFuncionarioInput,
): Promise<Funcionario> {
  try {
    const formData = montarFormDataAtualizacao(dados);

    const response = await api.put<Funcionario>(`Funcionario/${id}`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao atualizar Funcionario"));
  }
}

// PATCH (senha)
export async function atualizarSenhaFuncionario(
  id: number,
  senha: string,
): Promise<void> {
  try {
    await api.patch(
      `Funcionario/senha/${id}`,
      { senha },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error: unknown) {
    throw new Error(
      DomainException(error, "Erro ao atualizar senha do funcionário"),
    );
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
