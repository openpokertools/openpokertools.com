import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import PlayingCard from "../playing-card/playing-card";
import type { PlayingCardStateProps } from "../playing-card/playing-card-props";
import type { HoleCards, HoleCardsProps } from "./hole-cards-props";

const Hole = ({ holeCards, setHoleCards, displayActive }: HoleCardsProps) => {
  const [card1State, setCard1State] = useState<PlayingCardStateProps>({});
  const [card2State, setCard2State] = useState<PlayingCardStateProps>({});

  const updateHoleCard = (
    cardState: PlayingCardStateProps,
    boardKey: keyof HoleCards,
  ) => {
    setHoleCards((prevHoleCards) => ({
      ...prevHoleCards,
      [boardKey]:
        cardState.rank && cardState.suit
          ? cardState.rank + cardState.suit
          : undefined,
    }));
  };

  useEffect(() => {
    updateHoleCard(card1State, "hole1");
  }, [card1State]);

  useEffect(() => {
    updateHoleCard(card2State, "hole2");
  }, [card2State]);

  const showActive =
    displayActive &&
    card1State.rank &&
    card1State.suit &&
    card2State.rank &&
    card2State.suit;

  return (
    <>
      <PlayingCard
        height={55}
        playingCardState={card1State}
        setPlayingCardState={setCard1State}
        className={cn("ml-auto", "mr-[1.5px]", showActive && "inplay")}
      />
      <PlayingCard
        height={55}
        playingCardState={card2State}
        setPlayingCardState={setCard2State}
        className={cn("mr-auto", "ml-[1.5px]", showActive && "inplay")}
      />
    </>
  );
};

export default Hole;
