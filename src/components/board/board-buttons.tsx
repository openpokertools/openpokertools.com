import React, { useState, useEffect } from "react";
import PlayingCard from "../playing-card/playing-card";
import { PlayingCardStateProps } from "../playing-card/playing-card-props";
import RandomBoardButton from "./random-board-button";
import ClearBoardButton from "./clear-board-button";
import { BoardProps, BoardCards } from "./board-props";

const Board: React.FC<BoardProps> = ({
  selectedCards,
  setSelectedCards,
  boardCards,
  setBoardCards,
}) => {
  const [card1State, setCard1State] = useState<PlayingCardStateProps>({});
  const [card2State, setCard2State] = useState<PlayingCardStateProps>({});
  const [card3State, setCard3State] = useState<PlayingCardStateProps>({});
  const [card4State, setCard4State] = useState<PlayingCardStateProps>({});
  const [card5State, setCard5State] = useState<PlayingCardStateProps>({});
  const playingCardStates = [card1State, card2State, card3State, card4State, card5State];
  const setPlayingCardStates = [
    setCard1State,
    setCard2State,
    setCard3State,
    setCard4State,
    setCard5State,
  ];

  const updateBoardCard = (cardState: PlayingCardStateProps, boardKey: keyof BoardCards) => {
    setBoardCards((prevBoard) => ({
      ...prevBoard,
      [boardKey]: cardState.rank && cardState.suit ? cardState.rank + cardState.suit : undefined,
    }));
  };
  useEffect(() => {
    updateBoardCard(card1State, "flop1");
  }, [card1State]);

  useEffect(() => {
    updateBoardCard(card2State, "flop2");
  }, [card2State]);

  useEffect(() => {
    updateBoardCard(card3State, "flop3");
  }, [card3State]);

  useEffect(() => {
    updateBoardCard(card4State, "turn");
  }, [card4State]);

  useEffect(() => {
    updateBoardCard(card5State, "river");
  }, [card5State]);

  return (
    <>
      <div className="flex flex-row my-2">
        <div className="ml-auto mr-1">
          <RandomBoardButton
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            playingCardStates={playingCardStates}
            setPlayingCardStates={setPlayingCardStates}
          />
        </div>
        <div className="mr-auto ml-1">
          <ClearBoardButton
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            playingCardStates={playingCardStates}
            setPlayingCardStates={setPlayingCardStates}
          />
        </div>
      </div>
    </>
  );
};

export default Board;
