import type { CSSProperties } from "react";

type Props = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

export function Sparkle({ size = 16, color = "currentColor", style }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" />
    </svg>
  );
}
