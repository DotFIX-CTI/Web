import Button from "@/components/button";
import Header from "@/components/header";
import Menubar from "@/components/menubar";
import Main from "@/utils/main";

export default function Custom404() {
  return (
    <>
      <Header />
      <Menubar />
      <Main error className="center_c gap-4">
        <h1 className="big_txt">404</h1>
        <div className="center_c">
          <h2>Site Fantasma</h2>
          <p>Nada encontrado por aqui...</p>
        </div>
        <Button icon="logout" link="/dashboard" variant="secondary">
          Voltar
        </Button>
      </Main>
    </>
  );
}
