"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Kind = "primary" | "secondary" | "ghost" | "soft" | "danger";
type Size = "sm" | "md" | "lg";

type Props = {
  kind?: Kind;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
};

const VARIANTS: Record<Kind, CSSProperties> = {
  primary: { background: "var(--dxf-red)", color: "#fff" },
  secondary: {
    background: "transparent",
    color: "var(--fg-1)",
    borderColor: "var(--border-strong)",
  },
  ghost: { background: "transparent", color: "var(--fg-1)" },
  soft: { background: "var(--surface-sunken)", color: "var(--fg-1)" },
  danger: {
    background: "var(--surface-card)",
    color: "var(--dxf-red)",
    borderColor: "var(--dxf-red)",
  },
};

const HOVERS: Record<Kind, CSSProperties> = {
  primary: { background: "var(--dxf-red-700)" },
  secondary: { background: "var(--dxf-navy)", color: "#fff" },
  ghost: { background: "var(--surface-sunken)" },
  soft: { background: "#EBE0D9" },
  danger: { background: "var(--dxf-red-100)" },
};

export function Button({
  kind = "secondary",
  size = "md",
  icon,
  iconRight,
  children,
  onClick,
  disabled,
  style,
  type = "button",
}: Props) {
  const [hover, setHover] = useState(false);

  const base: CSSProperties = {
    font: `600 ${size === "sm" ? 12 : size === "lg" ? 15 : 14}px/1 var(--font-body)`,
    padding:
      size === "sm" ? "7px 12px" : size === "lg" ? "13px 22px" : "10px 16px",
    borderRadius: "var(--r-sm)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "all 140ms var(--ease-out)",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...VARIANTS[kind],
        ...(hover && !disabled ? HOVERS[kind] : {}),
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : 16} />}
    </button>
  );
}
