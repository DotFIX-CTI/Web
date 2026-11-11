import Icon, { IconName } from "@/utils/icon";
import {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  CSSProperties,
} from "react";
import style from "./button.module.css";
import Link from "next/link";

export type ButtonVariant = "default" | "secondary" | "attention" | "logout";

type BaseProps = {
  children?: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName;
  className?: string;
  noText?: boolean;
  reverse?: boolean;
  fullWidth?: boolean;
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
    noText,
    reverse,
    fullWidth,
    ...rest
  } = props;
  const variantClass = style[variant] || style.default;

  const customStyle: CSSProperties = {
    ...(fullWidth ? { width: "100%" } : { width: noText ? 40 : 160 }),
    ...(reverse && { flexDirection: "row-reverse" }),
  };

  if (link) {
    return (
      <Link
        href={link}
        className={`${style.button} ${variantClass} ${className}`}
        style={customStyle}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <Icon name={icon} size={20} />}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${style.button} ${variantClass} ${className}`}
      style={customStyle}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  );
}
