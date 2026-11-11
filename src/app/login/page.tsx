import Main from "@/utils/main";
import style from "./login.module.css"
import Logo from "@/utils/logo";
import Icon from "@/utils/icon";
import Input from "@/components/input";
import Button from "@/components/button";

export default function login(){
    return(
        <Main className="main"> 
          <section className={`${style.conteudo_pagina}`}>           
              
              <div className={`${style.div_logo}`}>
                    <Logo height={100}/>
              </div> 
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
                        <Button icon="user" >
                            Entrar
                        </Button>
                    </form>
                </div>
            </section>
        </Main>
    );
}