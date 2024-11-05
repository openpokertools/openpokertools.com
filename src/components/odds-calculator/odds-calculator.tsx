import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { HoleCards } from "../hole-cards/hole-cards-props";
import { BoardCards } from "../board/board-props";
import Hole from "../hole-cards/hole-cards";
import Board from "../board/board";
import BoardProvider from "../board/board-context";
import PlayingCardProvider from "../playing-card/playing-card-context";
import { calculateHandHandEquities } from "@/lib/fast_hand_hand";
import { getPotOdds } from "@/lib/pot_odds";

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
    const activeHoles: Array<Array<string>> = holeCards
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
    console.log(scores);
    let scoreIndex: number = 0;
    for (let i = 0; i < 9; i++) {
      if (holeCards[i].hole1 && holeCards[i].hole2) {
        const newStats = {
          win: scores[0][scoreIndex] / scores[2],
          tie: scores[0][scoreIndex] / scores[2],
          potOdds: getPotOdds(scores[0][scoreIndex] / scores[2], scores[0][scoreIndex] / scores[2]),
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
            <TableRow key={index}>
              <TableCell className="flex py-2">
                <Hole holeCards={holeCard} setHoleCards={setHoleCards[index]} />
              </TableCell>
              <TableCell className="text-center">
                {holeCardStats[index].win !== undefined
                  ? (holeCardStats[index].win * 100).toFixed(1) + "%"
                  : "-"}
              </TableCell>
              <TableCell className="text-center">
                {holeCardStats[index].tie !== undefined
                  ? (holeCardStats[index].tie * 100).toFixed(1) + "%"
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
