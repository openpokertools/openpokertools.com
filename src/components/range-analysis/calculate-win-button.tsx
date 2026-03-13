import React from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { approximateHandRangeEquity, calculateHandRangeEquity } from "@/lib/equity_utils";
import type { Card, Combo } from "@/lib/models";

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

    const holeCards = [analysisHands.hole.hole1, analysisHands.hole.hole2] as Combo;
    const preflopEquity = approximateHandRangeEquity(
      holeCards,
      analysisHands.keptToFlop,
      10000,
    ).equity;

    const board: Array<Card> = [];

    let flopEquity: number | undefined;
    if (analysisHands.keptToTurn.length > 0) {
      board.push(analysisHands.board.flop1, analysisHands.board.flop2, analysisHands.board.flop3);
      flopEquity = calculateHandRangeEquity(holeCards, analysisHands.keptToTurn, board).equity;
    }

    let turnEquity: number | undefined;
    if (analysisHands.keptToRiver.length > 0) {
      board.push(analysisHands.board.turn);
      turnEquity = calculateHandRangeEquity(holeCards, analysisHands.keptToRiver, board).equity;
    }

    let riverEquity: number | undefined;
    if (analysisHands.keptToShowdown.length > 0) {
      board.push(analysisHands.board.river);
      riverEquity = calculateHandRangeEquity(holeCards, analysisHands.keptToShowdown, board).equity;
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
      className="h-12 mr-auto my-auto bg-blue-500 hover:bg-blue-600 text-white"
      onClick={setEquities}
    >
      Calculate
      <br />
      Equity
    </Button>
  );
};

export default CalculateWinButton;
