"use client";

import { FormEvent, useState } from "react";
import Main from "@/utils/main";
import Logo from "@/utils/logo";
import Button from "@/components/button";
import Loader from "@/components/loader";
import Input from "@/components/input";
import { useAuth } from "@/hooks/useAuth";
import { toastSucesso } from "@/utils/toast";

export default function Login() {
  // Navegação das telas
  // 0 = Tela de Login | 1 = Enviar Email | 2 = Inserir Código | 3 = Nova Senha
  const [step, setStep] = useState(0);
  const setaFrente = () => setStep((prev) => Math.min(prev + 1, 3));
  const setaTras = () => setStep((prev) => Math.max(prev - 1, 0));

  // LOGIN
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
                <div className="flex_c gap-1">
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

        {/* Etapa 1: Inserir Email para Recuperação */}
        {step === 1 && (
          <article className="card_login gap-4 animate-fade-in flex_c">
            <div>
              <h2>Esqueci minha senha</h2>
              <p>
                Informe seu email corporativo para receber um código de
                recuperação
              </p>
            </div>
            <Input
              icon="email"
              placeholder="email@gmail.com"
              label="Email do Colaborador"
            />
            <Button icon="send" onClick={setaFrente} fullWidth>
              Enviar código
            </Button>
          </article>
        )}

        {/* Etapa 2: Inserir Código */}
        {step === 2 && (
          <article className="card_login gap-4 animate-fade-in flex_c">
            <div>
              <h2>Insira o código de recuperação recebido</h2>

              <p>
                O envio pode demorar até dois minutos, verifique a caixa de spam
                caso nao tenha recebido
              </p>
            </div>
            <Input label="Código" code />
            <Button icon="send" onClick={setaFrente} fullWidth>
              Validar código
            </Button>
          </article>
        )}

        {/* Etapa 3: Criar Nova Senha */}
        {step === 3 && (
          <article className="card_login gap-4 animate-fade-in flex_c">
            <div>
              <h2>Crie sua nova senha</h2>

              <p>
                Sua senha deve ter ao menos 8 dígitos e pelo menos um símbolo
                (!,@,#...) e um número (1,2,3...)
              </p>
            </div>
            <Input
              label="Nova Senha"
              placeholder="*******"
              icon="password"
              password
            />
            <Input
              label="Confirmar Senha"
              placeholder="*******"
              icon="password"
              password
            />
            <Button
              icon="save"
              fullWidth
              onClick={() => {
                toastSucesso("Senha alterada com sucesso!");
                setStep(0);
              }}
            >
              Confirmar Nova Senha
            </Button>
          </article>
        )}

        {step > 0 && (
          <Button
            icon="logout"
            variant="secondary"
            onClick={setaTras}
            className="self-start"
          >
            Voltar
          </Button>
        )}
      </section>

      {Loader("login_anim")}
    </Main>
  );
}
