import React, { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Player, createPlayer } from "./range-equity-props";

interface AddPlayerButtonProps {
  players: Array<Player>;
  setPlayers: Dispatch<SetStateAction<Array<Player>>>;
}

const AddPlayerButton = ({ players, setPlayers }: AddPlayerButtonProps) => {
  const index = useRef(2);

  const addPlayer = () => {
    const newPlayer = createPlayer(index.current);
    index.current += 1;
    console.log(players);
    setPlayers([...players, newPlayer]);
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
