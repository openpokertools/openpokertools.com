import React, { useEffect, useState } from "react";

import { COLORS } from "@/lib/constants";
import type { Color } from "@/lib/models";
import { suitToColor } from "@/lib/utils";

import { SUIT_SVGS } from "../playing-card/playing-card-svgs";
import { usePaintbrushButtonContext } from "./paintbrush-button-context";

export default function PaintbrushCursor() {
  const { selection } = usePaintbrushButtonContext();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {selection?.kind === "color" && (
        <div
          className="fixed -top-3 left-2 pointer-events-none z-[9999]"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: COLORS[selection.selection as Color][1] }}
          />
        </div>
      )}
      {selection?.kind === "suit" && (
        <div
          className="fixed -top-3 left-2 flex flex-row pointer-events-none z-[9999]"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <span
            className="-ml-[0.05rem]"
            style={{ fill: suitToColor(selection.selection[0], true) }}
          >
            {SUIT_SVGS[selection.selection[0]]}
          </span>
          <span
            className="-ml-[0.25rem]"
            style={{ fill: suitToColor(selection.selection[1], true) }}
          >
            {SUIT_SVGS[selection.selection[1]]}
          </span>
        </div>
      )}
    </>
  );
}
