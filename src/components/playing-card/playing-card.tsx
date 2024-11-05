import React, { Dispatch, SetStateAction } from "react";
import { SUIT_SVGS } from "./playing-card-svgs";
import { PlayingCardStateProps } from "./playing-card-props";
import PlayingCardPopover from "./playing-card-popover";
import { StaticImage } from "gatsby-plugin-image";

interface PlayingCardProps {
  height: number;
  playingCardState: PlayingCardStateProps;
  setPlayingCardState: Dispatch<SetStateAction<PlayingCardStateProps>>;
  className?: string;
}
const PlayingCard: React.FC<PlayingCardProps> = ({
  height,
  playingCardState,
  setPlayingCardState,
  className,
}) => {
  const width = (height * 2) / 3;
  const fontSize = height / 2;

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
          }}
        >
          {playingCardState.rank && playingCardState.suit ? (
            <>
              <div
                className="text-center"
                style={{
                  width: "100%",
                  height: "50%",
                  color: color,
                }}
              >
                <div
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: "100%",
                  }}
                >
                  {playingCardState.rank}
                </div>
              </div>
              <div className="text-center" style={{ width: "100%", height: "50%" }}>
                {SUIT_SVGS[playingCardState.suit]}
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
