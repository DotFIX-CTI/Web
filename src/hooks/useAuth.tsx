import secureLocalStorage from "react-secure-storage";
import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Erro } from "@/api/domainException";
import { Funcionario } from "@/api/funcionario";
import { toastErro, toastSucesso } from "@/utils/toast";
import { extrairFuncionarioDoToken } from "@/api/auth";

interface LoginResponse {
  token: string;
  funcionario?: Funcionario;
}

function obterSessaoInicial(): Funcionario | null {
  if (typeof window === "undefined") return null;

  const tokenSalvo = secureLocalStorage.getItem("Token");
  const userSalvo = secureLocalStorage.getItem("Funcionario");

  if (tokenSalvo && userSalvo) {
    return userSalvo as Funcionario;
  }

  return null;
}

export function useAuth() {
  const [funcionario, setFuncionario] = useState<Funcionario | null>(
    obterSessaoInicial,
  );
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (erro) {
      toastErro(erro);
    }
  }, [erro]);

  // LOGIN
  async function login(email: string, senha: string) {
    setLoading(true);
    setErro(null);

    try {
      const { data } = await api.post<LoginResponse>("/Autenticacao/login", {
        email,
        senha,
      });

      const token = data.token;
      const funcionarioLogado =
        data.funcionario ?? (token ? extrairFuncionarioDoToken(token) : null);

      if (!token || !funcionarioLogado) {
        throw new Error("Resposta de autenticação inválida do servidor.");
      }

      secureLocalStorage.setItem("Token", token);
      secureLocalStorage.setItem("Funcionario", funcionarioLogado);

      setFuncionario(funcionarioLogado);
      toastSucesso("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao realizar login.";
      Erro("Erro ao realizar login.", error);
    } finally {
      setLoading(false);
    }
  }

  // LOGOUT
  function logout() {
    secureLocalStorage.removeItem("Token");
    secureLocalStorage.removeItem("Funcionario");
    setFuncionario(null);
    router.push("/");
  }

  return { funcionario, login, logout, loading, erro };
}
