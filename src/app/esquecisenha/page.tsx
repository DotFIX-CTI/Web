import Main from "@/utils/main";
import style from "./esquecisenha.module.css"
import Logo from "@/utils/logo";
import Icon from "@/utils/icon";
import ValidarEmail from "@/components/cardAutenticacao/validarEmail";
import Button from "@/components/button";
import ValidarCodigo from "@/components/cardAutenticacao/validarCodigo";
import NovaSenha from "@/components/cardAutenticacao/novaSenha";
import Concluido from "@/components/cardAutenticacao/concluido";

export default function esqueciSenha(){
    return(
        <Main className="main"> 
          <section className={`${style.conteudo_pagina}`}>           
              
                <div className={`${style.div_logo}`}>
                    <Logo height={100} className={`${style.logogay}`}/>
                </div> 
                
                {/* <ValidarEmail /> */}
                {/* <ValidarCodigo /> */}
                {/* <NovaSenha /> */}
                <Concluido />
                
                <Button icon="logout" variant="secondary" link="/login" className={`${style.button_voltar}`}>
                    Voltar para Login
                </Button>
            </section>
        </Main>
    );
}