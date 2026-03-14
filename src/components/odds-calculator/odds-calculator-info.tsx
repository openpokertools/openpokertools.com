import React from "react";

const OddsCalculatorInfo = () => {
  return (
    <div className="info my-5 container mx-auto" style={{ maxWidth: "500px", columnCount: 1 }}>
      <h4>
        <span data-nosnippet>Odds calculator</span>
      </h4>
      <p className="ml-1">
        Simple poker odds calculator. Enter your hole cards and optionally the board, and the
        calculator will give the win percentage, tie probability, and minimum pot odds required to
        make a call profitable for each hand. The results are calculated exactly by enumerating all
        possible runouts, and update dynamically as cards are added. Invalid hands or boards are
        ignored — for example, the board is ignored if fewer than three cards are specified, and a
        hand with only one card is ignored.
      </p>
    </div>
  );
};

export default OddsCalculatorInfo;
