import Icon, { IconName } from "@/utils/icon";
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import style from "./button.module.css";
import Link from "next/link";

export type ButtonVariant = "default" | "secondary" | "logout";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName;
  className?: string;
};

// Botão Comum
type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    link?: undefined;
  };

// Botão Link
type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    link: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "default",
    icon,
    link,
    className = "",
    ...rest
  } = props;
  const variantClass = style[variant] || style.default;

  if (link) {
    return (
      <Link
        href={link}
        className={`${style.button} ${variantClass} ${className}`.trim()}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <Icon name={icon} size={20} />}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${style.button} ${variantClass} ${className}`.trim()}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  );
}
