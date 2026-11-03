// 1. Ícones
const iconMap = {
  user: (
    <svg viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.7778 14.4236C31.7778 9.11298 27.4001 4.80787 22 4.80787C16.5999 4.80787 12.2222 9.11298 12.2222 14.4236C12.2222 19.7342 16.5999 24.0393 22 24.0393C27.4001 24.0393 31.7778 19.7342 31.7778 14.4236ZM36.6667 14.4236C36.6667 19.1016 34.3996 23.2562 30.8898 25.8916C38.7555 29.3099 44 37.185 44 45.6747C44 48.7751 39.1111 48.7751 39.1111 45.6747C39.1111 36.5074 31.3218 28.8472 22 28.8472C12.6782 28.8472 4.88889 36.5074 4.88889 45.6747C4.88889 48.7751 0 48.7751 0 45.6747C0 37.1867 5.24351 29.3102 13.1079 25.8916C9.59887 23.2562 7.33333 19.1009 7.33333 14.4236C7.33333 6.45767 13.8998 0 22 0C30.1002 0 36.6667 6.45767 36.6667 14.4236Z"
        fill="currentColor"
      />
    </svg>
  ),
};

// 2. Tipagem
export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

// 3. Componente Icon
export default function Icon({ name, size = 24, className }: IconProps) {
  const SelectedIcon = iconMap[name];

  if (!SelectedIcon) {
    return null;
  }

  return (
    <span
      style={{ width: size, height: size, display: "inline-block" }}
      className={className}
    >
      {SelectedIcon}
    </span>
  );
}
