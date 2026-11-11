import Icon from "@/utils/icon";
import Logo from "@/utils/logo";
import style from "./header.module.css";
import Button from "../button";

export default function Header() {
  return (
    <header className={`${style.header}`}>
      <Logo height={"60%"} />
      <div className="flex gap-12">
        <div className="flex gap-2">
          <Icon name="user" size={32} />
          <div className="flex_c">
            <h4 className={`${style.user}`}>Gustavo Anderson</h4>
            <p className={`${style.email}`}>Gustaz@email.com</p>
          </div>
        </div>
        <Button variant="logout" icon="logout" link="/login">
          Sair
        </Button>
      </div>
    </header>
  );
}
