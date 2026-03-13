import React from "react";

import { Button } from "@/components/ui/button";
import type { Card } from "@/lib/models";

import { usePlayingCardContext } from "../playing-card/playing-card-context";
import { useBoardContext } from "./board-context";

const ClearBoardButton = () => {
  const { playingCardStates, setPlayingCardStates } = useBoardContext();
  const { selectedCards, setSelectedCards } = usePlayingCardContext();

  const clearAllCards = () => {
    const newSelectedCards = new Set(selectedCards);

    for (const playingCardState of playingCardStates) {
      if (playingCardState.rank && playingCardState.suit) {
        const oldCard = (playingCardState.rank + playingCardState.suit) as Card;
        newSelectedCards.delete(oldCard);
      }
    }

    for (const setPlayingCardState of setPlayingCardStates) {
      setPlayingCardState({});
    }

    setSelectedCards(newSelectedCards);
  };

  return (
    <Button onClick={clearAllCards} className="bg-neutral-400 hover:bg-neutral-500 text-white">
      Clear board
    </Button>
  );
};

export default ClearBoardButton;
