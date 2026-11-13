"use client";

import { useState } from "react";
import Main from "@/utils/main";
import { Estados } from "@/utils/estados";
import style from "./agendamento.module.css";
import Select, { Option } from "@/components/select";
import CardSugestao from "@/components/cardSugestao";
import Calendario from "@/components/calendario";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";

const opcoesEstados: Option[] = Object.entries(Estados).map(
  ([sigla, nome]) => ({
    label: nome,
    value: sigla.toUpperCase(),
  }),
);

export default function Agendamento() {
  const [fase, setFase] = useState(false);

  const alternarFase = () => {
    setFase((faseAnterior) => !faseAnterior);
  };

  return (
    <Main>
      <section className={`flex max_height ${style.containerEtapas}`}>
        <article
          className={`card gap-8 between ${style.parte1} ${fase ? style.after : style.before}`}
        >
          <div className="flex_c gap-4">
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
                errorMessage="Nome obrigatório"
              />
              <Input label="Email" placeholder="email@email.com" icon="email" />
              <Input
                label="Telefone"
                placeholder="(11) 11111-1111"
                icon="whatsapp"
              />
            </div>
          </div>
          <div className="flex_c gap-4">
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
                  errorMessage="Nome do Serviço obrigatório"
                />
                <Input
                  label="Descrição"
                  placeholder="Descrição do problema..."
                  textarea
                />
                <Select
                  label="Estado"
                  placeholder="Selecione o estado"
                  options={opcoesEstados}
                  required
                  errorMessage="Estado obrigatório"
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
                  errorMessage="Rua obrigatório"
                />
                <div className={`${style.grid_etapa2_1}`}>
                  <Input
                    label="Bairro"
                    placeholder="Bairro..."
                    icon="map"
                    required
                    errorMessage="Bairro obrigatório"
                  />
                  <Input
                    label="Cidade"
                    placeholder="Cidade..."
                    icon="city"
                    required
                    errorMessage="Cidade obrigatório"
                  />
                </div>
                <div className={`${style.grid_etapa2_2}`}>
                  <Input
                    label="Complemento"
                    placeholder="Complemento..."
                    icon="complement"
                    required
                    errorMessage="Complemento obrigatório"
                  />
                  <Input
                    label="Número"
                    placeholder="1111"
                    icon="number"
                    required
                    errorMessage="Número obrigatório"
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
          className={`card gap-4 between ${style.parte2} ${!fase && style.display}`}
        >
          <div>
            <h2>3ª Etapa - Equipe & Local</h2>
            <hr />
          </div>
          <div className={`grid2 gap-8 ${style.sugestao}`}>
            <div className="flex_c between gap-4">
              <div className="flex_c">
                <Select
                  label="Equipe"
                  placeholder="Selecione a equipe"
                  options={opcoesEstados}
                  required
                  errorMessage="Equipe obrigatório"
                />
                <div className={`flex_c gap-6`}>
                  <div className="flex gap-2">
                    <Image
                      src="/img/user.png"
                      width={32}
                      height={32}
                      alt="Picture of the author"
                      className="user"
                    />
                    <div>
                      <h5>Arthur Sales</h5>
                      <p>arthur@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/img/user.png"
                      width={32}
                      height={32}
                      alt="Picture of the author"
                      className="user"
                    />
                    <div>
                      <h5>Diego Castro</h5>
                      <p>diego@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <Calendario compact />
            </div>
            <div className="flex_c gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSugestao key={index} />
              ))}
            </div>
          </div>
          <Button icon="save" className="self-end" link="/detalheAgendamento">
            Salvar
          </Button>
        </article>
      </section>
    </Main>
  );
}
