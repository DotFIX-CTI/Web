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
        marginTop: "7.5vh",
        minHeight: "92.5vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      <Background opacity={patternOpacity} error={error}/>
      {children}
    </main>
  );
}
