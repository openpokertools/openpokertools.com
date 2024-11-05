import React, { useState, createContext, useContext, Dispatch, SetStateAction } from "react";
import { PlayingCardStateProps } from "../playing-card/playing-card-props";

interface BoardContextProps {
  playingCardStates: PlayingCardStateProps[];
  setPlayingCardStates: Dispatch<SetStateAction<PlayingCardStateProps>>[];
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <BoardContext.Provider value={{ playingCardStates, setPlayingCardStates }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
