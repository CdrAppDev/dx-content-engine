"use client";

import {
  useState,
  type CSSProperties,
  type TextareaHTMLAttributes,
} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  style?: CSSProperties;
};

export function Textarea({ label, error, style, ...rest }: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            font: "700 11px/1 var(--font-display)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--fg-2)",
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          position: "relative",
          display: "flex",
          background: "var(--bg-alt)",
          border: `1px solid ${
            error
              ? "var(--dxf-red)"
              : focus
                ? "var(--dxf-red)"
                : "var(--border-2)"
          }`,
          borderRadius: "var(--r-sm)",
          boxShadow: focus ? "var(--shadow-glow-red)" : "none",
          transition: "all 120ms var(--ease-out)",
        }}
      >
        <textarea
          {...rest}
          onFocus={(e) => {
            setFocus(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            rest.onBlur?.(e);
          }}
          style={{
            flex: 1,
            minHeight: 180,
            padding: "14px 16px",
            border: 0,
            outline: "none",
            background: "transparent",
            font: "400 14px/1.55 var(--font-body)",
            color: "var(--fg-1)",
            resize: "vertical",
          }}
        />
      </span>
      {error && (
        <span
          style={{
            font: "400 11px/1.4 var(--font-body)",
            color: "var(--dxf-red)",
          }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
