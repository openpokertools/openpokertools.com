import React, { useEffect, useState } from "react";

import { X } from "lucide-react";

declare const window: Window & { gtag?: (...args: unknown[]) => void };

const TEXT_VARIANTS = [
  {
    id: "insight",
    headline: (_equity: number | null) => "Now see how a solver actually plays these ranges",
    body: "Equity is just the start. GTO Wizard shows you the exact solver strategy for any spot — how often to bet, raise, or fold with every hand in your range.",
    button: "Try GTO Wizard — 10% off your first purchase",
  },
  {
    id: "now_what",
    headline: (equity: number | null) =>
      equity != null
        ? `Your range has ${Math.round(equity * 100)}% equity. Now what?`
        : "You know your equity. Now what?",
    body: "GTO Wizard shows you what to do with it — the exact bet sizing, frequency, and strategy a solver uses in this spot.",
    button: "Try GTO Wizard — 10% off your first purchase",
  },
  {
    id: "gap",
    headline: (equity: number | null) =>
      equity != null
        ? `${Math.round(equity * 100)}% equity — but that doesn't tell you how to play.`
        : "Equity tells you who's ahead. Not how to play.",
    body: "GTO Wizard shows you the solver strategy for every hand in your range — how often to bet, raise, or fold in any spot.",
    button: "Try GTO Wizard — 10% off your first purchase",
  },
];

export const VARIANTS = TEXT_VARIANTS.flatMap((v) => [
  { ...v, id: v.id, delay: 0 },
  { ...v, id: `${v.id}_delayed`, delay: 3000 },
]);

const trackEvent = (action: string, variantId: string, context: string) => {
  window.gtag?.("event", action, { event_category: "gtowizard_cta", variant: variantId, context });
};

interface GtoWizardCtaProps {
  context: string;
  variantId: string;
  heroEquity?: number | null;
}

const GtoWizardCta = ({ context, variantId, heroEquity = null }: GtoWizardCtaProps) => {
  const variant = VARIANTS.find((v) => v.id === variantId) ?? VARIANTS[0];
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    trackEvent("shown", variant.id, context);
  }, [variant.id, context]);

  if (dismissed) return null;

  return (
    <div className="animate-slide-down">
      <div>
        <div
          className="container mx-auto mb-3"
          style={{
            maxWidth: "960px",
            border: "1px solid #AAFBB2",
            borderRadius: "0.5rem",
            padding: "1rem 1.5rem",
            backgroundColor: "#151F21",
            position: "relative",
          }}
        >
          <button
            onClick={() => {
              trackEvent("dismissed", variant.id, context);
              setDismissed(true);
            }}
            aria-label="Dismiss"
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fcfcfc",
              padding: 0,
              lineHeight: 1,
            }}
          >
            <X size={16} />
          </button>
          <p style={{ color: "#AAFBB2", fontWeight: 600, marginBottom: "0.4rem" }}>{variant.headline(heroEquity)}</p>
          <p style={{ color: "#fcfcfc", marginBottom: "0.75rem" }}>{variant.body}</p>
          <a
            href="https://gtowizard.com/p/openpokertools"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("clicked", variant.id, context)}
            style={{
              display: "inline-block",
              backgroundColor: "#AAFBB2",
              color: "#151F21",
              fontWeight: 600,
              padding: "0.5rem 1.25rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            {variant.button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default GtoWizardCta;
