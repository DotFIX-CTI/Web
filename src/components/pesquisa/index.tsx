import Icon from "@/utils/icon";
import style from "./pesquisa.module.css";

export default function Pesquisa() {
  return (
    <div className={`container ${style.pesquisa}`}>
      <input
        type="text"
        className={`${style.pesquisa_input}`}
        placeholder="Pesquisar..."
      />
      <Icon name="search" className="icon" size={20}/>
    </div>
  );
}
