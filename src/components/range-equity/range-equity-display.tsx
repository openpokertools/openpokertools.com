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
import { Player } from "./range-equity-props";
import { Button } from "../ui/button";

interface RangeEquityDisplayProps {
  players: Array<Player>;
  setPlayers: Dispatch<SetStateAction<Array<Player>>>;
  updatePlayer: (id: number, newData: Partial<Player>) => void;
}

const RangeEquityDisplay = ({
  players,
  setPlayers,
  updatePlayer,
}: RangeEquityDisplayProps) => {
  const [boardCards, setBoardCards] = useState<BoardCards>({});

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
          {players.map((player) => {
            const handleHoleCardsChange = (newHoleCards: HoleCards) => {
              updatePlayer(player.id, { holeCards: newHoleCards });
            };

            return (
              <TableRow key={player.id}>
                <TableCell className="text-center">
                  <Checkbox checked={player.active} />
                </TableCell>
                <TableCell>
                  {player.id === 0 ? "Hero" : `Villain ${player.id}`}
                </TableCell>
                <TableCell className="flex p-1">
                  <Hole
                    holeCards={player.holeCards}
                    setHoleCards={handleHoleCardsChange}
                  />
                </TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center p-10 h-0">
                  <Button className="h-[30px] p-0 m-0 bg-transparent hover:bg-transparent text-black">
                    <X />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <BoardProvider>
        <div className="border-t border-b p-3">
          <Board setBoardCards={setBoardCards} />
        </div>
        <div className="flex p-3">
          <div className="ml-auto flex gap-x-1">
            <ClearBoardButton />
            <AddPlayerButton players={players} setPlayers={setPlayers} />
            <SimulateButton />
          </div>
        </div>
      </BoardProvider>
    </PlayingCardProvider>
  );
};

export default RangeEquityDisplay;
