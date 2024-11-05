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
import { descriptorToHands, handsToDescriptor } from "@/lib/descriptor";
import React, { useEffect, useState } from "react";
import { RangeSelectorProps } from "./range-props";

interface Range {
  name: string;
  value: string;
}

const RangeLoader: React.FC<RangeSelectorProps> = ({ selectedHands, setSelectedHands }) => {
  const [userRanges, setUserRanges] = useState<Range[]>([]);
  const [selectedRange, setSelectedRange] = useState<string>(":");

  useEffect(() => {
    const savedRanges = loadRangesFromLocalStorage();
    setUserRanges(savedRanges);
  }, []);

  const loadRangesFromLocalStorage = (): Range[] => {
    return JSON.parse(localStorage.getItem("user_ranges") || "[]");
  };

  const handleSaveRange = () => {
    const rangeName = prompt("Please enter a name for this range.");
    if (!rangeName) return;
    const descriptor = handsToDescriptor(selectedHands);
    const newRange: Range = { name: rangeName, value: descriptor };
    const updatedRanges = [...userRanges, newRange];
    setUserRanges(updatedRanges);
    localStorage.setItem("user_ranges", JSON.stringify(updatedRanges));
  };

  const handleDeleteRange = () => {
    const [group, key] = selectedRange.split(":");
    if (group === "user") {
      const index = parseInt(key);
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
    let descriptor;
    if (group === "sixmax") {
      descriptor = SIX_MAX_OPEN[key];
    } else if (group === "ninemax") {
      descriptor = NINE_MAX_OPEN[key];
    } else {
      const index = parseInt(key);
      descriptor = userRanges[index].value;
      console.log(descriptor);
    }
    const hands = descriptorToHands(descriptor);
    setSelectedHands(hands);
  };

  return (
    <div className="grid grid-cols-12 range-loader mt-2 mx-0">
      <div className="col-span-7 p-0">
        <Button
          style={{
            width: "45%",
            whiteSpace: "nowrap",
            backgroundColor: "#209020",
          }}
          onClick={handleSaveRange}
        >
          Save range
        </Button>
        <Button
          className="ml-1"
          style={{
            width: "45%",
            whiteSpace: "nowrap",
            backgroundColor: "#d01515",
          }}
          onClick={handleDeleteRange}
        >
          Delete range
        </Button>
      </div>
      <div className="col-span-5 p-0">
        <Select onValueChange={handleLoadRange}>
          <SelectTrigger>
            <SelectValue placeholder="<Empty>" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Custom Ranges</SelectLabel>
              {userRanges.map((entry, index) => (
                <SelectItem key={`user:${index}`} value={`user:${index}`}>
                  {entry.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>6-Max Opening Ranges</SelectLabel>
              {Object.entries(SIX_MAX_OPEN).map(([key, value]) => (
                <SelectItem key={`sixmax:${key}`} value={`sixmax:${key}`}>
                  {key}
                  <small className="ml-1 text-gray-400">(6-max)</small>
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>9-Max Opening Ranges</SelectLabel>
              {Object.entries(NINE_MAX_OPEN).map(([key, value]) => (
                <SelectItem key={`ninemax:${key}`} value={`ninemax:${key}`}>
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
