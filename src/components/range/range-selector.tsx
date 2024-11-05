import React, { useState } from "react";

import RangeLoader from "./range-loader";
import RangePercent from "./range-percent";
import { RangeSelectorProps } from "./range-props";
import RangeSlider from "./range-slider";
import RangeTable from "./range-table";
import RangeText from "./range-text";

const RangeSelector = ({
  selectedHands,
  setSelectedHands,
  activeHands,
  name,
}: RangeSelectorProps) => {
  return (
    <div className="player p-3">
      <h4 className="mb-2">
        {name ? name : "Range"}
        <RangePercent selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
      </h4>

      <RangeText selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
      <RangeSlider selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
      <RangeTable
        selectedHands={selectedHands}
        setSelectedHands={setSelectedHands}
        activeHands={activeHands}
      />
      <RangeLoader selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
    </div>
  );
};

export default RangeSelector;
