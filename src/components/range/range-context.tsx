import React, { createContext, type Dispatch, type SetStateAction, useContext } from "react";

import { RangeSelectorProps } from "./range-props";

const RangeSelectorContext = createContext<RangeSelectorProps | undefined>(undefined);
export const useRangeSelectorContext = () => {
  const context = useContext(RangeSelectorContext);
  if (!context) {
    throw new Error("useRangeSelectorContext must be used within a RangeProvider");
  }
  return context;
};

interface RangeSelectorProviderProps extends RangeSelectorProps {
  children: React.ReactNode;
}
const RangeSelectorProvider = ({ children, ...rangeProps }: RangeSelectorProviderProps) => {
  return (
    <RangeSelectorContext.Provider value={{ ...rangeProps }}>
      {children}
    </RangeSelectorContext.Provider>
  );
};

export default RangeSelectorProvider;
