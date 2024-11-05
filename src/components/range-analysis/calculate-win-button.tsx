import React from "react";
import { Button } from "@/components/ui/button";
import { AnalysisHands } from "./analysis-props";
import { approximateHandRangeEquity, calculateHandRangeEquity } from "@/lib/equity_utils";
import { EquityReport } from "./report-props";

interface CalculateWinButtonProps {
  analysisHands: AnalysisHands;
  setEquityReport: (report: EquityReport) => void;
}
const CalculateWinButton: React.FC<CalculateWinButtonProps> = ({
  analysisHands,
  setEquityReport,
}) => {
  const setEquities = () => {
    let preflopEquity;
    let flopEquity;
    let turnEquity;
    let riverEquity;

    const holeCards = [analysisHands.hole.hole1, analysisHands.hole.hole2];
    preflopEquity = approximateHandRangeEquity(holeCards, analysisHands.keptToFlop, 10000)[0];

    const board = [];

    if (analysisHands.keptToTurn.length > 0) {
      board.push(analysisHands.board.flop1, analysisHands.board.flop2, analysisHands.board.flop3);
      flopEquity = calculateHandRangeEquity(holeCards, analysisHands.keptToTurn, board)[0];
    }

    if (analysisHands.keptToRiver.length > 0) {
      board.push(analysisHands.board.turn);
      turnEquity = calculateHandRangeEquity(holeCards, analysisHands.keptToRiver, board)[0];
    }

    if (analysisHands.keptToShowdown.length) {
      board.push(analysisHands.board.river);
      riverEquity = calculateHandRangeEquity(holeCards, analysisHands.keptToShowdown, board)[0];
    }

    setEquityReport({
      preflop: preflopEquity,
      flop: flopEquity,
      turn: turnEquity,
      river: riverEquity,
    });
  };

  return (
    <Button
      onClick={setEquities}
      style={{
        backgroundColor: "#007bff",
      }}
    >
      Calculate Win %
    </Button>
  );
};

export default CalculateWinButton;
