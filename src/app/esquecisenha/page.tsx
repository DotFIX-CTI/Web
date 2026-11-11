import Main from "@/utils/main";
import style from "./esquecisenha.module.css";
import Logo from "@/utils/logo";
import Button from "@/components/button";
import ValidarCodigo from "@/components/cardAutenticacao/validarCodigo";

export default function esqueciSenha() {
  return (
    <Main className="main">
      <section className={`${style.conteudo_pagina}`}>
        <div className={`${style.div_logo}`}>
          <Logo height={100} color="var(--primary)" />
        </div>

        {/* <ValidarEmail /> */}
        <ValidarCodigo />
        {/* <NovaSenha /> */}
        {/* <Concluido /> */}

        <Button
          icon="logout"
          variant="secondary"
          link="/login"
          className={`${style.button_voltar}`}
        >
          Voltar para Login
        </Button>
      </section>
    </Main>
  );
}
