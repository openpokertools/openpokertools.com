import React from "react";

import { COLORS, RANKS } from "@/lib/constants";

import RangeCell from "./range-cell";
import { useRangeSelectorContext } from "./range-context";

const RangeTable = () => {
  const { selectedHands, setSelectedHands, activeHands, handModifiers } = useRangeSelectorContext();

  const toggleHandSelection = (hand: string) => {
    const newSelectedHands = new Set(selectedHands);
    if (newSelectedHands.has(hand)) {
      newSelectedHands.delete(hand);
    } else {
      newSelectedHands.add(hand);
    }
    setSelectedHands(newSelectedHands);
  };

  const handleMouseDown = (event: React.MouseEvent, hand: string) => {
    if (event.button === 0) {
      toggleHandSelection(hand);
    }
  };

  return (
    <table className="mx-auto range_table">
      <tbody>
        {RANKS.map((rank1, i) => (
          <tr key={rank1}>
            {RANKS.map((rank2, j) => {
              const isPocketPair = i === j;
              const isSuited = i < j;
              const hand = isPocketPair
                ? `${rank1}${rank2}`
                : isSuited
                  ? `${rank1}${rank2}s`
                  : `${rank2}${rank1}o`;
              const handType = isPocketPair ? "pocketpair" : isSuited ? "suited" : "offsuit";
              const percent = ((activeHands?.get(hand) ?? 0) * 100) / 12;
              const color = handModifiers.get(hand)?.color ?? "green";
              const style =
                activeHands !== undefined && selectedHands.has(hand)
                  ? {
                      background: `linear-gradient(to right, ${COLORS[color][1]} ${percent}%, ${COLORS[color][0]} ${percent}%)`,
                    }
                  : selectedHands.has(hand)
                    ? {
                        backgroundColor: COLORS[color][1],
                        borderColor: COLORS[color][0],
                      }
                    : {};

              return (
                <td
                  key={hand}
                  className={`range_cell ${handType} ${selectedHands.has(hand) ? "selected" : ""}`}
                  onMouseDown={(event) => handleMouseDown(event, hand)}
                  style={style}
                >
                  <RangeCell hand={hand} />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RangeTable;
