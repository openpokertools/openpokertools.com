import React, { type Dispatch, type SetStateAction, useRef } from "react";

import { Button } from "@/components/ui/button";

import { createPlayer, type Player, type PlayerStats } from "./range-equity-props";

interface AddPlayerButtonProps {
  setPlayers: Dispatch<SetStateAction<Record<number, Player>>>;
  playerStats: Array<PlayerStats>;
  setPlayerStats: Dispatch<SetStateAction<Array<PlayerStats>>>;
}

const AddPlayerButton = ({
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
    <Button onClick={addPlayer} className="bg-neutral-400 hover:bg-neutral-500 text-white">
      Add player
    </Button>
  );
};

export default AddPlayerButton;
