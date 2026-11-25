"use client";

import Link from "next/link";
import Button from "../button";
import Icon from "@/utils/icon";
import Logo from "@/utils/logo";
import style from "./header.module.css";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { funcionario, logout, loading } = useAuth();

  return (
    <header className={`${style.header}`}>
      <Link href="/dashboard" className={`${style.logo}`}>
        <Logo height={"60%"} color="var(--white)" />
      </Link>
      <div className="flex gap-12">
        <div className="center gap-2">
          <Icon name="user" size={32} />
          <div className="flex_c">
            <h4 className={`${style.user}`}>
              {funcionario ? funcionario.nome : "Carregando..."}
            </h4>
            <p className={`${style.email}`}>
              {funcionario ? funcionario.email : "carregando@email.com"}
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
