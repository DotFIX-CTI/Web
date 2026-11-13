"use client";

import { useState, useRef, useEffect } from "react";
import Icon, { IconName } from "@/utils/icon";
import style from "./select.module.css";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  icon?: IconName;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
}

export default function Select({
  label,
  options = [],
  value,
  onChange,
  icon,
  error,
  errorMessage,
  required,
  placeholder = "Selecione uma opção",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropUp, setIsDropUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    options.find((opt) => opt.value === value),
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = options.find((opt) => opt.value === value);
    setSelectedOption(found);
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 200;
      setIsDropUp(spaceBelow < dropdownHeight + 20);
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${style.container} ${error && "error"}`}
    >
      <label className="label">
        {label} {required && "*"}
      </label>

      <div className={`${style.selectWrapper} ${error && "error"}`}>
        <button
          type="button"
          className={`${style.trigger} ${isOpen ? style.active : ""}`}
          onClick={handleToggle}
        >
          {icon && <Icon name={icon} size={20} className={style.leftIcon} />}

          <span
            className={selectedOption ? style.selectedValue : style.placeholder}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <Icon
            name="dropdown"
            size={16}
            className={`${style.arrowIcon} ${isOpen ? style.rotated : ""}`}
          />
        </button>

        {isOpen && (
          <ul
            className={`${style.optionsList} ${
              isDropUp ? style.dropdownUp : style.dropdownDown
            }`}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`${style.optionItem} ${
                  selectedOption?.value === option.value ? style.selected : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && errorMessage && (
        <span className="input_mensagem">{errorMessage}</span>
      )}
    </div>
  );
}
