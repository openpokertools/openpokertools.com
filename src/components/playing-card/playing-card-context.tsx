import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

import type { Card } from "@/lib/models";

interface PlayingCardContextProps {
  selectedCards: Set<Card>;
  setSelectedCards: Dispatch<SetStateAction<Set<Card>>>;
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
  const [selectedCards, setSelectedCards] = useState<Set<Card>>(new Set());

  return (
    <PlayingCardContext.Provider value={{ selectedCards, setSelectedCards }}>
      {children}
    </PlayingCardContext.Provider>
  );
};

export default PlayingCardProvider;
