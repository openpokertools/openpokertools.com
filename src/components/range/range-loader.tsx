import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NINE_MAX_OPEN, SIX_MAX_OPEN } from "@/lib/constants";
import {
  descriptorToHands,
  handsToDescriptor,
  modifiersToString,
  stringToModifiers,
} from "@/lib/descriptor";

import PaintbrushButton from "./paintbrush-button";
import { useRangeSelectorContext } from "./range-context";
import { useRangeLoaderContext } from "./range-loader-context";
import type { UserRange } from "./range-props";

const RangeLoader = () => {
  const { selectedHands, setSelectedHands, handModifiers, setHandModifiers } =
    useRangeSelectorContext();
  const { userRanges, setUserRanges } = useRangeLoaderContext();
  const [selectedRange, setSelectedRange] = useState<string>(":");

  const handleSaveRange = () => {
    const rangeName = prompt("Please enter a name for this range.");
    if (!rangeName) return;
    const descriptor = handsToDescriptor(selectedHands);
    const modifiersString = modifiersToString(handModifiers);
    const newRange: UserRange = { name: rangeName, value: descriptor, modifiers: modifiersString };
    const updatedRanges = [...userRanges, newRange];
    setUserRanges(updatedRanges);
    localStorage.setItem("user_ranges", JSON.stringify(updatedRanges));
  };

  const handleDeleteRange = () => {
    const [group, key] = selectedRange.split(":");
    if (group === "user") {
      const index = Number.parseInt(key);
      const updatedRanges = [...userRanges];
      updatedRanges.splice(index, 1);
      setUserRanges(updatedRanges);
      localStorage.setItem("user_ranges", JSON.stringify(updatedRanges));
      setSelectedRange(":");
    }
  };

  const handleLoadRange = (value: string) => {
    setSelectedRange(value);
    const [group, key] = value.split(":");
    let descriptor: string;
    let modifiers = "";
    if (group === "sixmax") {
      descriptor = SIX_MAX_OPEN[key as keyof typeof SIX_MAX_OPEN];
    } else if (group === "ninemax") {
      descriptor = NINE_MAX_OPEN[key as keyof typeof NINE_MAX_OPEN];
    } else {
      const index = Number.parseInt(key);
      descriptor = userRanges[index].value;
      modifiers = userRanges[index].modifiers;
    }
    const hands = descriptorToHands(descriptor);
    setSelectedHands(hands);
    if (modifiers) {
      setHandModifiers(stringToModifiers(modifiers));
    } else {
      setHandModifiers(new Map());
    }
  };

  return (
    <div className="flex range-loader mt-2 mx-0">
      <Button
        className="w-[24%] bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
        onClick={handleSaveRange}
      >
        Save range
      </Button>
      <Button
        className="w-[24%] bg-red-600 hover:bg-red-700 text-white whitespace-nowrap ml-1"
        onClick={handleDeleteRange}
      >
        Delete range
      </Button>
      <PaintbrushButton className="w-10 mx-1" />
      <div className="w-full ml-auto">
        <Select onValueChange={handleLoadRange}>
          <SelectTrigger>
            <SelectValue placeholder="<Empty>" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Custom Ranges</SelectLabel>
              {userRanges.map((entry, index) => (
                <SelectItem
                  className="cursor-pointer"
                  key={`user:${index}`}
                  value={`user:${index}`}
                >
                  {entry.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>6-Max Opening Ranges</SelectLabel>
              {Object.keys(SIX_MAX_OPEN).map((key) => (
                <SelectItem
                  className="cursor-pointer"
                  key={`sixmax:${key}`}
                  value={`sixmax:${key}`}
                >
                  {key}
                  <small className="ml-1 text-gray-400">(6-max)</small>
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>9-Max Opening Ranges</SelectLabel>
              {Object.keys(NINE_MAX_OPEN).map((key) => (
                <SelectItem
                  className="cursor-pointer"
                  key={`ninemax:${key}`}
                  value={`ninemax:${key}`}
                >
                  {key}
                  <small className="ml-1 text-gray-400">(9-max)</small>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RangeLoader;
