import Main from "@/utils/main";
import style from "./login.module.css"
import Logo from "@/utils/logo";
import Icon from "@/utils/icon";

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

                                <label>Email do Colaborador</label>
                                <div className={`${style.container_input}`}>
                                  <Icon name="email" className={`${style.icon_input}`}/>
                                  <input type="text" placeholder="********"/>
                                </div>

                            </div>
                            <div className={`${style.campo_form}`}>

                                <label>Senha de Acesso</label>
                                <div className={`${style.container_input}`}>
                                  <Icon name="password" size={22} className={`${style.icon_input}`}/>
                                  <input type="password" placeholder="*******"/>
                                </div>
                                <a href="/esquecisenha">Esqueci minha senha</a>
                            </div>
                        </div>
                        <button className={`${style.botao_entrar}`}>
                          <Icon name="team"/>
                                <img src="/Vector.svg" alt="" className="icon-entrar"/> 
                                <h3 className={`${style.text_button}`}>Entrar</h3>
                        </button>
                    </form>
                </div>
            </section>
        </Main>
    );
}