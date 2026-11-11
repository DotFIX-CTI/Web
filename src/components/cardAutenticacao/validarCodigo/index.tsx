import Input from "@/components/input";
import style from "./validarCodigo.module.css"
import Button from "@/components/button";

export default function ValidarCodigo(){
    return(
        <div className={`card ${style.card_page}`}>
            <div className={`${style.div_texts}`}>
                <h2>Insira o código de recuperação recebido</h2>
                <p>O envio pode demorar até dois minutos, verifique a caixa de spam caso nao tenha recebido</p>
            </div>

            <Input label="Código" />

            <Button icon="right">
                Enviar código
            </Button>
        </div>
    );
}