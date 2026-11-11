import Icon from "@/utils/icon";
import style from "./validarEmail.module.css"

export default function ValidarEmail(){
    return(
        <div className="card">
            <h1>Esqueci minha senha</h1>
            <p>Informe seu email corporativo para receber um código de recuperação</p>

            <div className={`${style.campo_form}`}>
                <label>Email do Colaborador</label>
                <div className={`${style.container_input}`}>
                    <Icon name="email" className={`${style.icon_input}`}/>
                    <input type="text" placeholder="********"/>
                </div>
            </div>
        </div>
    );
}