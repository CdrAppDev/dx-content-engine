"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
};

export function TogglePill({ active, onClick, children, disabled }: Props) {
  const [hover, setHover] = useState(false);

  const base: CSSProperties = {
    padding: "7px 14px",
    borderRadius: "var(--r-pill)",
    font: "600 13px/1 var(--font-body)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 140ms var(--ease-out)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    opacity: disabled ? 0.5 : 1,
  };

  const variant: CSSProperties = active
    ? {
        background: "var(--dxf-navy)",
        color: "var(--fg-on-dark)",
        borderColor: "var(--dxf-navy)",
      }
    : {
        background: "var(--surface-card)",
        color: "var(--fg-1)",
        borderColor: "var(--border-2)",
      };

  const hoverStyle: CSSProperties = active
    ? { background: "var(--dxf-navy-800)" }
    : { borderColor: "var(--border-strong)" };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...variant,
        ...(hover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

type StatusKey =
  | "active"
  | "review"
  | "risk"
  | "blocked"
  | "done"
  | "draft"
  | "streaming";

const STATUS: Record<
  StatusKey,
  { bg: string; fg: string; label: string }
> = {
  active: {
    bg: "var(--status-info-bg)",
    fg: "var(--status-info)",
    label: "Active",
  },
  review: {
    bg: "var(--status-info-bg)",
    fg: "var(--status-info)",
    label: "In review",
  },
  risk: {
    bg: "var(--status-warning-bg)",
    fg: "var(--status-warning)",
    label: "At risk",
  },
  blocked: {
    bg: "var(--status-danger-bg)",
    fg: "var(--status-danger)",
    label: "Blocked",
  },
  done: {
    bg: "var(--status-success-bg)",
    fg: "var(--status-success)",
    label: "Resolved",
  },
  draft: {
    bg: "var(--surface-sunken)",
    fg: "var(--fg-2)",
    label: "Draft",
  },
  streaming: {
    bg: "var(--status-info-bg)",
    fg: "var(--status-info)",
    label: "Generating",
  },
};

export function StatusPill({
  status,
  label,
}: {
  status: StatusKey;
  label?: string;
}) {
  const s = STATUS[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 99,
        font: "600 11px/1.4 var(--font-body)",
        background: s.bg,
        color: s.fg,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 99,
          background: s.fg,
        }}
      />
      {label ?? s.label}
    </span>
  );
}
