import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { Usuario, usuarioTeste } from "@/api/usuario";
import { useRouter } from "next/navigation";
import { toastErro, toastSucesso } from "@/utils/toast";

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  // Verifica se já existe sessão ao carregar
  useEffect(() => {
    const tokenSalvo = secureLocalStorage.getItem("Token");
    const userSalvo = secureLocalStorage.getItem("Usuario");

    if (tokenSalvo && userSalvo) {
      setUsuario(userSalvo as Usuario);
    }
  }, []);

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
      // Simula o tempo de resposta de uma API (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Validação mockada
      if (email === usuarioTeste.email && senha === usuarioTeste.senha) {
        const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token";

        // Salva no secureLocalStorage (o interceptor do Axios lerá a chave "Token")
        secureLocalStorage.setItem("Token", fakeToken);
        secureLocalStorage.setItem("Usuario", usuarioTeste);

        setUsuario(usuarioTeste);
        router.push("/dashboard"); // Redireciona após o login
        toastSucesso("Login realizado com sucesso!");
      } else {
        throw new Error("E-mail ou senha inválidos.");
      }
    } catch (err: any) {
      setErro(err.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  }

  // LOGOUT
  function logout() {
    secureLocalStorage.removeItem("Token");
    secureLocalStorage.removeItem("Usuario");
    setUsuario(null);
    router.push("/");
  }

  return { usuario, login, logout, loading, erro };
}
