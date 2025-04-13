import { descriptorToHands, handsToDescriptor } from "@/lib/descriptor";
import React from "react";
import { useEffect, useState } from "react";
import type { RangeSelectorProps } from "./range-props";

const RangeText = ({ selectedHands, setSelectedHands }: RangeSelectorProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setInputValue(handsToDescriptor(selectedHands));
  }, [selectedHands]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const descriptor = inputValue;
      const hands = descriptorToHands(descriptor);
      setSelectedHands(hands);
    }
  };

  return (
    <input
      type="text"
      style={{
        width: "100%",
        fontSize: "small",
        border: "1px solid #ccc",
      }}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default RangeText;
