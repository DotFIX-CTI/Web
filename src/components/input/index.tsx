"use client";

import Icon, { IconName } from "@/utils/icon";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  ChangeEventHandler,
} from "react";
import style from "./input.module.css";

interface BaseInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue"
> {
  icon?: IconName;
  placeholder?: string;
  type?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  textarea?: boolean;
  required?: boolean;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
  code?: boolean;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
}

export default function Input({
  icon,
  placeholder = "",
  type = "text",
  label = "",
  textarea,
  error,
  errorMessage,
  required,
  maxLength = 0,
  email,
  password,
  code,
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: BaseInputProps) {
  const [verSenha, setVerSenha] = useState(false);

  const [currentLength, setCurrentLength] = useState(() => {
    const initialValue = value ?? defaultValue ?? "";
    return String(initialValue).length;
  });

  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentLength(String(value).length);
    }
  }, [value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = e.target.value;
    if (maxLength > 0 && val.length > maxLength) return;

    setCurrentLength(val.length);
    onChange?.(e);
  };

  const handleCodeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    const char = val.slice(-1);
    e.target.value = char;

    setCurrentLength(e.target.value.length);
    onChange?.(e);

    if (char && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  return code ? (
    <div className={`container ${error ? "error" : ""}`}>
      {label && (
        <label htmlFor={label} className="label">
          {label} {required && "*"}
        </label>
      )}
      <div className={style.code}>
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              codeInputRefs.current[index] = el;
            }}
            id={label ? `${label}-${index}` : undefined}
            onChange={(e) => handleCodeChange(e, index)}
            onKeyDown={(e) => handleCodeKeyDown(e, index)}
            style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 500 }}
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
    <div className={`container ${error ? style.error : ""}`}>
      {label && (
        <label htmlFor={label} className="label">
          {label} {required && "*"}
        </label>
      )}

      <div
        className={`
          ${textarea ? style.textarea : style.input} 
          ${!textarea && !icon && !password ? style.noIcon : ""}
          ${className ?? ""}
        `}
      >
        {textarea ? (
          <textarea
            id={label || undefined}
            placeholder={placeholder}
            maxLength={maxLength > 0 ? maxLength : undefined}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <>
            <input
              id={label || undefined}
              type={
                password
                  ? verSenha
                    ? "text"
                    : "password"
                  : email
                    ? "email"
                    : type || "text"
              }
              placeholder={placeholder}
              maxLength={maxLength > 0 ? maxLength : undefined}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              style={{
                paddingLeft: icon ? 36 : 10,
                paddingRight: password ? 40 : 10,
                ...props.style,
              }}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
            {icon && <Icon name={icon} size={20} className="icon" />}
            {password && (
              <button
                type="button"
                onClick={() => setVerSenha(!verSenha)}
                className={style.password}
              >
                {verSenha ? (
                  <Icon name="eye" size={20} />
                ) : (
                  <Icon name="eyeclosed" size={20} />
                )}
              </button>
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

        {maxLength > 0 && !textarea && (
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
