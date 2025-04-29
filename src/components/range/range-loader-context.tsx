import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { UserRange } from "./range-props";

interface RangeLoaderContextProps {
  userRanges: Array<UserRange>;
  setUserRanges: Dispatch<SetStateAction<Array<UserRange>>>;
}

const RangeLoaderContext = createContext<RangeLoaderContextProps | undefined>(undefined);
export const useRangeLoaderContext = () => {
  const context = useContext(RangeLoaderContext);
  if (!context) {
    throw new Error("useRangeLoaderContext must be used within a RangeProvider");
  }
  return context;
};

const RangeLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRanges, setUserRanges] = useState<Array<UserRange>>([]);

  const loadUserRangesFromLocalStorage = (): UserRange[] => {
    return JSON.parse(localStorage.getItem("user_ranges") || "[]");
  };

  useEffect(() => {
    const savedRanges = loadUserRangesFromLocalStorage();
    setUserRanges(savedRanges);
  }, []);

  return (
    <RangeLoaderContext.Provider value={{ userRanges, setUserRanges }}>
      {children}
    </RangeLoaderContext.Provider>
  );
};

export default RangeLoaderProvider;
