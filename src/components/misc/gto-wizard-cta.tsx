import React, { useEffect, useState } from "react";

import { X } from "lucide-react";

import { ReactComponent as GtoWizardLogo } from "../../images/gtowizard_logo.svg";

declare const window: Window & { gtag?: (...args: unknown[]) => void };

const VARIANTS = [
  {
    id: "insight",
    headline: "Now see how a solver actually plays these ranges",
    body: "Equity is just the start. GTO Wizard shows you the exact solver strategy for any spot — how often to bet, raise, or fold with every hand in your range.",
    button: "Try GTO Wizard — 10% off your first purchase",
    showLogo: false,
  },
  {
    id: "discount",
    headline: "10% off GTO Wizard — for visitors of this site",
    body: "The #1 training app for poker players. Study any spot, practice tough hands in the trainer, and fix your leaks with one-click hand analysis.",
    button: "Claim your 10% discount",
    showLogo: false,
  },
  {
    id: "insight_logo",
    headline: "Now see how a solver actually plays these ranges",
    body: "Equity is just the start. GTO Wizard shows you the exact solver strategy for any spot — how often to bet, raise, or fold with every hand in your range.",
    button: "Try GTO Wizard — 10% off your first purchase",
    showLogo: true,
  },
  {
    id: "discount_logo",
    headline: "10% off GTO Wizard — for visitors of this site",
    body: "The #1 training app for poker players. Study any spot, practice tough hands in the trainer, and fix your leaks with one-click hand analysis.",
    button: "Claim your 10% discount",
    showLogo: true,
  },
];

const trackEvent = (action: string, variantId: string, context: string) => {
  window.gtag?.("event", action, { event_category: "gtowizard_cta", variant: variantId, context });
};

interface GtoWizardCtaProps {
  context: string;
}

const GtoWizardCta = ({ context }: GtoWizardCtaProps) => {
  const [variant] = useState(() => VARIANTS[Math.floor(Math.random() * VARIANTS.length)]);
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
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}
          >
            {variant.showLogo && <GtoWizardLogo />}
            <p style={{ color: "#AAFBB2", fontWeight: 600, margin: 0 }}>{variant.headline}</p>
          </div>
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
