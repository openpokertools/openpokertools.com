import React from "react";
import { createContext, type Dispatch, type SetStateAction, useContext, useState } from "react";

interface PlayingCardContextProps {
  selectedCards: Set<string>;
  setSelectedCards: Dispatch<SetStateAction<Set<string>>>;
}

const PlayingCardContext = createContext<PlayingCardContextProps | undefined>(undefined);

export const usePlayingCardContext = () => {
  const context = useContext(PlayingCardContext);
  if (!context) {
    throw new Error("usePlayingCardContext must be used within a PlayingCardProvider");
  }
  return context;
};

const PlayingCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  return (
    <PlayingCardContext.Provider value={{ selectedCards, setSelectedCards }}>
      {children}
    </PlayingCardContext.Provider>
  );
};

export default PlayingCardProvider;
