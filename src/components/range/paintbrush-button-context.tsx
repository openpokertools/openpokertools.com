import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

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

  return (
    <PaintbrushButtonContext.Provider value={{ selection, setSelection }}>
      {children}
    </PaintbrushButtonContext.Provider>
  );
};

export default PaintbrushButtonProvider;
