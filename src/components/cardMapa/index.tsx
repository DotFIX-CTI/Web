import Icon from "@/utils/icon";
import { Props } from "@/utils/status";
import dynamic from "next/dynamic";

const MapaDinamico = dynamic(() => import("@/utils/mapa"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Carregando mapa...
    </div>
  ),
});

export default function CardMapa() {
  return (
    <article className={`card_mapa`}>
      <div
        className={`flex_c gap-2 ${Props.cancelado}_bg`}
        style={{ padding: "20px" }}
      >
        <div className={`flex between`}>
          <h2>CTI Brasil</h2>
          <div className={`center gap-4`}>
            <div className="center gap-1">
              <Icon name="user" size={24} />
              <h4>Jucelino</h4>
            </div>
            <div className="flex gap-2">
              <Icon name="mail" size={24} />
              <Icon name="whatsapp" size={24} />
            </div>
          </div>
        </div>
        <div className={`center gap-1 smooth_info`}>
          <Icon name="local" size={20} />
          <p>R. Salgado de Castro, 46 - Centro, Diadema - SP, 09920-690</p>
        </div>
      </div>
      <MapaDinamico />
    </article>
  );
}
