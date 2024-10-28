import React, { useState } from "react";
import RangeSelector from "../range/range-selector";

const PlayerDisplay = () => {
    const [selectedHands, setSelectedHands] = useState<Set<string>>(new Set());

    return (
        <div
            className="rounded player mx-auto"
            style={{ width: 460 }}
            data-nosnippet
        >
            <RangeSelector
                selectedHands={selectedHands}
                setSelectedHands={setSelectedHands}
            />
        </div>
    );
};

export default PlayerDisplay;
