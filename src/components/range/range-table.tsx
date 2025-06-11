import React from "react";

import { COLORS, RANKS } from "@/lib/constants";
import { toggleHandColor, toggleHandSuits } from "@/lib/hand_modifiers";
import type { Color, Hand, SuitAnnotation } from "@/lib/models";
import { cn } from "@/lib/utils";

import { usePaintbrushButtonContext } from "./paintbrush-button-context";
import RangeCell from "./range-cell";
import RangeCellSuits from "./range-cell-suits";
import { useRangeSelectorContext } from "./range-context";

const RangeTable = () => {
  const { selectedHands, setSelectedHands, activeHands, handModifiers, setHandModifiers } =
    useRangeSelectorContext();
  const { selection } = usePaintbrushButtonContext();

  const toggleHandSelection = (hand: Hand) => {
    const newSelectedHands = new Set(selectedHands);
    if (newSelectedHands.has(hand)) {
      newSelectedHands.delete(hand);
    } else {
      newSelectedHands.add(hand);
    }
    setSelectedHands(newSelectedHands);
  };

  const handleMouseDown = (event: React.MouseEvent, hand: Hand) => {
    if (event.button === 0) {
      if (selection) {
        if (selection.kind === "color") {
          setHandModifiers((prev) => {
            return toggleHandColor(hand, prev, selection.selection as Color);
          });
        } else {
          setHandModifiers((prev) => {
            return toggleHandSuits(hand, prev, selection.selection as SuitAnnotation);
          });
        }
      } else {
        toggleHandSelection(hand);
      }
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
              const hand = (
                isPocketPair
                  ? `${rank1}${rank2}`
                  : isSuited
                    ? `${rank1}${rank2}s`
                    : `${rank2}${rank1}o`
              ) as Hand;
              const handType = isPocketPair ? "pocketpair" : isSuited ? "suited" : "offsuit";
              const percent = ((activeHands?.get(hand) ?? 0) * 100) / 12;
              const color = handModifiers.get(hand)?.color ?? "green";
              const suits = (handModifiers.get(hand)?.suits ?? []) as SuitAnnotation[];
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
                  className={cn(
                    "range_cell relative",
                    handType,
                    selectedHands.has(hand) ? "selected" : "",
                  )}
                  onMouseDown={(event) => handleMouseDown(event, hand)}
                  style={style}
                >
                  <RangeCellSuits suits={suits} />
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
