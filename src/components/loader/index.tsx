"use client";

import { motion } from "framer-motion";

const CONFIG = {
  totalParticulas: 48, // Quantidade de elementos na tela
  tamanhoBase: 1, //----- Tamanho inicial base em pixels
  variacaoTamanho: 8, //- Fator de variação de tamanho entre as partículas
  duracaoBase: 10, //---- Velocidade base da animação (segundos)
  escalaMin: 0.5, //----- Menor escala durante o pulso
  escalaMax: 2, //------- Maior escala durante o pulso
  opacidadeMin: 0.025, // Opacidade mínima (suavidade no fundo)
  opacidadeMax: 0.075, // Opacidade máxima no pico do brilho
};

export default function Loader(className?: string, props?: any) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      {Array.from({ length: CONFIG.totalParticulas }).map((_, index) => {
        const size = CONFIG.tamanhoBase + (index % 5) * CONFIG.variacaoTamanho;
        const duration = CONFIG.duracaoBase + (index % 4) * 2;
        const delay = index * 0.25;

        return (
          <motion.div
            key={index}
            style={{
              width: size,
              height: size,
              borderRadius: index % 3 === 0 ? "50%" : "6px",
              background: "var(--primary)",
              position: "absolute",
              top: `${(index * 19) % 85}%`,
              left: `${(index * 23) % 85}%`,
            }}
            initial={{
              opacity: CONFIG.opacidadeMin,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              y: [0, -40, 20, -30, 0],
              x: [0, 30, -20, 25, 0],
              scale: [
                CONFIG.escalaMin,
                CONFIG.escalaMax,
                CONFIG.escalaMin + 0.25,
                CONFIG.escalaMax,
                CONFIG.escalaMin,
              ],
              opacity: [
                CONFIG.opacidadeMin,
                CONFIG.opacidadeMax,
                CONFIG.opacidadeMin + 0.025,
                CONFIG.opacidadeMax,
                CONFIG.opacidadeMin,
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
}
