import { Button } from "@/components/ui/button";
import React from "react";
import { usePlayingCardContext } from "../playing-card/playing-card-context";
import { useBoardContext } from "./board-context";

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
