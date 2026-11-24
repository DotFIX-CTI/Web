import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Erro } from "@/api/domainException";
import { Funcionario, funcionarioTeste } from "@/api/funcionario";
import { toastErro, toastSucesso } from "@/utils/toast";

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

  // LOGIN - Mockado
  async function login(email: string, senha: string) {
    setLoading(true);
    setErro(null);

    try {
      // Simula o tempo de resposta de uma API (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Validação mockada
      if (
        email === funcionarioTeste.email &&
        senha === funcionarioTeste.senha
      ) {
        const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token";

        // Salva no secureLocalStorage (o interceptor do Axios lerá a chave "Token")
        secureLocalStorage.setItem("Token", fakeToken);
        secureLocalStorage.setItem("Funcionario", funcionarioTeste);

        setFuncionario(funcionarioTeste);
        router.push("/dashboard");
        toastSucesso("Login realizado com sucesso!");
      } else {
        throw new Error("E-mail ou senha inválidos.");
      }
    } catch (error: unknown) {
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
