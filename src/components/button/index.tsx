import Icon from "@/utils/icon";
import { ReactNode } from "react";
import style from "./button.module.css";

interface ButtonProps {
  children: ReactNode;
  btn?: string;
  icon?: string;
  className?: string;
}

export default function Button({
  children,
  btn,
  icon,
  className,
}: ButtonProps) {
  return (
    <button className={`${style.btn}`}>
      {/* {icon && <Icon name={icon} />} */}
      {children}
    </button>
  );
}
