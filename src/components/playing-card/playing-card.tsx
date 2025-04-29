import React, { type Dispatch, type SetStateAction } from "react";

import { cn } from "@/lib/utils";

import { ReactComponent as CARD_BACK_SVG } from "../../images/card_back.svg";
import PlayingCardPopover from "./playing-card-popover";
import type { PlayingCardStateProps } from "./playing-card-props";
import { RANK_SVGS, SUIT_SVGS } from "./playing-card-svgs";

interface PlayingCardProps {
  height: number;
  playingCardState: PlayingCardStateProps;
  setPlayingCardState: Dispatch<SetStateAction<PlayingCardStateProps>>;
  className?: string;
}
const PlayingCard = ({
  height,
  playingCardState,
  setPlayingCardState,
  className,
}: PlayingCardProps) => {
  const width = (height * 2) / 3;
  const fontSize = (height * 11) / 32;

  const color = playingCardState.suit === "d" || playingCardState.suit === "h" ? "#df0000" : "#000";

  return (
    <div className={className}>
      <PlayingCardPopover
        playingCardState={playingCardState}
        setPlayingCardState={setPlayingCardState}
      >
        <div
          className={cn(
            className,
            "rounded",
            "playingcard",
            playingCardState.rank && playingCardState.suit && "border",
          )}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            fontSize: fontSize,
            fill: color,
          }}
        >
          {playingCardState.rank && playingCardState.suit ? (
            <>
              <div className="w-full h-1/2">
                <div className="translate-y-[4.5px]">{RANK_SVGS[playingCardState.rank]}</div>
              </div>
              <div className="w-full h-1/2">
                <div className="translate-y-1">{SUIT_SVGS[playingCardState.suit]}</div>
              </div>
            </>
          ) : (
            <CARD_BACK_SVG width={"100%"} height={"100%"} />
          )}
        </div>
      </PlayingCardPopover>
    </div>
  );
};

export default PlayingCard;
