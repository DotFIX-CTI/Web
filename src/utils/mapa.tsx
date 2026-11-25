"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// @ts-expect-error - Leaflet private property
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const corPorClasse: Record<string, string> = {
  default: "var(--success)",
  pendente: "var(--warning)",
  atrasado: "var(--error)",
  cancelado: "var(--cancel)",
};

interface MapaProps {
  latitude?: number;
  longitude?: number;
  tituloPopup?: string;
  classeStatus?: string;
}

export default function Mapa({
  latitude = -23.68395,
  longitude = -46.61802,
  tituloPopup = "Local do Agendamento",
  classeStatus = "default",
}: MapaProps) {
  const position: [number, number] = [latitude, longitude];
  const corDestaque = corPorClasse[classeStatus] || "var(--foreground)";

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        minHeight: 320,
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${corDestaque} 50%, transparent 100%) 0%, transparent 15%)`,
          zIndex: 1000,
          pointerEvents: "none",
        }}
      />

      <MapContainer
        key={`${latitude}-${longitude}`}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{tituloPopup}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
