import React from "react";
import { Button } from "@/components/ui/button";
import { useBoardContext } from "./board-context";
import { usePlayingCardContext } from "../playing-card/playing-card-context";

const ClearBoardButton = () => {
  const { playingCardStates, setPlayingCardStates } = useBoardContext();
  const { selectedCards, setSelectedCards } = usePlayingCardContext();

  const clearAllCards = () => {
    const newSelectedCards = new Set(selectedCards);

    playingCardStates.forEach((playingCardState) => {
      if (playingCardState.rank && playingCardState.suit) {
        const oldCard = playingCardState.rank + playingCardState.suit;
        newSelectedCards.delete(oldCard);
      }
    });

    setPlayingCardStates.forEach((setPlayingCardState) => {
      setPlayingCardState({});
    });

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
