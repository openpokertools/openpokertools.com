import Board from "@/components/board/board";
import type { BoardCards } from "@/components/board/board-props";
import Hole from "@/components/hole-cards/hole-cards";
import type { HoleCards } from "@/components/hole-cards/hole-cards-props";
import RangeSelector from "@/components/range/range-selector";
import { calculateStats } from "@/lib/stats";
import React, { useState, useEffect } from "react";
import BoardProvider from "../board/board-context";
import ClearBoardButton from "../board/clear-board-button";
import RandomBoardButton from "../board/random-board-button";
import PlayingCardProvider from "../playing-card/playing-card-context";
import { ANALYSIS_HANDS_DEFAULT, type AnalysisHands } from "./analysis-props";
import CalculateWinButton from "./calculate-win-button";
import CombosDisplay from "./combos-display";
import Report from "./report";
import { COMBOS_REPORT_DEFAULT, type CombosReport, type EquityReport } from "./report-props";
import StatsDisplay from "./stats-display";
import { SELECTED_QUALIFIERS_DEFAULT, type SelectedQualifiers } from "./stats-display-props";

const RangeAnalysisDisplay = () => {
  const [selectedHands, setSelectedHands] = useState<Set<string>>(new Set());
  const [selectedQualifiers, setSelectedQualifiers] = useState<SelectedQualifiers>(
    SELECTED_QUALIFIERS_DEFAULT,
  );
  const [selectedTab, setSelectedTab] = useState<string>("preflop");

  const [boardCards, setBoardCards] = useState<BoardCards>({});
  const [holeCards, setHoleCards] = useState<HoleCards>({});
  const [combosReport, setCombosReport] = useState<CombosReport>(COMBOS_REPORT_DEFAULT);
  const [equityReport, setEquityReport] = useState<EquityReport>({});
  const [stats, setStats] = useState<Map<string, Map<string, number>>>(new Map());
  const [activeHands, setActiveHands] = useState<Map<string, number>>(new Map());
  const [analysisHands, setAnalysisHands] = useState<AnalysisHands>(ANALYSIS_HANDS_DEFAULT);
  const [keptToTurn, setKeptToTurn] = useState<Array<[string, string]>>([]);
  const [keptToRiver, setKeptToRiver] = useState<Array<[string, string]>>([]);
  const [keptToShowdown, setKeptToShowdown] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    const newStats = calculateStats(selectedHands, selectedQualifiers, holeCards, boardCards);
    setStats(newStats.counts);
    setCombosReport(newStats.combosReport);
    if (selectedTab !== "preflop") {
      setActiveHands(newStats[selectedTab + "ActiveHands"]);
    } else {
      setActiveHands(new Map());
    }

    setAnalysisHands({
      hole: holeCards,
      board: boardCards,
      keptToFlop: newStats.keptToFlop,
      keptToTurn: newStats.keptToTurn,
      keptToRiver: newStats.keptToRiver,
      keptToShowdown: newStats.keptToShowdown,
    });

    setKeptToTurn(newStats.keptToTurn);
    setKeptToRiver(newStats.keptToRiver);
    setKeptToShowdown(newStats.keptToShowdown);
  }, [selectedHands, boardCards, holeCards, selectedQualifiers, selectedTab]);

  return (
    <>
      <div className="grid grid-cols-12" id="viewer">
        <div className="col-span-5">
          <RangeSelector
            selectedHands={selectedHands}
            setSelectedHands={setSelectedHands}
            activeHands={activeHands}
          />
        </div>
        <PlayingCardProvider>
          <div className="col-span-3 p-3">
            <h4 className="mb-2">Board</h4>
            <BoardProvider>
              <Board setBoardCards={setBoardCards} />
              <div className="flex flex-row my-2">
                <div className="ml-auto mr-1">
                  <RandomBoardButton />
                </div>
                <div className="mr-auto ml-1">
                  <ClearBoardButton />
                </div>
              </div>
            </BoardProvider>
            <h4 className="mb-2">Hole Cards</h4>
            <div className="flex flex-row">
              <Hole holeCards={holeCards} setHoleCards={setHoleCards} />
              <CalculateWinButton analysisHands={analysisHands} setEquityReport={setEquityReport} />
            </div>
            <Report combosReport={combosReport} equityReport={equityReport} />
          </div>
        </PlayingCardProvider>
        <div className="col-span-4 p-3">
          <h4 className="mb-2">Statistics</h4>
          <StatsDisplay
            stats={stats}
            selectedQualifiers={selectedQualifiers}
            setSelectedQualifiers={setSelectedQualifiers}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      <CombosDisplay
        keptToTurn={keptToTurn}
        keptToRiver={keptToRiver}
        keptToShowdown={keptToShowdown}
      />
    </>
  );
};

export default RangeAnalysisDisplay;
