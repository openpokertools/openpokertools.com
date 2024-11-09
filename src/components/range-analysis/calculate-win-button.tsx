import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { approximateHandRangeEquity, calculateHandRangeEquity } from "@/lib/equity_utils";
import React from "react";
import type { AnalysisHands } from "./analysis-props";
import type { EquityReport } from "./report-props";

interface CalculateWinButtonProps {
  analysisHands: AnalysisHands;
  setEquityReport: (report: EquityReport) => void;
}
const CalculateWinButton = ({ analysisHands, setEquityReport }: CalculateWinButtonProps) => {
  const { toast } = useToast();

  const setEquities = () => {
    if (analysisHands.hole.hole1 === undefined || analysisHands.hole.hole2 === undefined) {
      toast({
        variant: "destructive",
        description: (
          <span>
            No <strong>Hole Cards</strong> were specified!
          </span>
        ),
      });
      return;
    }

    if (analysisHands.keptToFlop.length === 0) {
      toast({
        variant: "destructive",
        description: (
          <span>
            No hands in <strong>Range</strong>!
          </span>
        ),
      });
      return;
    }

    let preflopEquity = undefined;
    let flopEquity = undefined;
    let turnEquity = undefined;
    let riverEquity = undefined;

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
      className="h-12 mr-auto my-auto"
      onClick={setEquities}
      style={{
        backgroundColor: "#007bff",
      }}
    >
      Calculate
      <br />
      Win %
    </Button>
  );
};

export default CalculateWinButton;
