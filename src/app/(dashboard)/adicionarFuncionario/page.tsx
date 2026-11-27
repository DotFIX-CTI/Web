"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Main from "@/utils/main";
import Input from "@/components/input";
import Button from "@/components/button";
import InputImage from "@/components/inputImage";
import { Funcionario, listarFuncionarioPorId } from "@/api/funcionario";
import { useFuncionario } from "@/hooks/useFuncionario";
import { Erro } from "@/api/domainException";

interface AdicionarFuncionarioProps {
  funcionario?: Funcionario | null;
  onSucesso?: (data: Funcionario) => void;
}

function FormularioFuncionario({
  funcionario = null,
  onSucesso,
}: AdicionarFuncionarioProps) {
  const { isEdicao, values, setters, erro, loading, handleSubmit } =
    useFuncionario({ funcionario, onSucesso });

  return (
    <article className="card_login gap-4">
      <h2>{isEdicao ? "Editar Funcionário" : "Adicionar Funcionário"}</h2>

      {erro && <div className="error_mensagem">{erro}</div>}

      <form onSubmit={handleSubmit} className="flex_c gap-4">
        <div className="flex center gap-4">
          <InputImage
            label="Foto"
            value={values.fotoArquivo ?? values.fotoPreview}
            onChange={(file) => setters.setFoto(file)}
            onRemove={() => setters.removerFoto()}
          />
          <div className="small_txt flex_c gap-1">
            <p className="bold">Foto de perfil</p>
            <span>
              {isEdicao
                ? "Clique na imagem para alterar ou no botão acima para removê-la."
                : "Selecione uma foto de perfil para o funcionário (opcional). Formatos: PNG, JPG ou WEBP."}
            </span>
          </div>
        </div>

        <div className="flex_c gap-2">
          <Input
            icon="user"
            label="Nome completo"
            type="text"
            placeholder="Nome do funcionário"
            value={values.nome}
            onChange={(e) => setters.setNome(e.target.value)}
            required
          />

          <Input
            icon="email"
            label="E-mail"
            type="email"
            placeholder="email@email.com"
            value={values.email}
            onChange={(e) => setters.setEmail(e.target.value)}
            required
          />

          <Input
            icon="password"
            label={isEdicao ? "Nova senha (opcional)" : "Senha"}
            placeholder="*******"
            password
            value={values.senha}
            onChange={(e) => setters.setSenha(e.target.value)}
            required={!isEdicao}
          />
        </div>

        <Button icon="save" type="submit" fullWidth loading={loading}>
          {loading
            ? isEdicao
              ? "Salvando..."
              : "Cadastrando..."
            : isEdicao
              ? "Salvar alterações"
              : "Cadastrar"}
        </Button>
      </form>
    </article>
  );
}

function ConteudoAdicionarFuncionario({
  funcionario: funcionarioProp = null,
  onSucesso,
}: AdicionarFuncionarioProps) {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const idEdicao = idParam ? Number(idParam) : NaN;

  const [funcionarioCarregado, setFuncionarioCarregado] =
    useState<Funcionario | null>(null);
  const [carregandoDados, setCarregandoDados] = useState(
    () => !funcionarioProp && !Number.isNaN(idEdicao) && idEdicao > 0,
  );

  useEffect(() => {
    if (funcionarioProp || Number.isNaN(idEdicao) || idEdicao <= 0) {
      return;
    }

    let cancelado = false;
    listarFuncionarioPorId(idEdicao)
      .then((dados) => {
        if (!cancelado) {
          setFuncionarioCarregado(dados);
        }
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          Erro("Erro ao carregar dados do funcionário.", err);
        }
      })
      .finally(() => {
        if (!cancelado) {
          setCarregandoDados(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [idEdicao, funcionarioProp]);

  if (carregandoDados) {
    return (
      <Main row>
        <h1>Carregando dados do funcionário...</h1>
      </Main>
    );
  }

  const funcionarioFinal = funcionarioProp ?? funcionarioCarregado;
  const formKey = funcionarioFinal
    ? `edit-${funcionarioFinal.funcionarioID}`
    : "create";

  return (
    <Main row>
      <FormularioFuncionario
        key={formKey}
        funcionario={funcionarioFinal}
        onSucesso={onSucesso}
      />
    </Main>
  );
}

export default function AdicionarFuncionario(props: AdicionarFuncionarioProps) {
  return (
    <Suspense
      fallback={
        <Main row>
          <h1>Carregando formulário...</h1>
        </Main>
      }
    >
      <ConteudoAdicionarFuncionario {...props} />
    </Suspense>
  );
}
