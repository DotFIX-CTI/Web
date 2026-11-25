"use client";

import {
  useState,
  useRef,
  useId,
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import Icon from "@/utils/icon";
import { toastErro } from "@/utils/toast";
import { obterUrlImagem } from "@/api/funcionario";
import style from "./input.module.css";

export interface InputImageProps {
  id?: string;
  name?: string;
  label?: string | null;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  value?: File | string | null;
  defaultValue?: File | string | null;
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  helperText?: string;
}

// Cache de object URLs para instâncias de File para evitar recriação desnecessária
const fileUrlCache = new WeakMap<File, string>();

function obterUrlArquivo(file: File): string {
  let url = fileUrlCache.get(file);
  if (!url) {
    url = URL.createObjectURL(file);
    fileUrlCache.set(file, url);
  }
  return url;
}

export default function InputImage({
  id: idProp,
  name,
  label = "Imagem",
  required = false,
  disabled = false,
  error = false,
  errorMessage,
  value,
  defaultValue = null,
  onChange,
  onRemove,
  accept = "image/png, image/jpeg, image/jpg, image/webp",
  maxSizeMB = 5,
  className = "",
  helperText,
}: InputImageProps) {
  const generatedId = useId();
  const inputId = idProp ?? `input-image-${generatedId}`;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Modo controlado vs não controlado
  const isControlled = value !== undefined;
  const [internalFile, setInternalFile] = useState<File | string | null>(
    () => defaultValue,
  );
  const currentVal = isControlled ? value : internalFile;

  const [imgError, setImgError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Reseta erro de imagem quando o valor atual mudar durante a renderização
  const [prevVal, setPrevVal] = useState(currentVal);
  if (prevVal !== currentVal) {
    setPrevVal(currentVal);
    setImgError(false);
  }

  const previewUrl =
    currentVal instanceof File
      ? obterUrlArquivo(currentVal)
      : typeof currentVal === "string" && currentVal.trim()
        ? obterUrlImagem(currentVal)
        : null;

  const processarArquivo = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toastErro(
        "Formato de imagem inválido. Selecione um arquivo PNG, JPG ou WEBP.",
      );
      return;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toastErro(`A imagem selecionada excede o limite de ${maxSizeMB}MB.`);
      return;
    }

    if (!isControlled) {
      setInternalFile(file);
    }
    onChange?.(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processarArquivo(file);
    }
  };

  const handleContainerClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (!isControlled) {
      setInternalFile(null);
    }
    onRemove?.();
    onChange?.(null);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processarArquivo(file);
    }
  };

  const temImagem = Boolean(previewUrl && !imgError);

  return (
    <div className={`${style.container} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label} {required && "*"}
        </label>
      )}

      <div className={style.wrapper}>
        <article
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={
            temImagem
              ? "Alterar imagem selecionada"
              : "Clique ou arraste para enviar uma imagem"
          }
          className={`
            ${style.input}
            ${isDragging ? style.dragging : ""}
            ${disabled ? style.disabled : ""}
            ${error ? style.error : ""}
          `}
          onClick={handleContainerClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {temImagem && previewUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Pré-visualização da imagem"
                className={style.preview}
                onError={() => setImgError(true)}
              />
              <div className={style.overlay}>
                <Icon name="imagechange" size={28} />
                <span className={style.overlayText}>Alterar</span>
              </div>
            </>
          ) : (
            <Icon name="imagechange" size={36} />
          )}

          <input
            ref={fileInputRef}
            id={inputId}
            name={name}
            type="file"
            accept={accept}
            disabled={disabled}
            onChange={handleFileChange}
            className={style.fileInput}
            tabIndex={-1}
          />
        </article>

        {temImagem && !disabled && (
          <button
            type="button"
            className={style.removeBtn}
            onClick={handleRemove}
            title="Remover imagem"
            aria-label="Remover imagem"
          >
            <Icon name="cancel" size={14} />
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <span className={style.helperText}>{helperText}</span>
      )}

      {error && errorMessage && (
        <span className={style.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
