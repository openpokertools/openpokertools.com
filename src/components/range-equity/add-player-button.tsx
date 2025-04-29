import React, { type Dispatch, type SetStateAction, useRef } from "react";

import { Button } from "@/components/ui/button";

import { createPlayer, type Player, type PlayerStats } from "./range-equity-props";

interface AddPlayerButtonProps {
  players: Record<number, Player>;
  setPlayers: Dispatch<SetStateAction<Record<number, Player>>>;
  playerStats: Array<PlayerStats>;
  setPlayerStats: Dispatch<SetStateAction<Array<PlayerStats>>>;
}

const AddPlayerButton = ({
  players,
  setPlayers,
  playerStats,
  setPlayerStats,
}: AddPlayerButtonProps) => {
  const index = useRef(2);

  const addPlayer = () => {
    const newPlayer = createPlayer(index.current);
    index.current += 1;
    setPlayers((prev) => ({
      ...prev,
      [newPlayer.id]: newPlayer,
    }));

    const newPlayerStats = { id: newPlayer.id };
    setPlayerStats([...playerStats, newPlayerStats]);
  };

  return (
    <Button
      onClick={addPlayer}
      style={{
        backgroundColor: "grey",
      }}
    >
      Add player
    </Button>
  );
};

export default AddPlayerButton;
