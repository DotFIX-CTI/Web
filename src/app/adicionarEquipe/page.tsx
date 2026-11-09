import Header from "@/components/header";
import Input from "@/components/input";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";
import style from "./adicionar.module.css";
import Select from "@/components/select";
import Integrante from "@/components/integrante";
import InputImage from "@/components/inputImage";

const integrantes: Option[] = [
  "Arthur Sales",
  "Diego Castro",
  "Eduardo Borges",
  "Guilherme Molina",
  "Pablo Pedroza",
];

export default function AdicionarEquipe() {
  return (
    <>
      <Header />
      <Menubar />
      <Main>
        <section className={`${style.section} gap-8`}>
          <article className="card center gap-8">
            <h2>Adicionar Equipe</h2>
            <div className={`${style.grid} gap-4`}>
              <div className="flex_c gap-4">
                <InputImage />
                <Input
                  label="Nome da Equipe"
                  placeholder="Gustavo"
                  icon="user"
                  required
                  errorMessage="Nome obrigatório"
                />
                <Input
                  label="Email"
                  placeholder="Gustavo"
                  icon="email"
                  required
                  errorMessage="Email obrigatório"
                />
                <Input
                  label="Senha de acesso"
                  placeholder="Gustavo"
                  icon="password"
                  required
                  errorMessage="Senha obrigatória"
                />
                <Input
                  label="Confirmar Senha"
                  placeholder="Gustavo"
                  icon="password"
                  required
                  errorMessage="Senha incorreta"
                />
              </div>
              <div className="flex_c gap-4">
                <Select
                  label="1º Integrante"
                  placeholder="Selecione o primeiro integrante"
                  options={integrantes}
                  required
                  errorMessage="1º Integrante obrigatório"
                />
                <Select
                  label="2º Integrante"
                  placeholder="Selecione o segundo integrante"
                  options={integrantes}
                  required
                  errorMessage="2º Integrante obrigatório"
                />
              </div>
            </div>
          </article>
          <article className={`card_scroll ${style.integrantes}`}>
            <div>
              <p>Pesquisar</p>
            </div>
            <div className="flex_c scroll gap-6">
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
              <Integrante />
            </div>
          </article>
        </section>
      </Main>
    </>
  );
}
