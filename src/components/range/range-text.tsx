import React, { useEffect, useState } from "react";

import {
  descriptorToHands,
  handsToDescriptor,
  modifiersToString,
  stringToModifiers,
} from "@/lib/descriptor";

import { useRangeSelectorContext } from "./range-context";

const RangeText = () => {
  const { selectedHands, setSelectedHands, handModifiers, setHandModifiers } =
    useRangeSelectorContext();
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const descriptor = handsToDescriptor(selectedHands);
    const modifiers = modifiersToString(handModifiers);
    setInputValue(`${descriptor}::${modifiers}`);
  }, [selectedHands, handModifiers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const [descriptor, modifiers] = inputValue.split("::");
      const hands = descriptorToHands(descriptor);
      setSelectedHands(hands);
      if (modifiers) {
        setHandModifiers(stringToModifiers(modifiers));
      } else {
        setHandModifiers(new Map());
      }
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
