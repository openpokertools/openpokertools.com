import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

interface PlayingCardPopoverContextProps {
  open: Array<boolean>;
  setOpen: Dispatch<SetStateAction<Array<boolean>>>;
  setOpenAtIndex: (index: number, value: boolean) => void;
}

const PlayingCardPopoverContext = createContext<PlayingCardPopoverContextProps | undefined>(
  undefined,
);

export const usePlayingCardPopoverContext = () => {
  const context = useContext(PlayingCardPopoverContext);
  if (!context) {
    throw new Error("usePlayingCardPopoverContext must be used within a PlayingCardProvider");
  }
  return context;
};

interface PlayingCardPopoverProviderProps {
  n: number;
  children: React.ReactNode;
}
const PlayingCardPopoverProvider = ({ n, children }: PlayingCardPopoverProviderProps) => {
  const [open, setOpen] = useState(() => Array(n).fill(false));

  const setOpenAtIndex = (index: number, value: boolean) => {
    setOpen((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <PlayingCardPopoverContext.Provider value={{ open, setOpen, setOpenAtIndex }}>
      {children}
    </PlayingCardPopoverContext.Provider>
  );
};

export default PlayingCardPopoverProvider;
