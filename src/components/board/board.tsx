import React, { useEffect } from "react";
import PlayingCard from "../playing-card/playing-card";
import type { PlayingCardStateProps } from "../playing-card/playing-card-props";
import { useBoardContext } from "./board-context";
import type { BoardCards, BoardProps } from "./board-props";

const Board = ({ setBoardCards }: BoardProps) => {
  const { playingCardStates, setPlayingCardStates } = useBoardContext();

  const updateBoardCard = (cardState: PlayingCardStateProps, boardKey: keyof BoardCards) => {
    setBoardCards((prevBoard) => ({
      ...prevBoard,
      [boardKey]: cardState.rank && cardState.suit ? cardState.rank + cardState.suit : undefined,
    }));
  };

  useEffect(() => {
    updateBoardCard(playingCardStates[0], "flop1");
  }, [playingCardStates[0]]);

  useEffect(() => {
    updateBoardCard(playingCardStates[1], "flop2");
  }, [playingCardStates[1]]);

  useEffect(() => {
    updateBoardCard(playingCardStates[2], "flop3");
  }, [playingCardStates[2]]);

  useEffect(() => {
    updateBoardCard(playingCardStates[3], "turn");
  }, [playingCardStates[3]]);

  useEffect(() => {
    updateBoardCard(playingCardStates[4], "river");
  }, [playingCardStates[4]]);

  return (
    <div className="flex flex-row">
      <PlayingCard
        height={55}
        playingCardState={playingCardStates[0]}
        setPlayingCardState={setPlayingCardStates[0]}
        className="ml-auto mr-[1px]"
      />
      <PlayingCard
        height={55}
        playingCardState={playingCardStates[1]}
        setPlayingCardState={setPlayingCardStates[1]}
        className="mx-[1px]"
      />
      <PlayingCard
        height={55}
        playingCardState={playingCardStates[2]}
        setPlayingCardState={setPlayingCardStates[2]}
        className="ml-[1px]"
      />
      <PlayingCard
        height={55}
        playingCardState={playingCardStates[3]}
        setPlayingCardState={setPlayingCardStates[3]}
        className="mx-[5px]"
      />
      <PlayingCard
        height={55}
        playingCardState={playingCardStates[4]}
        setPlayingCardState={setPlayingCardStates[4]}
        className="mr-auto"
      />
    </div>
  );
};

export default Board;
