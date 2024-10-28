import React, { useState, Dispatch, SetStateAction } from "react";
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
import { Trash2, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import BoardProvider from "../board/board-context";
import PlayingCardProvider from "../playing-card/playing-card-context";
import ClearBoardButton from "../board/clear-board-button";
import SimulateButton from "./simulate-button";
import AddPlayerButton from "./add-player-button";
import PlayerDisplay from "./player-display";

const RangeEquityDisplay = () => {
  const [boardCards, setBoardCards] = useState<BoardCards>({});
  const holeCards: Array<HoleCards> = [];
  const setHoleCards: Array<Dispatch<SetStateAction<HoleCards>>> = [];
  for (let i = 0; i < 2; i++) {
    const [h, setH] = useState<HoleCards>({});
    holeCards.push(h);
    setHoleCards.push(setH);
  }

  return (
    <PlayingCardProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-center">Cards</TableHead>
            <TableHead className="text-center">Range</TableHead>
            <TableHead className="text-center">Win %</TableHead>
            <TableHead className="text-center">Tie %</TableHead>
            <TableHead className="text-center">Pot Odds</TableHead>
            <TableHead>
              <Trash2 className="mx-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holeCards.map((holeCard, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>
              <TableCell>Villain</TableCell>
              <TableCell className="flex py-2">
                <Hole holeCards={holeCard} setHoleCards={setHoleCards[index]} />
              </TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell>
                <X className="mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BoardProvider>
        <div className="border-t border-b p-3">
          <Board setBoardCards={setBoardCards} />
        </div>
        <div className="flex p-3">
          <div className="ml-auto flex gap-x-1">
            <ClearBoardButton />
            <AddPlayerButton />
            <SimulateButton />
          </div>
        </div>
      </BoardProvider>
    </PlayingCardProvider>
  );
};

export default RangeEquityDisplay;
