import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Underline, X } from "lucide-react";
import React, { useState, Dispatch, SetStateAction } from "react";
import Board from "../board/board";
import BoardProvider from "../board/board-context";
import { BoardCards } from "../board/board-props";
import ClearBoardButton from "../board/clear-board-button";
import Hole from "../hole-cards/hole-cards";
import { HoleCards } from "../hole-cards/hole-cards-props";
import PlayingCardProvider from "../playing-card/playing-card-context";
import { Button } from "../ui/button";
import AddPlayerButton from "./add-player-button";
import { Player, PlayerStats } from "./range-equity-props";
import SimulateButton from "./simulate-button";

interface RangeEquityDisplayProps {
  players: Array<Player>;
  setPlayers: Dispatch<SetStateAction<Array<Player>>>;
  updatePlayer: (id: number, newData: Partial<Player>) => void;
}

const RangeEquityDisplay = ({ players, setPlayers, updatePlayer }: RangeEquityDisplayProps) => {
  const [playerStats, setPlayerStats] = useState<Array<PlayerStats>>([{ id: 0 }, { id: 1 }]);
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
          {players.map((player, index) => {
            const handleHoleCardsChange = (newHoleCards: HoleCards) => {
              updatePlayer(player.id, { holeCards: newHoleCards });
            };

            const handleDeletePlayer = () => {
              const newPlayers = players.filter((p) => p.id != player.id);
              setPlayers(newPlayers);
              const newPlayerStats = playerStats.filter((p) => p.id != player.id);
              setPlayerStats(newPlayerStats);
            };

            const handleTogglePlayer = (isChecked: boolean) => {
              updatePlayer(player.id, { active: isChecked });
            };

            return (
              <TableRow key={`${player.id}_stats_row`}>
                <TableCell className="text-center">
                  <Checkbox checked={player.active} onCheckedChange={handleTogglePlayer} />
                </TableCell>
                <TableCell>{player.id === 0 ? "Hero" : `Villain ${player.id}`}</TableCell>
                <TableCell className="flex p-1">
                  <Hole holeCards={player.holeCards} setHoleCards={handleHoleCardsChange} />
                </TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">
                  {playerStats[index].win !== undefined
                    ? (playerStats[index].win * 100).toFixed(1) + "%"
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {playerStats[index].tie !== undefined
                    ? (playerStats[index].tie * 100).toFixed(1) + "%"
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {playerStats[index].potOdds !== undefined ? playerStats[index].potOdds : "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={handleDeletePlayer}
                    className="p-0 bg-transparent hover:bg-transparent text-black mt-[8px] h-fit"
                  >
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
            <AddPlayerButton
              players={players}
              setPlayers={setPlayers}
              playerStats={playerStats}
              setPlayerStats={setPlayerStats}
            />
            <SimulateButton
              players={players}
              setPlayerStats={setPlayerStats}
              boardCards={boardCards}
            />
          </div>
        </div>
      </BoardProvider>
    </PlayingCardProvider>
  );
};

export default RangeEquityDisplay;
