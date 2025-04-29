import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RANKS, SUITS } from "@/lib/constants";

import { usePlayingCardContext } from "./playing-card-context";
import type { PlayingCardStateProps } from "./playing-card-props";
import { RANK_SVGS, SUIT_SVGS } from "./playing-card-svgs";

interface PlayingCardPopoverProps {
  playingCardState: PlayingCardStateProps;
  setPlayingCardState: (values: { rank?: string; suit?: string }) => void;
  children: React.ReactNode;
}
const PlayingCardPopover = ({
  playingCardState,
  setPlayingCardState,
  children,
}: PlayingCardPopoverProps) => {
  const { selectedCards, setSelectedCards } = usePlayingCardContext();
  const [open, setOpen] = useState(false);

  const handleCardSelect = (rank: string, suit: string) => {
    const newSelectedCards = new Set(selectedCards);

    if (playingCardState.rank && playingCardState.suit) {
      const oldCard = playingCardState.rank + playingCardState.suit;
      newSelectedCards.delete(oldCard);
    }

    const newCard = rank + suit;
    newSelectedCards.add(newCard);
    setSelectedCards(newSelectedCards);

    setPlayingCardState({ rank, suit });
    setOpen(false);
  };

  const handleClearCard = () => {
    if (playingCardState.rank && playingCardState.suit) {
      const newSelectedCards = new Set(selectedCards);
      const oldCard = playingCardState.rank + playingCardState.suit;
      newSelectedCards.delete(oldCard);
      setSelectedCards(newSelectedCards);
    }

    setPlayingCardState({});
    setOpen(false);
  };

  const height = 40;
  const width = (height * 2) / 3;
  const fontSize = (height * 11) / 32;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-90">
        <div className="grid gap-1">
          {SUITS.map((suit) => (
            <div key={suit} className="flex flex-row gap-1">
              {RANKS.map((rank) => {
                const isSelected = playingCardState.rank === rank && playingCardState.suit === suit;
                const isCardTaken = selectedCards.has(rank + suit);
                const isAvailable = !isSelected && !isCardTaken;
                const color = suit === "d" || suit === "h" ? "#df0000" : "#000";

                return (
                  <div
                    key={`${rank}-${suit}`}
                    onClick={() => isAvailable && handleCardSelect(rank, suit)}
                    className={`rounded playingcard border ${
                      isAvailable ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    style={{
                      display: "inline-block",
                      height: height,
                      width: width,
                      fontSize: fontSize,
                      background: isAvailable ? "#ffffff" : "#d0d0d0",
                      fill: color,
                    }}
                  >
                    <div className="w-full h-1/2">
                      <div className="translate-y-[3.5px]">{RANK_SVGS[rank]}</div>
                    </div>
                    <div className="w-full h-1/2">
                      <div className="translate-y-[2.5px]">{SUIT_SVGS[suit]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="mt-2"
          onClick={handleClearCard}
          style={{ width: "100%" }}
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default PlayingCardPopover;
