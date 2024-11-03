import React, { useState } from "react";
import DisplayContainer from "../shell/display-container";
import RangeEquityDisplay from "./range-equity-display";
import PlayerDisplay from "./player-display";
import { Player, createPlayer } from "./range-equity-props";

const RangeEquityTool = () => {
  const [players, setPlayers] = useState<Array<Player>>([
    createPlayer(0),
    createPlayer(1),
  ]);

  const updatePlayer = (id: number, newData: Partial<Player>) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, ...newData } : player,
      ),
    );
  };

  return (
    <>
      <DisplayContainer maxWidth="998px">
        <RangeEquityDisplay
          players={players}
          setPlayers={setPlayers}
          updatePlayer={updatePlayer}
        />
      </DisplayContainer>
      <div className="grid grid-cols-2 mx-auto gap-4 max-w-[998px]">
        {players.map((player) => (
          <div className="col-span-1">
            <PlayerDisplay
              key={player.id}
              player={player}
              updatePlayer={updatePlayer}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default RangeEquityTool;
