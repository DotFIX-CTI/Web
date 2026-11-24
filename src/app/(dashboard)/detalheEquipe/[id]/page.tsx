"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Main from "@/utils/main";
import Button from "@/components/button";
import { Equipe } from "@/api/equipe";

interface FuncionarioOpcao {
  funcionarioID: number;
  nome: string;
  email?: string;
}

export default function FormularioEquipePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const equipeId = idParam ? Number(idParam) : null;
  const isEdicao = Boolean(equipeId && !Number.isNaN(equipeId));

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState<
    number[]
  >([]);
  const [funcionariosDisponiveis, setFuncionariosDisponiveis] = useState<
    FuncionarioOpcao[]
  >([]);
  const [carregandoDados, setCarregandoDados] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Carrega lista de funcionários (ajuste para sua função real de API)
  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        // Exemplo: const lista = await listarFuncionarios();
        // setFuncionariosDisponiveis(lista);
      } catch (e) {
        console.error(e);
      }
    }
    carregarFuncionarios();
  }, []);

  // Se tiver ?id= na URL, carrega os dados da equipe para edição
  useEffect(() => {
    if (!isEdicao || !equipeId) return;

    async function carregarEquipe() {
      setCarregandoDados(true);
      setErro(null);
      try {
        // Exemplo: const equipe: Equipe = await buscarEquipePorId(equipeId);
        // setNomeEquipe(equipe.nomeEquipe ?? "");
        // setLatitude(String(equipe.latitude ?? ""));
        // setLongitude(String(equipe.longitude ?? ""));
        // setFuncionariosSelecionados(
        //   equipe.funcionarios?.map((f) => f.funcionarioID) ?? []
        // );
      } catch (e: any) {
        setErro(e?.message || "Erro ao carregar dados da equipe.");
      } finally {
        setCarregandoDados(false);
      }
    }

    carregarEquipe();
  }, [isEdicao, equipeId]);

  const toggleFuncionario = (funcionarioID: number) => {
    setFuncionariosSelecionados((prev) =>
      prev.includes(funcionarioID)
        ? prev.filter((id) => id !== funcionarioID)
        : [...prev, funcionarioID],
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!nomeEquipe.trim()) {
      setErro("Informe o nome da equipe.");
      return;
    }

    setSalvando(true);
    try {
      const payload = {
        nomeEquipe: nomeEquipe.trim(),
        latitude: latitude.trim(),
        longitude: longitude.trim(),
        // Normalmente o back-end espera IDs ou objetos conforme o DTO de criar/editar
        funcionariosIds: funcionariosSelecionados,
      };

      if (isEdicao && equipeId) {
        // await atualizarEquipe(equipeId, payload);
      } else {
        // await cadastrarEquipe(payload);
      }

      router.push("/equipes");
      router.refresh();
    } catch (e: any) {
      setErro(e?.message || "Erro ao salvar equipe.");
    } finally {
      setSalvando(false);
    }
  };

  if (carregandoDados) {
    return (
      <Main className="flex_c gap-6" justify="flex-start">
        <h1>Carregando equipe...</h1>
      </Main>
    );
  }

  return (
    <Main className="flex_c gap-6" justify="flex-start">
      <div className="flex between gap-4">
        <h1>{isEdicao ? `Editar Equipe #${equipeId}` : "Nova Equipe"}</h1>
        <Button icon="left" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>

      {erro && <p style={{ color: "var(--error)" }}>{erro}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex_c gap-4"
        style={{ maxWidth: 600 }}
      >
        <div className="flex_c gap-1">
          <label htmlFor="nomeEquipe">Nome da equipe</label>
          <input
            id="nomeEquipe"
            type="text"
            value={nomeEquipe}
            onChange={(e) => setNomeEquipe(e.target.value)}
            placeholder="Ex.: Equipe de Redes"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex_c gap-1" style={{ flex: 1 }}>
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="-23.68395"
            />
          </div>

          <div className="flex_c gap-1" style={{ flex: 1 }}>
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="-46.61802"
            />
          </div>
        </div>

        <div className="flex_c gap-2">
          <label>Funcionários da equipe</label>
          {funcionariosDisponiveis.length === 0 ? (
            <p className="small_txt">Nenhum funcionário carregado.</p>
          ) : (
            funcionariosDisponiveis.map((func) => (
              <label key={func.funcionarioID} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={funcionariosSelecionados.includes(
                    func.funcionarioID,
                  )}
                  onChange={() => toggleFuncionario(func.funcionarioID)}
                />
                <span>{func.nome}</span>
              </label>
            ))
          )}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={salvando}>
            {salvando
              ? "Salvando..."
              : isEdicao
                ? "Salvar alterações"
                : "Cadastrar equipe"}
          </button>
        </div>
      </form>
    </Main>
  );
}
