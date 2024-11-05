import OddsCalculator from "@/components/odds-calculator/odds-calculator";
import OddsCalculatorInfo from "@/components/odds-calculator/odds-calculator-info";
import AppShell from "@/components/shell/app-shell";
import DisplayContainer from "@/components/shell/display-container";
import type { HeadFC, PageProps } from "gatsby";
import type React from "react";

const OddsPage: React.FC<PageProps> = () => {
  return (
    <AppShell>
      <DisplayContainer maxWidth="500px">
        <OddsCalculator />
      </DisplayContainer>
      <OddsCalculatorInfo />
    </AppShell>
  );
};

export default OddsPage;

export const Head: HeadFC = () => (
  <>
    <title>Texas Hold'em Poker Odds Calculator</title>
    <meta
      name="description"
      content="Easily calculate your winning odds in poker with our simple and dynamic odds calculator. Enter your cards and optionally the board texture, and get real-time winning probabilities for each hand. Try it now!"
    />
    <meta
      name="keywords"
      content="poker equity calculator, poker odds calculator, poker odds, poker equity, poker calculator, equity calculator, texas hold'em odds calcualtor"
    />
    <meta name="language" content="english" />
  </>
);
