import React from "react";

const OddsCalculatorInfo = () => {
  return (
    <div
      className="info my-5 container mx-auto"
      style={{ maxWidth: "500px", columnCount: 1 }}
    >
      <h4>
        <span data-nosnippet>Odds calculator</span>
      </h4>
      <p className="ml-1">
        Simple poker odds calculator. Simply enter your cards and optionally the
        board texture, and the calculator will give the winning odds for each
        hand. The odds are calculated dynamically as the cards are added, but
        the calculator will not take into account invalid hands or boards. For
        example, it will not take into account the board if there are less than
        three cards, or a hand with only one card.
      </p>
    </div>
  );
};

export default OddsCalculatorInfo;
