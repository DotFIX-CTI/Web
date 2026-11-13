import { ReactNode } from "react";
import Background from "./background";

interface MainProps {
  children: ReactNode;
  className?: string;
  patternOpacity?: number;
  error?: boolean;
}

export default function Main({
  children,
  className,
  patternOpacity = 0.15,
  error,
}: MainProps) {
  return (
    <main
      style={{
        position: "relative",
        marginTop: error ? "0" : "7.5vh",
        minHeight: "92.5vh",
        height: "auto",
        width: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      <Background opacity={patternOpacity} error={error} />
      {children}
    </main>
  );
}
