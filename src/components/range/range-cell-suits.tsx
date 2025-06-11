import React from "react";

import { SUITS_TO_HTML } from "@/lib/constants";
import type { SuitAnnotation, SuitX } from "@/lib/models";
import { suitToColor } from "@/lib/utils";

const customOrder = { x: 0, s: 1, h: 2, c: 3, d: 4 };
const compareSuits = (a: SuitAnnotation, b: SuitAnnotation) => {
  const rankA = customOrder[a[0] as SuitX] * 10 + customOrder[a[1] as SuitX];
  const rankB = customOrder[b[0] as SuitX] * 10 + customOrder[b[1] as SuitX];
  return rankA - rankB;
};

const RangeCellSuits = ({ suits }: { suits: Array<SuitAnnotation> }) => {
  suits.sort(compareSuits);
  return (
    <>
      {suits.map((suit, i) => {
        const top = -0.2 + i * 0.47;
        return (
          <div
            key={suit}
            style={{ top: `${top}rem` }}
            className="absolute pointer-events-none text-sm"
          >
            <span style={{ color: suitToColor(suit[0], true) }}>
              {SUITS_TO_HTML[suit[0] as SuitX]}
            </span>
            <span style={{ color: suitToColor(suit[1], true) }}>
              {SUITS_TO_HTML[suit[1] as SuitX]}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default RangeCellSuits;
