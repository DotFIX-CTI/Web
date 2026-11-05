"use client";

import Icon from "@/utils/icon";
import style from "./menubar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menubar() {
  const pathname = usePathname();

  return (
    <nav className={`${style.menubar}`}>
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
        href="/dashboard"
        className={`${style.option} ${pathname === "/dashboard" ? style.active : style.inactive}`}
      >
        <Icon name="home" />
      </Link>
      <Link
        href="/table"
        className={`${style.option} ${pathname === "/table" ? style.active : style.inactive}`}
      >
        <Icon name="table" />
      </Link>
    </nav>
  );
}
