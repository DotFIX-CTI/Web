import style from "./validarEmail.module.css";
import Input from "@/components/input";
import Button from "@/components/button";

export default function ValidarEmail() {
  return (
    <div className={`card ${style.card_page}`}>
      <div className={`${style.div_texts}`}>
        <h2>Esqueci minha senha</h2>
        <p>
          Informe seu email corporativo para receber um código de recuperação
        </p>
      </div>

      <Input
        icon="email"
        placeholder="email@gmail.com"
        label="Email do Colaborador"
      />

      <Button icon="right">Enviar código</Button>
    </div>
  );
}
