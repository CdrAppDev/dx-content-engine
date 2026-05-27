"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Card,
  Eyebrow,
  Sparkle,
  StatusPill,
  Textarea,
  TogglePill,
} from "@/design-system";

type Format = "blog-post" | "linkedin-post" | "email";

const ALL_FORMATS: { id: Format; label: string }[] = [
  { id: "blog-post", label: "Blog post" },
  { id: "linkedin-post", label: "LinkedIn post" },
  { id: "email", label: "Email" },
];

async function streamInto(
  url: string,
  body: unknown,
  onChunk: (chunk: string) => void,
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok || !res.body) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}

export default function Home() {
  const [feature, setFeature] = useState("");
  const [landingPage, setLandingPage] = useState("");
  const [lpBusy, setLpBusy] = useState(false);
  const [lpError, setLpError] = useState<string | null>(null);

  const [derivativeFormats, setDerivativeFormats] = useState<Format[]>([
    "blog-post",
    "linkedin-post",
    "email",
  ]);
  const [derivatives, setDerivatives] = useState("");
  const [derivativesBusy, setDerivativesBusy] = useState(false);
  const [derivativesError, setDerivativesError] = useState<string | null>(null);

  function toggleFormat(f: Format) {
    setDerivativeFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  }

  async function generateLandingPage() {
    if (!feature.trim() || lpBusy) return;
    setLpBusy(true);
    setLpError(null);
    setLandingPage("");
    setDerivatives("");
    setDerivativesError(null);
    try {
      await streamInto("/api/landing-page", { source: feature }, (chunk) =>
        setLandingPage((prev) => prev + chunk),
      );
    } catch (err) {
      setLpError((err as Error).message);
    } finally {
      setLpBusy(false);
    }
  }

  async function generateDerivatives() {
    if (!landingPage.trim() || derivativeFormats.length === 0 || derivativesBusy)
      return;
    setDerivativesBusy(true);
    setDerivativesError(null);
    setDerivatives("");
    try {
      await streamInto(
        "/api/repurpose",
        { landingPage, formats: derivativeFormats },
        (chunk) => setDerivatives((prev) => prev + chunk),
      );
    } catch (err) {
      setDerivativesError((err as Error).message);
    } finally {
      setDerivativesBusy(false);
    }
  }

  const canGenerateLp = feature.trim().length > 0 && !lpBusy;
  const canGenerateDerivatives =
    landingPage.trim().length > 0 &&
    derivativeFormats.length > 0 &&
    !derivativesBusy &&
    !lpBusy;

  return (
    <>
      <TopNav />
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 1024,
          margin: "0 auto",
          padding: "var(--sp-9) var(--sp-6) var(--sp-11)",
        }}
      >
        <Hero />

        <div
          style={{
            marginTop: "var(--sp-8)",
            display: "grid",
            gap: "var(--sp-6)",
          }}
        >
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--sp-6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--sp-3)",
                }}
              >
                <Eyebrow>Step 1 — Translate</Eyebrow>
                <span
                  className="dxf-caption"
                  style={{ color: "var(--fg-3)" }}
                >
                  Feature-speak in, business-results landing page out.
                </span>
              </div>

              <Textarea
                label="Feature description"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="Paste a Salesforce, Snowflake, Databricks, AWS, or any platform feature description. Marketing copy, release notes, or docs — whatever you have."
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--sp-4)",
                  flexWrap: "wrap",
                  paddingTop: "var(--sp-2)",
                  borderTop: "1px solid var(--border-1)",
                  marginTop: "var(--sp-1)",
                }}
              >
                <span
                  className="dxf-caption"
                  style={{ color: "var(--fg-3)" }}
                >
                  Brand context loaded from{" "}
                  <code
                    style={{
                      font: "500 12px/1.4 var(--font-mono)",
                      color: "var(--fg-2)",
                    }}
                  >
                    brand/
                  </code>
                  .
                </span>
                <Button
                  kind="primary"
                  size="lg"
                  onClick={generateLandingPage}
                  disabled={!canGenerateLp}
                >
                  <Sparkle size={16} color="currentColor" />
                  {lpBusy ? "Generating landing page…" : "Generate landing page"}
                </Button>
              </div>

              {lpError && <ErrorBlock message={lpError} />}
            </div>
          </Card>

          {(lpBusy || landingPage) && (
            <OutputCard
              title="Landing page"
              status={lpBusy ? "streaming" : "done"}
              statusLabel={lpBusy ? "Generating" : "Complete"}
              body={
                landingPage ||
                (lpBusy ? "Waiting for first token…" : "")
              }
              actions={
                landingPage && !lpBusy ? (
                  <CopyButton text={landingPage} label="Copy markdown" />
                ) : null
              }
            />
          )}

          {landingPage && !lpBusy && (
            <Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--sp-3)",
                  }}
                >
                  <Eyebrow>Step 2 — Spin off</Eyebrow>
                  <span
                    className="dxf-caption"
                    style={{ color: "var(--fg-3)" }}
                  >
                    Derivatives read from the landing page above.
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--sp-3)",
                  }}
                >
                  <Eyebrow color="var(--fg-2)">Target formats</Eyebrow>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--sp-2)",
                    }}
                  >
                    {ALL_FORMATS.map((f) => (
                      <TogglePill
                        key={f.id}
                        active={derivativeFormats.includes(f.id)}
                        onClick={() => toggleFormat(f.id)}
                      >
                        {f.label}
                      </TogglePill>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "var(--sp-2)",
                    borderTop: "1px solid var(--border-1)",
                  }}
                >
                  <Button
                    kind="primary"
                    size="lg"
                    onClick={generateDerivatives}
                    disabled={!canGenerateDerivatives}
                  >
                    <Sparkle size={16} color="currentColor" />
                    {derivativesBusy
                      ? "Generating derivatives…"
                      : "Generate derivatives"}
                  </Button>
                </div>

                {derivativesError && (
                  <ErrorBlock message={derivativesError} />
                )}
              </div>
            </Card>
          )}

          {(derivativesBusy || derivatives) && (
            <OutputCard
              title="Derivatives"
              status={derivativesBusy ? "streaming" : "done"}
              statusLabel={derivativesBusy ? "Generating" : "Complete"}
              body={
                derivatives ||
                (derivativesBusy ? "Waiting for first token…" : "")
              }
              actions={
                derivatives && !derivativesBusy ? (
                  <CopyButton text={derivatives} label="Copy all" />
                ) : null
              }
            />
          )}
        </div>
      </main>
      <FooterMark />
    </>
  );
}

function ErrorBlock({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "var(--sp-3) var(--sp-4)",
        background: "var(--status-danger-bg)",
        color: "var(--status-danger)",
        borderRadius: "var(--r-sm)",
        font: "500 13px/1.5 var(--font-body)",
      }}
    >
      {message}
    </div>
  );
}

function OutputCard({
  title,
  status,
  statusLabel,
  body,
  actions,
}: {
  title: string;
  status: "streaming" | "done";
  statusLabel: string;
  body: string;
  actions?: React.ReactNode;
}) {
  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--sp-4) var(--sp-6)",
          borderBottom: "1px solid var(--border-1)",
          background: "var(--surface-sunken)",
          gap: "var(--sp-3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
          <Eyebrow color="var(--fg-2)">{title}</Eyebrow>
          <StatusPill status={status} label={statusLabel} />
        </div>
        {actions}
      </div>
      <pre
        style={{
          margin: 0,
          padding: "var(--sp-6)",
          font: "400 13px/1.7 var(--font-mono)",
          color: "var(--fg-1)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          background: "var(--surface-card)",
          minHeight: 120,
        }}
      >
        {body}
      </pre>
    </Card>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  async function onClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  }
  return (
    <Button kind="ghost" size="sm" onClick={onClick}>
      {copied ? "Copied" : label}
    </Button>
  );
}

function TopNav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--sp-6)",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image
          src="/brand/wordmark-dark.webp"
          alt="DX Foundation"
          width={1500}
          height={133}
          priority
          style={{ height: 28, width: "auto" }}
        />
        <span
          style={{
            font: "600 13px/1 var(--font-body)",
            color: "var(--fg-2)",
            paddingLeft: 14,
            marginLeft: 4,
            borderLeft: "1px solid var(--border-2)",
          }}
        >
          Content engine
        </span>
      </div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--sp-2)",
        }}
      >
        <Button kind="ghost" size="sm">
          Library
        </Button>
        <Button kind="ghost" size="sm">
          Settings
        </Button>
        <Button kind="secondary" size="sm">
          Sign in
        </Button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "var(--sp-7) 0 var(--sp-2)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -40,
          right: -120,
          width: 480,
          height: 360,
          backgroundImage: "url(/brand/stars-radial-beige.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "var(--sp-4)",
          }}
        >
          <Sparkle size={14} color="var(--dxf-red)" />
          <Eyebrow>Content engine</Eyebrow>
        </div>
        <h1 className="dxf-h1" style={{ margin: 0, maxWidth: 760 }}>
          Turn Feature-Speak Into Business-Results Landing Pages.
        </h1>
        <p
          className="dxf-body"
          style={{
            margin: "var(--sp-4) 0 0",
            maxWidth: 640,
            color: "var(--fg-2)",
          }}
        >
          Paste a feature description from any platform. The engine reads your
          strategy-first positioning from{" "}
          <code
            style={{
              font: "500 14px/1.4 var(--font-mono)",
              color: "var(--fg-1)",
            }}
          >
            brand/
          </code>
          , translates the feature into a business outcome a mid-market
          C-suite buyer cares about, and writes the landing page. Spin off
          email, blog, and LinkedIn from there.
        </p>
      </div>
    </section>
  );
}

function FooterMark() {
  return (
    <footer
      style={{
        padding: "var(--sp-7) var(--sp-6)",
        textAlign: "center",
        color: "var(--fg-3)",
        font: "500 12px/1.5 var(--font-body)",
        borderTop: "1px solid var(--border-1)",
        background: "var(--bg)",
      }}
    >
      <span style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>
        DX Foundation · Internal Tool
      </span>
    </footer>
  );
}
