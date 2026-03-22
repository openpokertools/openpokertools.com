import React, { createContext, useContext, useState } from "react";

interface FourColorDeckContextType {
  fourColor: boolean;
  setFourColor: (value: boolean) => void;
}

const FourColorDeckContext = createContext<FourColorDeckContextType>({
  fourColor: false,
  setFourColor: () => {},
});

export const FourColorDeckProvider = ({ children }: { children: React.ReactNode }) => {
  const [fourColor, setFourColorState] = useState<boolean>(() => {
    if (typeof localStorage === "undefined") return false;
    return localStorage.getItem("fourColorDeck") === "true";
  });

  const setFourColor = (value: boolean) => {
    setFourColorState(value);
    localStorage.setItem("fourColorDeck", String(value));
  };

  return (
    <FourColorDeckContext.Provider value={{ fourColor, setFourColor }}>
      {children}
    </FourColorDeckContext.Provider>
  );
};

export const useFourColorDeck = () => useContext(FourColorDeckContext);
