import Background from "./background";
import { ReactNode, CSSProperties } from "react";

interface MainProps {
  children: ReactNode;
  className?: string;
  error?: boolean;
  responsive?: boolean;
  row?: boolean;
}

export default function Main({
  children,
  className,
  error,
  responsive,
  row,
}: MainProps) {
  const style: CSSProperties = {
    position: "relative",
    height: "100dvh",
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: row ? "row" : "column",
    alignItems: "center",
    // justifyContent is intentionally left out when "responsive" is used,
    // so the CSS class .responsive can control it via media queries.
    ...(responsive ? {} : { justifyContent: row ? "center" : "flex-start" }),
  };

  const classes = [
    className,
    responsive ? "responsive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main style={style} className={classes}>
      <Background opacity={0.075} error={error} />
      {children}
    </main>
  );
}
