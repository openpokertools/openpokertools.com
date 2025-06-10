import React from "react";

import { SUITS_TO_HTML } from "@/lib/constants";
import { suitToColor } from "@/lib/utils";

const customOrder = { s: 0, h: 1, c: 2, d: 3 };
const compareSuits = (a: string, b: string) => {
  const rankA = customOrder[a[0]] * 10 + customOrder[a[1]];
  const rankB = customOrder[b[0]] * 10 + customOrder[b[1]];
  return rankA - rankB;
};

const RangeCellSuits = ({ suits }: { suits: Array<string> }) => {
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
            <span style={{ color: suitToColor(suit[0], true) }}>{SUITS_TO_HTML[suit[0]]}</span>
            <span style={{ color: suitToColor(suit[1], true) }}>{SUITS_TO_HTML[suit[1]]}</span>
          </div>
        );
      })}
    </>
  );
};

export default RangeCellSuits;
