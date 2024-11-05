import React, { useState, useEffect } from "react";
import { handsToDescriptor, descriptorToHands } from "@/lib/descriptor";
import { RangeSelectorProps } from "./range-props";

const RangeText: React.FC<RangeSelectorProps> = ({ selectedHands, setSelectedHands }) => {
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
