import React from "react";

import { Button } from "@/components/ui/button";
import { RANKS, SUITS } from "@/lib/constants";

import { usePlayingCardContext } from "../playing-card/playing-card-context";
import { useBoardContext } from "./board-context";
import { Card } from "@/lib/models";

const RandomBoardButton = () => {
  const { playingCardStates, setPlayingCardStates } = useBoardContext();
  const { selectedCards, setSelectedCards } = usePlayingCardContext();

  const getRandomElement = <T,>(arr: readonly T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const setAllCardsRandomly = () => {
    const newSelectedCards = new Set(selectedCards);

    for (const playingCardState of playingCardStates) {
      if (playingCardState.rank && playingCardState.suit) {
        const oldCard = playingCardState.rank + playingCardState.suit as Card;
        newSelectedCards.delete(oldCard);
      }
    }

    for (const setPlayingCardState of setPlayingCardStates) {
      let randomRank = getRandomElement(RANKS);
      let randomSuit = getRandomElement(SUITS);
      while (newSelectedCards.has(randomRank + randomSuit as Card)) {
        randomRank = getRandomElement(RANKS);
        randomSuit = getRandomElement(SUITS);
      }
      newSelectedCards.add(randomRank + randomSuit as Card);
      setPlayingCardState({ rank: randomRank, suit: randomSuit });
    }

    setSelectedCards(newSelectedCards);
  };

  return (
    <Button onClick={setAllCardsRandomly} className="bg-blue-500 hover:bg-blue-600 text-white">
      Random board
    </Button>
  );
};

export default RandomBoardButton;
