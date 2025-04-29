import React from "react";

import { Button } from "@/components/ui/button";

import { usePlayingCardContext } from "../playing-card/playing-card-context";
import { useBoardContext } from "./board-context";

const ClearBoardButton = () => {
  const { playingCardStates, setPlayingCardStates } = useBoardContext();
  const { selectedCards, setSelectedCards } = usePlayingCardContext();

  const clearAllCards = () => {
    const newSelectedCards = new Set(selectedCards);

    for (const playingCardState of playingCardStates) {
      if (playingCardState.rank && playingCardState.suit) {
        const oldCard = playingCardState.rank + playingCardState.suit;
        newSelectedCards.delete(oldCard);
      }
    }

    for (const setPlayingCardState of setPlayingCardStates) {
      setPlayingCardState({});
    }

    setSelectedCards(newSelectedCards);
  };

  return (
    <Button
      onClick={clearAllCards}
      style={{
        backgroundColor: "grey",
      }}
    >
      Clear board
    </Button>
  );
};

export default ClearBoardButton;
