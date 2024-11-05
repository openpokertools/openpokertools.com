import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SUIT_SVGS } from "./playing-card-svgs";
import { PlayingCardStateProps } from "./playing-card-props";
import { RANKS, SUITS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { usePlayingCardContext } from "./playing-card-context";

interface PlayingCardPopoverProps {
  playingCardState: PlayingCardStateProps;
  setPlayingCardState: (values: { rank?: string; suit?: string }) => void;
  children: React.ReactNode;
}
const PlayingCardPopover: React.FC<PlayingCardPopoverProps> = ({
  playingCardState,
  setPlayingCardState,
  children,
}) => {
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
  const fontSize = height / 2;

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
                      background: isAvailable ? "#ffffff" : "#d0d0d0",
                    }}
                  >
                    <div
                      className="text-center"
                      style={{
                        width: "100%",
                        height: "50%",
                        color: suit === "d" || suit === "h" ? "#df0000" : "#000",
                      }}
                    >
                      <div style={{ fontSize: fontSize, lineHeight: "100%" }}>{rank}</div>
                    </div>
                    <div className="text-center" style={{ width: "100%", height: "50%" }}>
                      {SUIT_SVGS[suit]}
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
