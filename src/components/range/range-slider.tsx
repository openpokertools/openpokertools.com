import React, { useEffect, useRef, useState } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { HANDS_ORDERED } from "@/lib/constants";
import type { Hand } from "@/lib/models";

import { useRangeSelectorContext } from "./range-context";

const RangeSlider = () => {
  const { selectedHands, setSelectedHands } = useRangeSelectorContext();
  const [values, setValues] = useState([0, 0]);
  const isInternalUpdate = useRef(false);
  const trackRef = useRef<HTMLSpanElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

    setValues([topTotal, topTotal + rangeTotal]);
  }, [selectedHands]);

  const applyValues = (from: number, to: number) => {
    const newSelectedHands: Set<Hand> = new Set();
    let m = 0;
    for (const h of HANDS_ORDERED) {
      if (h[0] === h[1]) {
        m += 6;
      } else if (h[2] === "s") {
        m += 4;
      } else {
        m += 12;
      }
      if (m > from && m <= to) {
        newSelectedHands.add(h);
      }
    }
    isInternalUpdate.current = true;
    setSelectedHands(newSelectedHands);
  };

  const handleValueChange = (newValues: number[]) => {
    setValues(newValues);
    applyValues(newValues[0], newValues[1]);
  };

  const handleIntervalPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startFrom = values[0];
    const startTo = values[1];
    const span = startTo - startFrom;

    const onMove = (moveEvent: PointerEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scale = 1326 / rect.width;
      const delta = Math.round((moveEvent.clientX - startX) * scale);
      const newFrom = Math.max(0, Math.min(1326 - span, startFrom + delta));
      const newTo = newFrom + span;
      setValues([newFrom, newTo]);
      applyValues(newFrom, newTo);
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const fromPct = (values[0] / 1326) * 100;
  const toPct = (values[1] / 1326) * 100;

  return (
    <div className="my-2">
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={0}
        max={1326}
        step={1}
        value={values}
        onValueChange={handleValueChange}
      >
        <SliderPrimitive.Track
          ref={trackRef}
          className="relative bg-neutral-200 rounded-full grow h-1.5 z-[0]"
        >
          <SliderPrimitive.Range className="absolute bg-sky-500 rounded-full h-full" />
          <div
            style={{
              position: "absolute",
              left: `${fromPct}%`,
              width: `${toPct - fromPct}%`,
              top: 0,
              bottom: 0,
              cursor: isDragging ? "grabbing" : "grab",
              zIndex: 1,
            }}
            onPointerDown={handleIntervalPointerDown}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block w-[1.15rem] h-[1.15rem] bg-white border-2 border-sky-500 rounded-full hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 z-[2] cursor-pointer" />
        <SliderPrimitive.Thumb className="block w-[1.15rem] h-[1.15rem] bg-white border-2 border-sky-500 rounded-full hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 z-[2] cursor-pointer" />
      </SliderPrimitive.Root>
    </div>
  );
};

export default RangeSlider;
