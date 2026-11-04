import { ReactNode } from "react";
import Background from "./background";

interface MainProps {
  children: ReactNode;
  className?: string;
  patternOpacity?: number;
}

export default function Main({
  children,
  className,
  patternOpacity = 0.15,
}: MainProps) {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      className={className}
    >
      <Background opacity={patternOpacity} />
      {children}
    </main>
  );
}
