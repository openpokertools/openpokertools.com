import React from "react";


import RangeProvider from "./range-context";
import RangeLoader from "./range-loader";
import RangePercent from "./range-percent";
import type { RangeSelectorProps } from "./range-props";
import RangeSlider from "./range-slider";
import RangeTable from "./range-table";
import RangeText from "./range-text";

const RangeSelector = ({ name, ...rangeProps }: RangeSelectorProps) => {
  return (
    <RangeProvider {...rangeProps}>
      <div className="player p-3 w-[460px] mx-auto rounded">
        <h4 className="mb-2">
          {name ? name : "Range"}
          <RangePercent />
        </h4>

        <RangeText />
        <RangeSlider />
        <div className="max-[500px]:h-[500px]">
          <RangeTable />
        </div>
        <RangeLoader />
      </div>
    </RangeProvider>
  );
};

export default RangeSelector;
