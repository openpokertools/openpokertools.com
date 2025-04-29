import React, { useState } from "react";

import RangeLoaderProvider from "../range/range-loader-context";
import DisplayContainer from "../shell/display-container";
import PlayerDisplay from "./player-display";
import RangeEquityDisplay from "./range-equity-display";
import { createPlayer, type Player } from "./range-equity-props";

const RangeEquityTool = () => {
  const [players, setPlayers] = useState<Record<number, Player>>({
    0: createPlayer(0),
    1: createPlayer(1),
  });

  const updatePlayer = (id: number, newData: Partial<Player>) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [id]: {
        ...prevPlayers[id],
        ...newData,
      },
    }));
  };

  return (
    <>
      <DisplayContainer maxWidth="960px">
        <RangeEquityDisplay players={players} setPlayers={setPlayers} updatePlayer={updatePlayer} />
      </DisplayContainer>
      <div className="grid grid-cols-1 min-[955px]:grid-cols-2 mx-auto gap-4 max-w-[960px]">
        <RangeLoaderProvider>
          {Object.values(players).map((player) => (
            <div key={player.id} className="col-span-1">
              <PlayerDisplay player={player} updatePlayer={updatePlayer} />
            </div>
          ))}
        </RangeLoaderProvider>
      </div>
    </>
  );
};

export default RangeEquityTool;
