import React, { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { calculateRangeRangeEquities } from "@/lib/equity_utils";
import { getPotOdds } from "@/lib/pot_odds";
import { handsToCombos } from "@/lib/range_utils";
import { cn } from "@/lib/utils";

import type { BoardCards } from "../board/board-props";
import type { Player, PlayerStats } from "./range-equity-props";

interface SimulateButtonProps {
  players: Record<number, Player>;
  setPlayerStats: Dispatch<SetStateAction<Array<PlayerStats>>>;
  boardCards: BoardCards;
}

const SimulateButton = ({ players, setPlayerStats, boardCards }: SimulateButtonProps) => {
  const { toast } = useToast();
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsRef = useRef<Array<{ win: number; tie: number; count: number }>>([]);

  const getBoard = () => {
    if (!(boardCards.flop1 && boardCards.flop2 && boardCards.flop3)) return [];
    const board = [boardCards.flop1, boardCards.flop2, boardCards.flop3];
    if (boardCards.turn) board.push(boardCards.turn);
    if (boardCards.river) board.push(boardCards.river);
    return board;
  };

  const getPlayerCombos = (activePlayers: Player[]) => {
    return activePlayers.map((player) => {
      if (player.holeCards.hole1 && player.holeCards.hole2) {
        return [[player.holeCards.hole1, player.holeCards.hole2]];
      }
      return Array.from(handsToCombos(player.selectedHands));
    });
  };

  const simulateOnce = () => {
    const activePlayers = Object.values(players).filter((player) => player.active);
    if (activePlayers.length === 0) {
      throw "No active players to simulate";
    }

    const board = getBoard();
    const playerCombos = getPlayerCombos(activePlayers);
    const [wins, ties, total] = calculateRangeRangeEquities(playerCombos, board);

    const playerList = Object.values(players);
    if (statsRef.current.length !== playerList.length) {
      statsRef.current = playerList.map(() => ({ win: 0, tie: 0, count: 0 }));
    }

    let activeIndex = 0;
    playerList.forEach((player, i) => {
      if (player.active) {
        statsRef.current[i].win += wins[activeIndex];
        statsRef.current[i].tie += ties[activeIndex];
        statsRef.current[i].count += total;
        activeIndex++;
      }
    });

    const updatedStats = playerList.map((player, i) => {
      if (!player.active) return { id: player.id };

      const { win, tie, count } = statsRef.current[i];
      const winPct = win / count;
      const tiePct = tie / count;
      return {
        id: player.id,
        win: winPct,
        tie: tiePct,
        potOdds: getPotOdds(winPct, winPct),
      };
    });

    setPlayerStats(updatedStats);
  };

  const startSimulation = () => {
    if (running) return;
    statsRef.current = [];
    const wrappedSimulateOnce = () => {
      try {
        simulateOnce();
      } catch (error) {
        toast({
          variant: "destructive",
          description: String(error),
        });
        stopSimulation();
        return;
      }
    };
    wrappedSimulateOnce();
    intervalRef.current = setInterval(wrappedSimulateOnce, 300);
    setRunning(true);
  };

  const stopSimulation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  };

  const handleClick = () => {
    if (running) {
      stopSimulation();
    } else {
      startSimulation();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "text-white",
        running ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
      )}
    >
      {running ? "Stop" : "Simulate"}
    </Button>
  );
};

export default SimulateButton;
