import { api } from "./api";

export interface Usuario {
  usuarioID?: string;
  nome: string;
  email: string;
  senha?: string;
}

export const usuarioTeste: Usuario = {
  usuarioID: "1",
  nome: "Gustavo",
  email: "a@a",
  senha: "a",
};

// POST
export async function cadastrarUsuario(dados: Usuario): Promise<any> {
  try {
    const response = await api.post("Usuario", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro ao cadastrar Usuário";
    throw new Error(mensagemErro);
  }
}

// GET
export async function listarUsuario(): Promise<Usuario[]> {
  try {
    const response = await api.get<Usuario[]>("Usuario");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao listar Usuários");
  }
}

// GET - ID
export async function listarUsuarioPorId(id: string): Promise<Usuario> {
  try {
    const response = await api.get<Usuario>("Usuario/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Usuário");
  }
}

// DELETE
export async function deletarUsuario(usuarioId: string): Promise<void> {
  try {
    await api.delete("Usuario/" + usuarioId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Usuário.");
  }
}
