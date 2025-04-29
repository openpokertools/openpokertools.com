import React, { useEffect, useMemo, useRef, useState } from "react";

import loadable from "@loadable/component";

import { HANDS_ORDERED } from "@/lib/constants";

import { useRangeSelectorContext } from "./range-context";

const IonRangeSlider = loadable(() => import("react-ion-slider"), {
  ssr: false,
});

const RangeSlider = () => {
  const { selectedHands, setSelectedHands } = useRangeSelectorContext();
  const [sliderValues, setSliderValues] = useState({ from: 0, to: 0 });
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    let rangeTotal = 0;
    let topTotal = 0;
    let aboveRange = true;

    for (const h of HANDS_ORDERED) {
      let val = 0;
      if (h[0] === h[1]) {
        val = 6;
      } else if (h[2] === "s") {
        val = 4;
      } else {
        val = 12;
      }

      if (selectedHands.has(h)) {
        aboveRange = false;
        rangeTotal += val;
      } else if (aboveRange) {
        topTotal += val;
      }
    }

    if (topTotal === 1326) {
      topTotal = 0;
    }

    setSliderValues({ from: topTotal, to: topTotal + rangeTotal });
  }, [selectedHands]);

  const handleSliderChange = (data: { from: number; to: number }) => {
    const valStart = data.from;
    const valEnd = data.to;
    const newSelectedHands: Set<string> = new Set();
    let m = 0;
    for (const h of HANDS_ORDERED) {
      if (h[0] === h[1]) {
        m += 6;
      } else if (h[2] === "s") {
        m += 4;
      } else {
        m += 12;
      }
      if (m > valStart && m <= valEnd) {
        newSelectedHands.add(h);
      }
    }
    isInternalUpdate.current = true;
    setSelectedHands(newSelectedHands);
  };

  return useMemo(
    () => (
      <div className="my-1">
        <IonRangeSlider
          type="double"
          min={0}
          max={1326}
          from={sliderValues.from}
          to={sliderValues.to}
          skin="round"
          hide_min_max
          hide_from_to
          drag_interval
          onChange={handleSliderChange}
        />
      </div>
    ),
    [sliderValues],
  );
};

export default RangeSlider;
