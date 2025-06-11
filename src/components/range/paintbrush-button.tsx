import React, { useState } from "react";

import { Paintbrush } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { COLORS } from "@/lib/constants";
import { cn, suitToColor } from "@/lib/utils";

import { SUIT_SVGS } from "../playing-card/playing-card-svgs";
import { usePaintbrushButtonContext } from "./paintbrush-button-context";

interface ColorSelectorProps {
  color: keyof typeof COLORS;
  closePopover: () => void;
}
const ColorSelector = ({ color, closePopover }: ColorSelectorProps) => {
  const { setSelection } = usePaintbrushButtonContext();

  const handleClick = () => {
    setSelection({ kind: "color", selection: color });
    closePopover();
  };

  return (
    <Button
      className="rounded-full w-5 h-5 p-0 mx-auto"
      style={{ backgroundColor: COLORS[color][1] }}
      onClick={handleClick}
    ></Button>
  );
};

interface SuitSelectorProps {
  suit: string;
  closePopover: () => void;
}
const SuitSelector = ({ suit, closePopover }: SuitSelectorProps) => {
  const { setSelection } = usePaintbrushButtonContext();

  const handleClick = () => {
    setSelection({ kind: "suit", selection: suit });
    closePopover();
  };

  return (
    <Button
      className={cn(
        "w-[1.62rem] h-[1.62rem] p-0 bg-transparent hover:bg-accent",
        "inline-block align-middle text-md border",
      )}
      onClick={handleClick}
    >
      <div className="grid text-[0.75rem] h-full">
        <div className="flex flex-row my-auto">
          <span className="-ml-[0.05rem]" style={{ fill: suitToColor(suit[0], true) }}>
            {SUIT_SVGS[suit[0]]}
          </span>
          <span className="-ml-[0.25rem]" style={{ fill: suitToColor(suit[1], true) }}>
            {SUIT_SVGS[suit[1]]}
          </span>
        </div>
      </div>
    </Button>
  );
};

interface PaintbrushButtonProps {
  className: string;
}
const PaintbrushButton = ({ className }: PaintbrushButtonProps) => {
  const [open, setOpen] = useState(false);
  const { setSelection } = usePaintbrushButtonContext();

  const closePopover = () => {
    setOpen(false);
  };

  const clear = () => {
    setSelection(undefined);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className={cn("bg-sky-500 hover:bg-sky-600", className)}>
          <span>
            <Paintbrush />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="grid gap-[0.2rem]">
          <div className="flex flex-row gap-[inherit] my-1">
            <ColorSelector color="purple" closePopover={closePopover} />
            <ColorSelector color="blue" closePopover={closePopover} />
            <ColorSelector color="green" closePopover={closePopover} />
            <ColorSelector color="yellow" closePopover={closePopover} />
            <ColorSelector color="red" closePopover={closePopover} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="xx" closePopover={closePopover} />
            <SuitSelector suit="xs" closePopover={closePopover} />
            <SuitSelector suit="xh" closePopover={closePopover} />
            <SuitSelector suit="xc" closePopover={closePopover} />
            <SuitSelector suit="xd" closePopover={closePopover} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="sx" closePopover={closePopover} />
            <SuitSelector suit="ss" closePopover={closePopover} />
            <SuitSelector suit="sh" closePopover={closePopover} />
            <SuitSelector suit="sc" closePopover={closePopover} />
            <SuitSelector suit="sd" closePopover={closePopover} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="hx" closePopover={closePopover} />
            <SuitSelector suit="hs" closePopover={closePopover} />
            <SuitSelector suit="hh" closePopover={closePopover} />
            <SuitSelector suit="hc" closePopover={closePopover} />
            <SuitSelector suit="hd" closePopover={closePopover} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="cx" closePopover={closePopover} />
            <SuitSelector suit="cs" closePopover={closePopover} />
            <SuitSelector suit="ch" closePopover={closePopover} />
            <SuitSelector suit="cc" closePopover={closePopover} />
            <SuitSelector suit="cd" closePopover={closePopover} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="dx" closePopover={closePopover} />
            <SuitSelector suit="ds" closePopover={closePopover} />
            <SuitSelector suit="dh" closePopover={closePopover} />
            <SuitSelector suit="dc" closePopover={closePopover} />
            <SuitSelector suit="dd" closePopover={closePopover} />
          </div>
          <div className="flex flex-row gap-[inherit] mt-1">
            <Button variant="outline" className="w-full h-[1.62rem] bg-transparent hover:bg-accent" onClick={clear}>Clear</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PaintbrushButton;
