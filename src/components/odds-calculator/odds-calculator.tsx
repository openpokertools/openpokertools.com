import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateHandHandEquities } from "@/lib/fast_hand_hand";
import { getPotOdds } from "@/lib/pot_odds";
import React, { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import Board from "../board/board";
import BoardProvider from "../board/board-context";
import type { BoardCards } from "../board/board-props";
import Hole from "../hole-cards/hole-cards";
import type { HoleCards } from "../hole-cards/hole-cards-props";
import PlayingCardProvider from "../playing-card/playing-card-context";

interface HoleCardStats {
  win?: number;
  tie?: number;
  potOdds?: string;
}

const OddsCalculator = () => {
  const [boardCards, setBoardCards] = useState<BoardCards>({});
  const holeCards: Array<HoleCards> = [];
  const setHoleCards: Array<Dispatch<SetStateAction<HoleCards>>> = [];
  const holeCardStats: Array<HoleCardStats> = [];
  const setHoleCardStats: Array<Dispatch<SetStateAction<HoleCardStats>>> = [];
  for (let i = 0; i < 9; i++) {
    const [h, setH] = useState<HoleCards>({});
    holeCards.push(h);
    setHoleCards.push(setH);

    const [s, setS] = useState<HoleCardStats>({});
    holeCardStats.push(s);
    setHoleCardStats.push(setS);
  }

  useEffect(() => {
    const activeHoles: Array<[string, string]> = holeCards
      .filter((holeCard) => holeCard.hole1 && holeCard.hole2)
      .map((holeCard) => [holeCard.hole1, holeCard.hole2]);

    if (activeHoles.length < 2) {
      for (let i = 0; i < 9; i++) {
        setHoleCardStats[i]({});
      }
    }

    const board: Array<string> = [];
    const flop = boardCards.flop1 && boardCards.flop2 && boardCards.flop3;
    const turn = flop && boardCards.turn;
    const river = turn && boardCards.river;

    if (flop) {
      board.push(boardCards.flop1, boardCards.flop2, boardCards.flop3);
    }

    if (turn) {
      board.push(boardCards.turn);
    }

    if (river) {
      board.push(boardCards.river);
    }

    const scores = calculateHandHandEquities(activeHoles, board);
    let scoreIndex = 0;
    for (let i = 0; i < 9; i++) {
      if (holeCards[i].hole1 && holeCards[i].hole2) {
        const newStats = {
          win: scores[0][scoreIndex] / scores[2],
          tie: scores[1][scoreIndex] / scores[2],
          potOdds: getPotOdds(scores[0][scoreIndex] / scores[2], scores[1][scoreIndex] / scores[2]),
        };
        setHoleCardStats[i](newStats);
        scoreIndex += 1;
      } else {
        setHoleCardStats[i]({});
      }
    }
  }, [...holeCards, boardCards]);

  return (
    <PlayingCardProvider>
      <div className="border-b p-3">
        <BoardProvider>
          <Board setBoardCards={setBoardCards} />
        </BoardProvider>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center" style={{ minWidth: "80px" }}>
              Cards
            </TableHead>
            <TableHead className="text-center">Win %</TableHead>
            <TableHead className="text-center">Tie %</TableHead>
            <TableHead className="text-center">Pot Odds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holeCards.map((holeCard, index) => (
            <TableRow key={`hole-${index}`}>
              <TableCell className="flex py-2">
                <Hole holeCards={holeCard} setHoleCards={setHoleCards[index]} />
              </TableCell>
              <TableCell className="text-center">
                {holeCardStats[index].win !== undefined
                  ? `${(holeCardStats[index].win * 100).toFixed(1)}%`
                  : "-"}
              </TableCell>
              <TableCell className="text-center">
                {holeCardStats[index].tie !== undefined
                  ? `${(holeCardStats[index].tie * 100).toFixed(1)}%`
                  : "-"}
              </TableCell>
              <TableCell className="text-center">
                {holeCardStats[index].potOdds !== undefined ? holeCardStats[index].potOdds : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PlayingCardProvider>
  );
};

export default OddsCalculator;
