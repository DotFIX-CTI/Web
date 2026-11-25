"use client";

import Link from "next/link";
import Image from "next/image";
import Icon from "@/utils/icon";
import Logo from "@/utils/logo";
import Button from "@/components/button";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/api/api";
import { useEffect, useState } from "react";
import style from "./header.module.css";

export default function Header() {
  const { funcionario, logout, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const id = funcionario?.funcionarioID;

    if (!mounted || !id) {
      setImgSrc("");
      return;
    }

    let ativa = true;
    let objectUrl: string | null = null;

    api
      .get<Blob>(`Funcionario/imagem/${id}`, { responseType: "blob" })
      .then((res) => {
        if (!ativa) return;
        objectUrl = URL.createObjectURL(res.data);
        setImgSrc(objectUrl);
      })
      .catch(() => {
        if (!ativa) return;
        setImgSrc("");
      });

    return () => {
      ativa = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [mounted, funcionario?.funcionarioID]);

  const nomeExibido =
    mounted && funcionario?.nome ? funcionario.nome : "Carregando...";
  const emailExibido =
    mounted && funcionario?.email ? funcionario.email : "carregando@email.com";

  return (
    <header className={`${style.header}`}>
      <Link href="/dashboard" className={`${style.logo}`}>
        <Logo height={"60%"} color="var(--white)" />
      </Link>
      <div className="center gap-12">
        <div className="center gap-2">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={funcionario?.nome || "Avatar do funcionário"}
              width={48}
              height={48}
              unoptimized
              onError={() => setImgSrc("")}
              className="user"
            />
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
