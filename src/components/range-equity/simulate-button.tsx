import { Button } from "@/components/ui/button";
import { calculateRangeRangeEquities } from "@/lib/equity_utils";
import { getPotOdds } from "@/lib/pot_odds";
import { handsToCombos } from "@/lib/range_utils";
import React, { Dispatch, SetStateAction } from "react";
import { BoardCards } from "../board/board-props";
import { Player, PlayerStats } from "./range-equity-props";

interface SimulateButtonProps {
  players: Array<Player>;
  setPlayerStats: Dispatch<SetStateAction<Array<PlayerStats>>>;
  boardCards: BoardCards;
}

const SimulateButton = ({ players, setPlayerStats, boardCards }: SimulateButtonProps) => {
  const simulate = () => {
    const activePlayers = players.filter((player) => player.active);
    const playerCombos = activePlayers.map((player) =>
      Array.from(handsToCombos(player.selectedHands)),
    );
    const board: Array<string> = [];
    if (boardCards.flop1 && boardCards.flop2 && boardCards.flop3) {
      board.push(boardCards.flop1, boardCards.flop2, boardCards.flop3);
      if (boardCards.turn) {
        board.push(boardCards.turn);
        if (boardCards.river) {
          board.push(boardCards.river);
        }
      }
    }

    const equities = calculateRangeRangeEquities(playerCombos, board);

    let index = 0;
    const newPlayerStats: Array<PlayerStats> = [];
    players.forEach((player) => {
      if (player.active) {
        const stats = {
          id: player.id,
          win: equities[0][index] / equities[2],
          tie: equities[1][index] / equities[2],
          potOdds: getPotOdds(equities[0][index] / equities[2], equities[0][index] / equities[2]),
        };
        newPlayerStats.push(stats);
        index++;
      } else {
        newPlayerStats.push({ id: player.id });
      }
    });
    setPlayerStats(newPlayerStats);
  };

  return (
    <Button
      onClick={simulate}
      style={{
        backgroundColor: "#007bff",
      }}
    >
      Simulate
    </Button>
  );
};

export default SimulateButton;
