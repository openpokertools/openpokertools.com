import { StaticImage } from "gatsby-plugin-image";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
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
  const fontSize = height * 11 / 32;

  let color = "#000";
  if (playingCardState.suit === "d" || playingCardState.suit === "h") {
    color = "#df0000";
  }

  return (
    <div className={className}>
      <PlayingCardPopover
        playingCardState={playingCardState}
        setPlayingCardState={setPlayingCardState}
      >
        <div
          className="rounded playingcard border"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            fontSize: fontSize,
          }}
        >
          {playingCardState.rank && playingCardState.suit ? (
            <>
              <div className="w-full h-1/2">
                <div className="translate-y-[5px]">
                  {RANK_SVGS[playingCardState.rank]}
                </div>
              </div>
              <div className="w-full h-1/2">
                <div className="translate-y-1">
                  {SUIT_SVGS[playingCardState.suit]}
                </div>
              </div>
            </>
          ) : (
            <StaticImage
              src="../../images/card_back.png"
              alt="Card back"
              layout="fixed"
              style={{ width: "100%", height: "100%" }}
              placeholder="none"
            />
          )}
        </div>
      </PlayingCardPopover>
    </div>
  );
};

export default PlayingCard;
