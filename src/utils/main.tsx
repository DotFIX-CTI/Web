import Background from "./background";
import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  className?: string;
  error?: boolean;
  justify?: string;
}

export default function Main({
  children,
  className,
  error,
  justify = "center",
}: MainProps) {
  return (
    <main
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: justify,
      }}
      className={className}
    >
      <Background opacity={0.075} error={error} />
      {children}
    </main>
  );
}
