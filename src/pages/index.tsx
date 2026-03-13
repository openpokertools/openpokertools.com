import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import RangeAnalysisInfo from "@/components/range-analysis/range-analysis-info";
import RangeAnalysisTool from "@/components/range-analysis/range-analysis-tool";
import AppShell from "@/components/shell/app-shell";
import DisplayContainer from "@/components/shell/display-container";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <AppShell>
      <DisplayContainer maxWidth="1140px">
        <RangeAnalysisTool />
      </DisplayContainer>
      <RangeAnalysisInfo />
    </AppShell>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Texas Hold'em Poker Range Analysis Tool</title>
    <meta
      name="description"
      content="Analyze Texas Hold'em poker hands with our range analysis tool. Evaluate board cards, hole cards, and calculate winning statistics for more informed decision-making."
    />
    <meta
      name="keywords"
      content="poker range calculator, equity calculator, flop, flop analysis, flop equity, texas holdem, poker, poker analysis, poker calculator, poker equity, poker flop, poker odds, poker range, preflop, preflop equity, preflop range, range, range analysis, range equity, ranges"
    />
    <meta name="language" content="english" />
    <meta
      name="e84076802e988ad771dbd53196323a9f0d7b43c6"
      content="e84076802e988ad771dbd53196323a9f0d7b43c6"
    />
  </>
);
