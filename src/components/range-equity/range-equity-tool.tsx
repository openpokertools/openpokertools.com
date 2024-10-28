import React from "react";
import DisplayContainer from "../shell/display-container";
import RangeEquityDisplay from "./range-equity-display";
import PlayerDisplay from "./player-display";

const RangeEquityTool = () => {
  return (
    <>
      <DisplayContainer maxWidth="998px">
        <RangeEquityDisplay />
      </DisplayContainer>
      <div className="flex mx-auto gap-x-4" style={{ maxWidth: 998 }}>
        <PlayerDisplay />
        <PlayerDisplay />
      </div>
    </>
  );
};

export default RangeEquityTool;
