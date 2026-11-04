import Icon, { IconName } from "@/utils/icon";
import { InputHTMLAttributes } from "react";
import style from "./input.module.css";

export type InputVariant = "default" | "error";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  icon: IconName;
  label: string;
  placeholder: string;
  className?: string;
}

export default function Input({
  variant = "default",
  icon,
  placeholder,
  label,
  className = "",
  ...props
}: InputProps) {
  const variantClass = style[variant] || style.default;

  return (
    <div className={`${variantClass} ${className}`.trim()}>
      <label htmlFor={label} className={style.label}>
        {label}
      </label>
      <div className={style.input}>
        <input id={label} placeholder={placeholder} {...props} />
        <Icon name={icon} size={20} className={style.icon} />
      </div>
    </div>
  );
}
