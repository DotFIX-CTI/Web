"use client";

import Icon from "@/utils/icon";
import style from "./menubar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../button";

export default function Menubar() {
  const pathname = usePathname();
  const isVisualizacao = pathname === "/visualizacao";

  return (
    <nav
      className={`${style.menubar} ${isVisualizacao ? style.menubarExtended : ""}`}
    >
      <div className={style.icons}>
        <Link
          href="/dashboard"
          className={`${style.option} ${pathname === "/dashboard" ? style.active : style.inactive}`}
        >
          <Icon name="home" />
        </Link>
        <Link
          href="/equipe"
          className={`${style.option} ${pathname === "/equipe" ? style.active : style.inactive}`}
        >
          <Icon name="team" />
        </Link>
        <Link
          href="/agendamento"
          className={`${style.option} ${pathname === "/agendamento" ? style.active : style.inactive}`}
        >
          <Icon name="add" />
        </Link>
        <Link
          href="/visualizacao"
          className={`${style.option} ${isVisualizacao ? style.active : style.inactive}`}
        >
          <Icon name="table" />
        </Link>
      </div>
      {isVisualizacao && (
        <div className={style.extraContainer}>
          <hr />
          <div className={`${style.icons} gap-2`}>
            <Button icon="log" noText />
            <Button icon="search" noText />
          </div>
        </div>
      )}
    </nav>
  );
}
