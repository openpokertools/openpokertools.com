import React from "react";

import RangeLoader from "./range-loader";
import RangePercent from "./range-percent";
import type { RangeSelectorProps } from "./range-props";
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
    <div className="player p-3 w-[460px] mx-auto rounded">
      <h4 className="mb-2">
        {name ? name : "Range"}
        <RangePercent selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
      </h4>

      <RangeText selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
      <RangeSlider selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
      <div className="max-[500px]:h-[500px]">
        <RangeTable
          selectedHands={selectedHands}
          setSelectedHands={setSelectedHands}
          activeHands={activeHands}
        />
      </div>
      <RangeLoader selectedHands={selectedHands} setSelectedHands={setSelectedHands} />
    </div>
  );
};

export default RangeSelector;
