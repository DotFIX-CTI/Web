"use client";

import Icon from "@/utils/icon";
import Logo from "@/utils/logo";
import style from "./header.module.css";
import Button from "../button";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { usuario, logout, loading } = useAuth();

  return (
    <header className={`${style.header}`}>
      <Logo height={"60%"} color="var(--white)" />
      <div className="flex gap-12">
        <div className="center gap-2">
          <Icon name="user" size={32} />
          <div className="flex_c">
            <h4 className={`${style.user}`}>
              {usuario ? usuario.nome : "Carregando..."}
            </h4>
            <p className={`${style.email}`}>
              {usuario ? usuario.email : "carregando@email.com"}
            </p>
          </div>
        </div>

        <Button
          variant="logout"
          icon="logout"
          onClick={logout}
          loading={loading}
        >
          Sair
        </Button>
      </div>
    </header>
  );
}
