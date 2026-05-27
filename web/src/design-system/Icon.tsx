import type { CSSProperties, ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 5 5 9-11" />,
  x: <path d="M6 6 18 18M18 6 6 18" />,
  send: <path d="m3 11 18-8-8 18-3-7-7-3Z" />,
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v12" />
      <path d="m6 12 6 6 6-6" />
      <path d="M4 21h16" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  moreH: (
    <>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
};

export type IconName = keyof typeof PATHS;

type Props = {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
};

export function Icon({ name, size = 18, stroke = 1.75, style }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
