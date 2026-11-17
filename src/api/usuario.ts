import { api } from "./api";

export interface Usuario {
  usuarioID?: number;
  nome: string;
  email: string;
  senha?: string;
  equipeID?: number;
}

// TESTE
export const usuarioTeste: Usuario = {
  usuarioID: 1,
  nome: "Gustavo",
  email: "gustavoanderson@gmail.com",
  senha: "123456",
};

export const funcionarioMock: Usuario[] = [
  {
    usuarioID: 2,
    nome: "Arthur Sales",
    email: "arthur@gmail.com",
    equipeID: 1,
  },
  {
    usuarioID: 3,
    nome: "Diego Castro",
    email: "diego@gmail.com",
    equipeID: 1,
  },
  {
    usuarioID: 4,
    nome: "Eduardo Borges",
    email: "eduardo@gmail.com",
    equipeID: 2,
  },
  {
    usuarioID: 5,
    nome: "Guilherme Molina",
    email: "guilherme@gmail.com",
    equipeID: 2,
  },
  {
    usuarioID: 6,
    nome: "Pablo Pedroza",
    email: "pablo@gmail.com",
    equipeID: 3,
  },
];

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
export async function listarUsuarioPorId(id: number): Promise<Usuario> {
  try {
    const response = await api.get<Usuario>("Usuario/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Usuário");
  }
}

// DELETE
export async function deletarUsuario(usuarioId: number): Promise<void> {
  try {
    await api.delete("Usuario/" + usuarioId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Usuário.");
  }
}
