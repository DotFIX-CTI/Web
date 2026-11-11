import Button from "@/components/button";
import style from "./novaSenha.module.css"
import Input from "@/components/input";

export default function NovaSenha(){
    return(
        <div className={`card ${style.card_page}`}>
            <div className={`${style.div_texts}`}>
                <h2>Crie sua nova senha</h2>
                <p>Sua senha deve ter ao menos 8 dígitos e pelo menos um símbolo (!,@,#...) e um número (1,2,3...)</p>
            </div>

            <Input label="Nova Senha" placeholder="*******" icon="password" password/>
            <Input label="Confirmar Senha" placeholder="*******" icon="password" password/>

            <Button icon="save">
                Confirmar Nova Senha
            </Button>
        </div>
    );
}