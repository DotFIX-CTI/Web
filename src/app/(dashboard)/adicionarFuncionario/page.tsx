"use client";

import Main from "@/utils/main";
import Input from "@/components/input";
import Button from "@/components/button";
import { Funcionario } from "@/api/funcionario";
import { useFuncionario } from "@/hooks/useFuncionario";

interface AdicionarFuncionarioProps {
  funcionario?: Funcionario | null;
  onSucesso?: (data: Funcionario) => void;
}

export default function AdicionarFuncionario({
  funcionario = null,
  onSucesso,
}: AdicionarFuncionarioProps) {
  const { isEdicao, values, setters, erro, loading, handleSubmit } =
    useFuncionario({ funcionario, onSucesso });

  return (
    <Main>
      <article className="card_login gap-4">
        <h2>{isEdicao ? "Editar Funcionário" : "Adicionar Funcionário"}</h2>

        {erro && <div className="error_mensagem">{erro}</div>}

        <form onSubmit={handleSubmit} className="flex_c gap-4">
          <div className="flex_c gap-2">
            <Input
              icon="user"
              label="Nome completo"
              type="text"
              placeholder="Nome do funcionário"
              value={values.nome}
              onChange={(e) => setters.setNome(e.target.value)}
            />

            <Input
              icon="email"
              label="E-mail"
              type="email"
              placeholder="email@email.com"
              value={values.email}
              onChange={(e) => setters.setEmail(e.target.value)}
            />

            <Input
              icon="password"
              label={isEdicao ? "Nova senha (opcional)" : "Senha"}
              placeholder="*******"
              password
              value={values.senha}
              onChange={(e) => setters.setSenha(e.target.value)}
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
    </Main>
  );
}
