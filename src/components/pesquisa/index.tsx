import Input from "@/components/input";
import style from "./pesquisa.module.css";

type PesquisaProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Pesquisa({
  placeholder = "Pesquisar...",
  className = "",
  ...rest
}: PesquisaProps) {
  return (
    <div className={`container ${style.pesquisa} ${className}`.trim()}>
      <Input
        icon="search"
        type="text"
        className={style.pesquisa_input}
        placeholder={placeholder}
        aria-label={rest["aria-label"] ?? placeholder}
        {...rest}
      />
    </div>
  );
}
