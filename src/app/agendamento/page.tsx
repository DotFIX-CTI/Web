"use client";

import Header from "@/components/header";
import Input from "@/components/input";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";
import style from "./agendamento.module.css";
import { useState } from "react";
import Button from "@/components/button";

export default function Agendamento() {
  const [fase, setFase] = useState(false);

  const alternarFase = () => {
    setFase((faseAnterior) => !faseAnterior);
  };

  return (
    <>
      <Header />
      <Menubar />
      <Main>
        <section className={`flex`}>
          <article
            className={`card gap-8 ${style.parte1} ${fase ? style.after : style.before}`}
          >
            <div className="flex_c gap-2">
              <div>
                <h2>1ª Etapa - Cliente</h2>
                <hr />
              </div>
              <div className={`${style.grid_etapa1}`}>
                <Input
                  label="Nome do Cliente"
                  placeholder="Gustavo"
                  icon="user"
                  required
                  error
                  errorMessage="Nome obrigatório"
                />
                <Input
                  label="Email"
                  placeholder="email@email.com"
                  icon="email"
                />
                <Input
                  label="Telefone"
                  placeholder="(11) 11111-1111"
                  icon="whatsapp"
                />
              </div>
            </div>
            <div className="flex_c gap-2">
              <div>
                <h2>2ª Etapa - Problema & Local</h2>
                <hr />
              </div>
              <div className={`${style.grid_etapa2}`}>
                <div className="flex_c gap-4">
                  <Input
                    label="Nome do Serviço"
                    placeholder="Serviço de..."
                    icon="service"
                    required
                  />
                  <Input
                    label="Descrição"
                    placeholder="Descrição do problema..."
                    textarea
                  />
                  <Input
                    label="Estado"
                    placeholder="Estado..."
                    icon="nation"
                    required
                  />
                </div>
                <div className="flex_c between">
                  <div className={`${style.grid_etapa2_1}`}>
                    <Input label="CEP" placeholder="11111-111" icon="local" />
                    <div className="small_txt">
                      <p>Observação:</p>
                      <span>
                        Colocar o CEP do local vai preencher os campos de
                        Rua/Logradouro, Bairro, Cidade, Estado e Número
                      </span>
                    </div>
                  </div>
                  <Input
                    label="Rua / Logradouro"
                    placeholder="Rua..."
                    icon="street"
                    required
                  />
                  <div className={`${style.grid_etapa2_1}`}>
                    <Input
                      label="Bairro"
                      placeholder="Bairro..."
                      icon="map"
                      required
                    />
                    <Input
                      label="Cidade"
                      placeholder="Cidade..."
                      icon="city"
                      required
                    />
                  </div>
                  <div className={`${style.grid_etapa2_2}`}>
                    <Input
                      label="Complemento"
                      placeholder="Complemento..."
                      icon="complement"
                      required
                    />
                    <Input
                      label="Número"
                      placeholder="1111"
                      icon="number"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex between">
              <Button icon="cancel" link="/dashboard" variant="secondary">
                Cancelar
              </Button>
              <Button
                icon="next"
                onClick={alternarFase}
                className={`${fase ? style.btnRotated : ""}`}
              >
                {fase ? "Voltar" : "Próximo"}
              </Button>
            </div>
          </article>

          <article
            className={`card gap-12 ${style.parte2} ${!fase && style.display}`}
          >
            <div>
              <h2>3ª Etapa - Equipe & Local</h2>
              <hr />
            </div>
          </article>
        </section>
      </Main>
    </>
  );
}
