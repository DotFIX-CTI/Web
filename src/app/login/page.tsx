"use client";

import { FormEvent, useState } from "react";
import Main from "@/utils/main";
import Logo from "@/utils/logo";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Input from "@/components/input";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { login, loading, erro } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await login(email, senha);
  }

  return (
    <Main patternOpacity={0.05}>
      <section className="center_c gap-8 relative z-1">
        <Logo height={100} color="var(--primary)" />

        {step === 0 && (
          <div className="center_c">
            <h2>Acesse sua conta</h2>
            <p>Entre com suas credenciais corporativas</p>
          </div>
        )}

        {/* Etapa 0: Tela de Login */}
        {step === 0 && (
          <article className="card_login gap-4">
            {erro && <div className="error_mensagem">{erro}</div>}
            <form onSubmit={handleSubmit} className="flex_c gap-4">
              <div className="flex_c gap-2">
                <Input
                  icon="email"
                  label="E-mail"
                  type="email"
                  placeholder="email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex_c">
                  <Input
                    icon="password"
                    label="Senha"
                    placeholder="*******"
                    password
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="small_txt self-end cursor-pointer mt-1"
                    style={{
                      color: "var(--primary)",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>

              <Button icon="login" type="submit" fullWidth loading={loading}>
                {loading ? "Entrando..." : "Acessar"}
              </Button>
            </form>
          </article>
        )}

        {/* Demais etapas continuam iguais... */}
      </section>
      {Loader("login_anim")}
    </Main>
  );
}
