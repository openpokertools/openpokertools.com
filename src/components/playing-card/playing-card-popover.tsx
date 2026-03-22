import React from "react";

import { PopoverArrow } from "@radix-ui/react-popover";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RANKS, SUITS } from "@/lib/constants";
import type { Card, Rank, Suit } from "@/lib/models";
import { cn } from "@/lib/utils";

import { useFourColorDeck } from "./four-color-deck-context";
import { usePlayingCardContext } from "./playing-card-context";
import { usePlayingCardPopoverContext } from "./playing-card-popover-context";
import type { PlayingCardStateProps } from "./playing-card-props";
import { RANK_SVGS, SUIT_SVGS } from "./playing-card-svgs";

interface PlayingCardPopoverProps {
  index: number;
  playingCardState: PlayingCardStateProps;
  setPlayingCardState: (values: { rank?: Rank; suit?: Suit }) => void;
  children: React.ReactNode;
}
const PlayingCardPopover = ({
  index,
  playingCardState,
  setPlayingCardState,
  children,
}: PlayingCardPopoverProps) => {
  const { selectedCards, setSelectedCards } = usePlayingCardContext();
  const { open, setOpenAtIndex } = usePlayingCardPopoverContext();
  const { fourColor, setFourColor } = useFourColorDeck();

  const handleCardSelect = (rank: Rank, suit: Suit) => {
    const newSelectedCards = new Set(selectedCards);

    if (playingCardState.rank && playingCardState.suit) {
      const oldCard = (playingCardState.rank + playingCardState.suit) as Card;
      newSelectedCards.delete(oldCard);
    }

    const newCard = (rank + suit) as Card;
    newSelectedCards.add(newCard);
    setSelectedCards(newSelectedCards);

    setPlayingCardState({ rank, suit });
    setOpenAtIndex(index, false);
    setOpenAtIndex(index + 1, true);
  };

  const handleClearCard = () => {
    if (playingCardState.rank && playingCardState.suit) {
      const newSelectedCards = new Set(selectedCards);
      const oldCard = (playingCardState.rank + playingCardState.suit) as Card;
      newSelectedCards.delete(oldCard);
      setSelectedCards(newSelectedCards);
    }

    setPlayingCardState({});
    setOpenAtIndex(index, false);
    setOpenAtIndex(index + 1, true);
  };

  const height = 40;
  const width = (height * 2) / 3;
  const fontSize = (height * 11) / 32;

  return (
    <Popover open={open[index]} onOpenChange={(value) => setOpenAtIndex(index, value)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-90">
        <PopoverArrow className="popover-arrow" width={12} height={7} aria-hidden="true" />
        <div className="grid gap-1">
          {SUITS.map((suit) => (
            <div key={suit} className="flex flex-row gap-1">
              {RANKS.map((rank) => {
                const isSelected = playingCardState.rank === rank && playingCardState.suit === suit;
                const isCardTaken = selectedCards.has((rank + suit) as Card);
                const isAvailable = !isSelected && !isCardTaken;
                const color = fourColor
                  ? suit === "h" ? "#df0000" : suit === "d" ? "blue" : suit === "c" ? "green" : "#000"
                  : suit === "d" || suit === "h" ? "#df0000" : "#000";

                return (
                  <button
                    type="button"
                    key={`${rank}-${suit}`}
                    onClick={() => isAvailable && handleCardSelect(rank, suit)}
                    className={cn(
                      "rounded playingcard border",
                      isAvailable ? "cursor-pointer" : "cursor-not-allowed",
                      isAvailable ? "bg-white hover:bg-accent" : "bg-neutral-300",
                    )}
                    style={{
                      display: "inline-block",
                      height: height,
                      width: width,
                      fontSize: fontSize,
                      fill: color,
                    }}
                  >
                    <div className="w-full h-1/2">
                      <div className="translate-y-[3.5px]">{RANK_SVGS[rank]}</div>
                    </div>
                    <div className="w-full h-1/2">
                      <div className="translate-y-[2.5px]">{SUIT_SVGS[suit]}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            className="flex-1 bg-white hover:bg-accent"
            onClick={handleClearCard}
          >
            Clear
          </Button>
          <Button
            variant="outline"
            className="bg-white hover:bg-accent px-2 text-base leading-none"
            onClick={() => setFourColor(!fourColor)}
          >
            <span style={{ color: "#000" }}>♠</span>
            <span style={{ color: "#df0000" }}>♥</span>
            <span style={{ color: fourColor ? "#000" : "green" }}>♣</span>
            <span style={{ color: fourColor ? "#df0000" : "blue" }}>♦</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlayingCardPopover;
