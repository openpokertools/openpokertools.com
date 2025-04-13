import { Button } from "@/components/ui/button";
import React, { type Dispatch, type SetStateAction, useRef } from "react";
import {
  type Player,
  type PlayerStats,
  createPlayer,
} from "./range-equity-props";

interface AddPlayerButtonProps {
  players: Array<Player>;
  setPlayers: Dispatch<SetStateAction<Array<Player>>>;
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
    setPlayers([...players, newPlayer]);

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
