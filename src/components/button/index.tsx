import Icon, { IconName } from "@/utils/icon";
import { ReactNode, ButtonHTMLAttributes } from "react";
import style from "./button.module.css";

export type ButtonVariant = "default";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName;
  className?: string;
}

export default function Button({
  children,
  variant = "default",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = style[variant] || style.default;

  return (
    <button
      className={`${style.button} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {icon && <Icon name={icon} size={20}/>}
      {children}
    </button>
  );
}
