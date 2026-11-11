import Icon from "@/utils/icon";
import style from "./concluido.module.css"

export default function Concluido(){
    return(
        <div className={`card ${style.card_page}`}>
            <Icon name="save" size={60} color="#003F97"/>
            <h3>Senha Atualizada com Sucesso</h3>
        </div>
    );
}