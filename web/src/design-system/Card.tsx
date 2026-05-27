"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

export function Card({ children, hoverable, onClick, style }: Props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-1)",
        borderRadius: "var(--r-md)",
        boxShadow:
          hoverable && hover ? "var(--shadow-2)" : "var(--shadow-1)",
        padding: 24,
        cursor: hoverable ? "pointer" : "default",
        transform: hoverable && hover ? "translateY(-1px)" : "none",
        transition: "all 140ms var(--ease-out)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
