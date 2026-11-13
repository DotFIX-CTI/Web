import Main from "@/utils/main";
import style from "./adicionar.module.css";
import Select, { Option } from "@/components/select";
import Integrante from "@/components/integrante";
import InputImage from "@/components/inputImage";
import Pesquisa from "@/components/pesquisa";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";

const integrantes: Option[] = [
  { label: "Arthur Sales", value: "arthur-sales" },
  { label: "Diego Castro", value: "diego-castro" },
  { label: "Eduardo Borges", value: "eduardo-borges" },
  { label: "Guilherme Molina", value: "guilherme-molina" },
  { label: "Pablo Pedroza", value: "pablo-pedroza" },
];

export default function AdicionarEquipe() {
  return (
    <Main>
      <section className="grid2 gap-8 max_width">
        <article className="card gap-8 max_height">
          <h2>Adicionar Equipe</h2>
          <div className="grid gap-4">
            <div className="flex_c gap-4">
              <div className="center gap-4">
                <div>
                  <InputImage />
                </div>
                <div className="small_txt">
                  <p>Observação:</p>
                  <span>
                    Caso não tenha imagem, apenas as iniciais do nome da sua
                    equipe irão aparecer
                  </span>
                </div>
              </div>
              <Input
                label="Nome da Equipe"
                placeholder="Gustavo"
                icon="user"
                required
                errorMessage="Nome obrigatório"
              />
              <Input
                label="Email"
                placeholder="gustavo@gmail.com"
                icon="email"
                required
                errorMessage="Email obrigatório"
              />
              <Input
                label="Senha de acesso"
                placeholder="********"
                icon="password"
                required
                errorMessage="Senha obrigatória"
              />
              <Input
                label="Confirmar Senha"
                placeholder="********"
                icon="password"
                required
                errorMessage="Senha incorreta"
              />
            </div>
            <div className="flex_c gap-12">
              <div className="flex_c gap-1">
                <Select
                  label="1º Integrante"
                  placeholder="Selecione o primeiro integrante"
                  options={integrantes}
                  required
                  errorMessage="1º Integrante obrigatório"
                />
                <div className="flex gap-2">
                  <Image
                    src="/img/user.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                    className="user"
                  />
                  <div>
                    <h5>Arthur Sales</h5>
                    <p>arthur@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="flex_c gap-1">
                <Select
                  label="2º Integrante"
                  placeholder="Selecione o segundo integrante"
                  options={integrantes}
                  required
                  errorMessage="2º Integrante obrigatório"
                />
                <div className="flex gap-2">
                  <Image
                    src="/img/user.png"
                    width={40}
                    height={40}
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
          </div>
          <Button icon="add" className={`${style.adicionar}`} link="/equipe">
            Adicionar
          </Button>
          <Button
            icon="delete"
            variant="attention"
            className={`${style.deletar}`}
            noText
          />
        </article>
        <article className={`card_scroll max_height`}>
          <Pesquisa />
          <div className="scroll gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Integrante key={index} />
            ))}
          </div>
        </article>
      </section>
    </Main>
  );
}
