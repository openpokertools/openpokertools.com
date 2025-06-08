import React, { useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HANDS_ORDERED } from "@/lib/constants";

import { useRangeSelectorContext } from "./range-context";

const RangePercent = () => {
  const { selectedHands } = useRangeSelectorContext();
  const [raisePercent, setRaisePercent] = useState<string>("0.0%");
  const [callPercent, setCallPercent] = useState<string>("0.0%");

  useEffect(() => {
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

    const raise = `${((topTotal / 1326) * 100).toFixed(1)}%`;
    const call = `${((rangeTotal / 1326) * 100).toFixed(1)}%`;

    setRaisePercent(raise);
    setCallPercent(call);
  }, [selectedHands]);

  return (
    <div style={{ float: "right" }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              R: {raisePercent}, C: {callPercent}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <strong>Raising</strong> and <strong>Calling</strong> percentages
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default RangePercent;
