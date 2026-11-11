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
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  textarea?: boolean;
  required?: boolean;
  maxLength?: number;
  password?: boolean;
  code?: boolean;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({
  icon,
  placeholder = "",
  label,
  textarea,
  error,
  errorMessage,
  required,
  maxLength = 255,
  password,
  code,
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

  return code ? (
    <div className={`container ${error ? "error" : ""}`}>
      <label htmlFor={label} className="label">
        {label} {required && "*"}
      </label>
      <div className={style.code}>
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            id={`${label}-${index}`}
            maxLength={1}
            onChange={handleChange}
            style={{textAlign: "center"}}
            {...(required && { required })}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        ))}
      </div>
      {error && errorMessage && (
        <span className="input_mensagem">{errorMessage}</span>
      )}
    </div>
  ) : (
    <div className={`container ${error ? style.error : ""}`.trim()}>
      <label htmlFor={label} className="label">
        {label} {required && "*"}
      </label>

      <div
        className={`
          ${textarea ? style.textarea : style.input} 
          ${!textarea && !icon && !password ? style.noIcon : ""}
        `.trim()}
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
              style={password ? { paddingRight: 40 } : { paddingRight: 4 }}
              {...(required && { required })}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
            {icon && <Icon name={icon} size={20} className="icon" />}
            {password && (
              <Icon name="eye" size={20} className={style.password} />
            )}
          </>
        )}
      </div>

      <div className={`flex between ${style.footer}`}>
        {error && errorMessage ? (
          <span className="input_mensagem">{errorMessage}</span>
        ) : (
          <span />
        )}

        {maxLength && !textarea && (
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
