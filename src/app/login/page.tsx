import Main from "@/utils/main";
import style from "./login.module.css";
import Logo from "@/utils/logo";
import Input from "@/components/input";
import Button from "@/components/button";

export default function login() {
  return (
    <Main>
      <section className={`${style.conteudo_pagina}`}>
        <Logo height={100} color="var(--primary)" />
        <div className={`${style.div_textos}`}>
          <h2>Acesse sua conta</h2>
          <p>Entre com suas credenciais corporativas</p>
        </div>

        <div className={`card ${style.section_login}`}>
          <form action="" className={`${style.form}`}>
            <div className={`${style.div_inputs}`}>
              <div className={`${style.campo_form}`}>
                <Input
                  icon="email"
                  label="E-mail"
                  placeholder="email@email.com"
                />
              </div>
              <div className={`${style.campo_form}`}>
                <Input
                  icon="password"
                  label="Senha"
                  placeholder="*******"
                  password
                />
                <a href="/esquecisenha">Esqueci minha senha</a>
              </div>
            </div>
            <Button icon="login" fullWidth>
              Entrar
            </Button>
          </form>
        </div>
      </section>
    </Main>
  );
}
