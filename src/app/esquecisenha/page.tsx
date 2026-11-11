import Main from "@/utils/main";
import style from "./esquecisenha.module.css"
import Logo from "@/utils/logo";
import Icon from "@/utils/icon";
import ValidarEmail from "@/components/cardAutenticacao/validarEmail";

export default function esqueciSenha(){
    return(
        <Main className="main"> 
          <section className={`${style.conteudo_pagina}`}>           
              
                <div className={`${style.div_logo}`}>
                    <Logo height={100}/>
                </div> 
                
                <ValidarEmail />
                

                <button className={`${style.button_voltar}`}>
                    <a href="/login">
                        <Icon name="logout"/>
                        <h4>Voltar para o Login</h4>
                    </a>
                </button>
            </section>
        </Main>
    );
}