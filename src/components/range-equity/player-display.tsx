import React, { type Dispatch, type SetStateAction, useMemo } from "react";

import type { HandModifiers } from "../range/range-props";
import RangeSelector from "../range/range-selector";
import type { Player } from "./range-equity-props";

interface PlayerDisplayProps {
  player: Player;
  updatePlayer: (id: number, newData: Partial<Player>) => void;
}

const PlayerDisplay = ({ player, updatePlayer }: PlayerDisplayProps) => {
  const handleSelectedHandsChange: Dispatch<SetStateAction<Set<string>>> = (newHandsOrUpdater) => {
    const newHands =
      typeof newHandsOrUpdater === "function"
        ? newHandsOrUpdater(player.selectedHands)
        : newHandsOrUpdater;

    updatePlayer(player.id, { selectedHands: newHands });
  };

  const handleHandModifiersChange: Dispatch<SetStateAction<Map<string, HandModifiers>>> = (
    newModifiersOrUpdater,
  ) => {
    const newModifiers =
      typeof newModifiersOrUpdater === "function"
        ? newModifiersOrUpdater(player.handModifiers)
        : newModifiersOrUpdater;

    updatePlayer(player.id, { handModifiers: newModifiers });
  };

  return useMemo(
    () => (
      <div className="rounded player mx-auto max-w-[480px]" data-nosnippet>
        <RangeSelector
          selectedHands={player.selectedHands}
          setSelectedHands={handleSelectedHandsChange}
          handModifiers={player.handModifiers}
          setHandModifiers={handleHandModifiersChange}
          name={player.id === 0 ? "Hero" : `Villain ${player.id}`}
        />
      </div>
    ),
    [player.selectedHands, player.handModifiers, player.id],
  );
};

export default PlayerDisplay;
