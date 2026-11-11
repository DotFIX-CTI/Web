"use client";

import Icon, { IconName } from "@/utils/icon";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import style from "./input.module.css";

interface BaseInputProps {
  icon?: IconName;
  label: string;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  textarea?: boolean;
  required?: boolean;
  maxLength?: number;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({
  icon,
  placeholder,
  label,
  textarea,
  error,
  errorMessage,
  required,
  maxLength = 255,
  value,
  defaultValue,
  onChange,
  ...props
}: BaseInputProps) {
  const [currentLength, setCurrentLength] = useState(() => {
    const initialValue = value ?? defaultValue ?? "";
    return String(initialValue).length;
  });

  useEffect(() => {
    if (value !== undefined) {
      setCurrentLength(String(value).length);
    }
  }, [value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentLength(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className={`container ${error && "error"}`}>
      <label htmlFor={label} className="label">
        {label} {required && "*"}
      </label>

      <div
        className={`
          ${textarea ? style.textarea : style.input}
        `}
      >
        {textarea ? (
          <textarea
            id={label}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <>
            <input
              id={label}
              placeholder={placeholder}
              maxLength={maxLength}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              {...(required && { required })}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
            {icon && <Icon name={icon} size={20} className="icon" />}
          </>
        )}
      </div>

      <div className={`flex between ${style.footer}`}>
        {error && errorMessage ? (
          <span className="input_mensagem">{errorMessage}</span>
        ) : (
          <span />
        )}

        {maxLength && (
          <span
            className={style.counter}
            style={{
              color:
                currentLength < maxLength
                  ? currentLength < maxLength / 2
                    ? "var(--off)"
                    : "var(--primary)"
                  : "var(--error)",
            }}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
