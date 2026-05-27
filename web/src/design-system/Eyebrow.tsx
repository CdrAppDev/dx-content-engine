import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
};

export function Eyebrow({
  children,
  color = "var(--dxf-red)",
  style,
}: Props) {
  return (
    <span
      style={{
        font: "700 11px/1 var(--font-display)",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
