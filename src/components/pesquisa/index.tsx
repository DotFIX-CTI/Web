import Icon from "@/utils/icon";
import style from "./pesquisa.module.css";

interface PesquisaProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Pesquisa({
  placeholder = "Pesquisar...",
  className = "",
  ...rest
}: PesquisaProps) {
  return (
    <div className={`container ${style.pesquisa} ${className}`}>
      <input
        type="text"
        className={style.pesquisa_input}
        placeholder={placeholder}
        {...rest}
      />
      <Icon name="search" className="icon" size={20} />
    </div>
  );
}
