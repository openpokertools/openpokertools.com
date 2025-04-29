import React from "react";

import type { HeadFC, PageProps } from "gatsby";

import RangeEquityInfo from "@/components/range-equity/range-equity-info";
import RangeEquityTool from "@/components/range-equity/range-equity-tool";
import AppShell from "@/components/shell/app-shell";

const EquityPage: React.FC<PageProps> = () => {
  return (
    <AppShell>
      <RangeEquityTool />
      <RangeEquityInfo />
    </AppShell>
  );
};

export default EquityPage;

export const Head: HeadFC = () => (
  <>
    <title>Range vs Range Equity Calculator</title>
    <meta
      name="description"
      content="Free and easy to use Poker calculator to estimate range vs range equity. Simulate different scenarios and perfect your game."
    />
    <meta
      name="keywords"
      content="poker range calculator, equity calculator, flop, flop analysis, flop equity, texas holdem, poker, poker analysis, poker calculator, poker equity, poker flop, poker odds, poker range, preflop, preflop equity, preflop range, range, range analysis, range equity, ranges"
    />
    <meta name="language" content="english" />
  </>
);
