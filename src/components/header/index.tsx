"use client";

import Link from "next/link";
import Image from "next/image";
import Icon from "@/utils/icon";
import Logo from "@/utils/logo";
import Button from "@/components/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import style from "./header.module.css";

export default function Header() {
  const { funcionario, logout, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nomeExibido =
    mounted && funcionario?.nome ? funcionario.nome : "Carregando...";
  const emailExibido =
    mounted && funcionario?.email ? funcionario.email : "carregando@email.com";

  return (
    <header className={`${style.header}`}>
      <Link href="/dashboard" className={`${style.logo}`}>
        <Logo height={"60%"} color="var(--white)" />
      </Link>
      <div className="flex gap-12">
        <div className="center gap-2">
          {funcionario?.imgUrl ? (
            <Image src="/img/user.png" alt={funcionario.nome}></Image>
          ) : (
            <Icon name="user" size={32} />
          )}
          <div className="flex_c">
            <h4 className={`${style.user}`}>{nomeExibido}</h4>
            <p className={`${style.email}`}>{emailExibido}</p>
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
