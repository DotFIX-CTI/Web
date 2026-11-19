"use client";

import Icon from "@/utils/icon";
import style from "./menubar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../button";
import { useVisualizacao } from "@/context/visualizacaoContext";

export default function Menubar() {
  const pathname = usePathname();
  const isVisualizacao = pathname === "/visualizacao";

  const {
    buscaAberta,
    setBuscaAberta,
    termoBusca,
    setTermoBusca,
    apenasHistorico,
    setApenasHistorico,
  } = useVisualizacao();

  const handleToggleBusca = () => {
    setBuscaAberta((prev) => {
      if (prev) setTermoBusca("");
      return !prev;
    });
  };

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
            <Button
              icon="log"
              noText
              onClick={() => setApenasHistorico((prev) => !prev)}
              aria-pressed={apenasHistorico}
              title={
                apenasHistorico
                  ? "Mostrar todos os agendamentos"
                  : "Ver histórico"
              }
            />
            <Button
              icon="search"
              noText
              onClick={handleToggleBusca}
              aria-pressed={buscaAberta}
              title="Pesquisar agendamentos"
            />
          </div>

          {buscaAberta && (
            <input
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Buscar por equipe ou agendamento..."
              autoFocus
            />
          )}
        </div>
      )}
    </nav>
  );
}
