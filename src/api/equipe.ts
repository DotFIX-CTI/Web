import { api } from "./api";
import { Funcionario } from "./funcionario";
import { DomainException } from "./domainException";

export interface StatusEquipe {
  statusEquipeID: number;
  nomeStatus: string;
}

export interface Equipe {
  equipeID: number;
  nomeEquipe: string;
  imgUrl?: string | null;
  enderecoAtual?: string | null;
  statusEquipe?: StatusEquipe | null;
  funcionarios: Funcionario[];
}

// DTO - POST (alinhado com CriarEquipeDto)
export interface CriarEquipeDTO {
  nomeEquipe: string;
  statusEquipeID: number;
  funcionariosIds: number[];
  img?: File | null;
}

// DTO - PUT (alinhado com AtualizarEquipeDto)
export interface AtualizarEquipeDTO {
  nomeEquipe: string;
  statusEquipeID: number;
  funcionariosIds?: number[];
  img?: File | null;
  removerImagem?: boolean;
}

// POST
export async function cadastrarEquipe(dados: CriarEquipeDTO): Promise<Equipe> {
  try {
    const formData = new FormData();
    formData.append("NomeEquipe", dados.nomeEquipe);
    formData.append("StatusEquipeID", String(dados.statusEquipeID));

    dados.funcionariosIds.forEach((id) => {
      formData.append("FuncionariosIds", String(id));
    });

    if (dados.img) {
      formData.append("Img", dados.img);
    }

    const response = await api.post<Equipe>("Equipe", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao cadastrar Equipe"));
  }
}

// GET (todos)
export async function listarEquipe(): Promise<Equipe[]> {
  try {
    const response = await api.get<Equipe[]>("Equipe");
    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao listar Equipes"));
  }
}

// GET (por ID)
export async function listarEquipePorId(id: string | number): Promise<Equipe> {
  try {
    const response = await api.get<Equipe>(`Equipe/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao buscar Equipe"));
  }
}

// PUT
export async function atualizarEquipe(
  id: number,
  dados: AtualizarEquipeDTO,
): Promise<Equipe> {
  try {
    const formData = new FormData();
    formData.append("NomeEquipe", dados.nomeEquipe);
    formData.append("StatusEquipeID", String(dados.statusEquipeID));

    if (dados.funcionariosIds) {
      dados.funcionariosIds.forEach((funcId) => {
        formData.append("FuncionariosIds", String(funcId));
      });
    }

    if (dados.removerImagem !== undefined) {
      formData.append("RemoverImagem", String(dados.removerImagem));
    }

    if (dados.img) {
      formData.append("Img", dados.img);
    }

    const response = await api.put<Equipe>(`Equipe/${id}`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

    return response.data;
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao atualizar Equipe"));
  }
}

// DELETE
export async function deletarEquipe(equipeId: string | number): Promise<void> {
  try {
    await api.delete(`Equipe/${equipeId}`);
  } catch (error: unknown) {
    throw new Error(DomainException(error, "Erro ao excluir Equipe"));
  }
}
