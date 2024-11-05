import { Button } from "@/components/ui/button";
import { RANKS, SUITS } from "@/lib/constants";
import React from "react";
import { usePlayingCardContext } from "../playing-card/playing-card-context";
import { useBoardContext } from "./board-context";

const RandomBoardButton = () => {
  const { playingCardStates, setPlayingCardStates } = useBoardContext();
  const { selectedCards, setSelectedCards } = usePlayingCardContext();

  const getRandomElement = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const setAllCardsRandomly = () => {
    const newSelectedCards = new Set(selectedCards);

    playingCardStates.forEach((playingCardState) => {
      if (playingCardState.rank && playingCardState.suit) {
        const oldCard = playingCardState.rank + playingCardState.suit;
        newSelectedCards.delete(oldCard);
      }
    });

    setPlayingCardStates.forEach((setPlayingCardState) => {
      let randomRank = getRandomElement(RANKS);
      let randomSuit = getRandomElement(SUITS);
      while (newSelectedCards.has(randomRank + randomSuit)) {
        randomRank = getRandomElement(RANKS);
        randomSuit = getRandomElement(SUITS);
      }
      newSelectedCards.add(randomRank + randomSuit);
      setPlayingCardState({ rank: randomRank, suit: randomSuit });
    });

    setSelectedCards(newSelectedCards);
  };

  return (
    <Button
      onClick={setAllCardsRandomly}
      style={{
        backgroundColor: "#007bff",
      }}
    >
      Random board
    </Button>
  );
};

export default RandomBoardButton;
