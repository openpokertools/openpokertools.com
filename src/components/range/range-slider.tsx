import React, { useEffect, useState, useRef, useMemo } from "react";
import { HANDS_ORDERED } from "@/lib/constants";
import { RangeSelectorProps } from "./range-props";
import IonRangeSlider from "react-ion-slider";

const RangeSlider: React.FC<RangeSelectorProps> = ({
  selectedHands,
  setSelectedHands,
}) => {
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

    HANDS_ORDERED.forEach((c) => {
      let val = 0;
      if (c[0] === c[1]) {
        val = 6;
      } else if (c[2] === "s") {
        val = 4;
      } else {
        val = 12;
      }

      if (selectedHands.has(c)) {
        aboveRange = false;
        rangeTotal += val;
      } else if (aboveRange) {
        topTotal += val;
      }
    });

    if (topTotal === 1326) {
      topTotal = 0;
    }

    setSliderValues({ from: topTotal, to: topTotal + rangeTotal });
  }, [selectedHands]);

  const handleSliderChange = (data: { from: number; to: number }) => {
    const valStart = data.from;
    const valEnd = data.to;
    let newSelectedHands: Set<string> = new Set();
    let m = 0;
    HANDS_ORDERED.forEach((c) => {
      if (c[0] === c[1]) {
        m += 6;
      } else if (c[2] === "s") {
        m += 4;
      } else {
        m += 12;
      }
      if (m > valStart && m <= valEnd) {
        newSelectedHands.add(c);
      }
    });
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
