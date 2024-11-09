import React, { useMemo } from "react";
import RangeSelector from "../range/range-selector";
import type { Player } from "./range-equity-props";

interface PlayerDisplayProps {
  player: Player;
  updatePlayer: (id: number, newData: Partial<Player>) => void;
}

const PlayerDisplay = ({ player, updatePlayer }: PlayerDisplayProps) => {
  const handleSelectedHandsChange = (newHands: Set<string>) => {
    updatePlayer(player.id, { selectedHands: newHands });
  };

  return useMemo(
    () => (
      <div className="rounded player mx-auto max-w-[480px]" data-nosnippet>
        <RangeSelector
          selectedHands={player.selectedHands}
          setSelectedHands={handleSelectedHandsChange}
          name={player.id === 0 ? "Hero" : `Villain ${player.id}`}
        />
      </div>
    ),
    [player.selectedHands],
  );
};

export default PlayerDisplay;
