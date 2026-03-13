import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import PaintbrushCursor from "./paintbrush-cursor";

interface PaintbrushSelection {
  kind: string;
  selection: string;
}

interface PaintbrushButtonContextProps {
  selection?: PaintbrushSelection;
  setSelection: Dispatch<SetStateAction<PaintbrushSelection | undefined>>;
}

const PaintbrushButtonContext = createContext<PaintbrushButtonContextProps | undefined>(undefined);

export const usePaintbrushButtonContext = () => {
  const context = useContext(PaintbrushButtonContext);
  if (!context) {
    throw new Error("usePaintbrushButtonContext must be used within a PaintbrushButtonProvider");
  }
  return context;
};

const PaintbrushButtonProvider = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<PaintbrushSelection | undefined>(undefined);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelection(undefined);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PaintbrushButtonContext.Provider value={{ selection, setSelection }}>
      {children}
      <PaintbrushCursor />
    </PaintbrushButtonContext.Provider>
  );
};

export default PaintbrushButtonProvider;
