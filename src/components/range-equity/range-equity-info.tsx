import React from "react";

const RangeEquityInfo = () => {
  return (
    <div className="info my-5 container mx-auto" style={{ maxWidth: "998px" }}>
      <h4>
        <span data-nosnippet>Range Equity Calculator</span>
      </h4>
      <p className="ml-1">
        This calculator allows the user to calculate range vs range equity in texas hold'em poker.
        Simulate different board runouts and hole cards, and learn how different ranges are
        affected.
      </p>
      <h5>Range</h5>
      <p className="ml-1">
        The range panel allows the creation of an opening range. The range can then be examined
        using the tools on this page. The range can be created in three ways.
      </p>
      <h6>Text input</h6>
      <p className="ml-1">
        The text input uses shorthand text descriptors to define the range. Hands can be entered
        individually in a comma separated list (e.g. AA, AJo, 32s). Or as a sequence of hands using
        the + and - symbols. For example, "T5o+" will add the hands T9o, T8o, T7o, T6o, T5o to the
        range. "96s-" will add the hands 96s, 95s, 94s, 93s, 92s to the range. And "66-99" will add
        the hands "66", "77", "88", "99". Note that hands should be defined with the highest rank
        first, and unpaired hands should be specified as suited (s) or offsuit (o).
      </p>
      <h6>Slider</h6>
      <p className="ml-1">
        The slider defines a range based on a specific proportion of all possible hands. The hands
        are added in an order which favors hands with good preflop equity, however this does not
        necessarily correspond the hands which you or your opponents are opening, and it is
        recommend you make adjustments based on your experience.
      </p>
      <h6>Grid</h6>
      <p className="ml-1">
        The grid allows the addition and removal of individual hands from the defined range. Add and
        remove hands by clicking on them.
      </p>
      <h5>Simulation</h5>
      <p className="ml-1">
        When the <i>simulate</i> button is clicked, the program will take in the range of all the
        defined players and randomly simulate matchups between combos from their ranges. This will
        allow the estimation of the equity of each player, as well as the probability of tying
        (splitting the pot) and the pot odds.
      </p>
      <p className="ml-1">
        If both hole cards are specified for any player, then the simulation will use the hole cards
        instead of the range.
      </p>
      <p className="ml-1">
        If any part of the board is specified, then the simulation will only randomize the
        unspecified cards.
      </p>
      <p className="ml-1">
        If any player is unchecked, then that player will not be considered in the simulation.
      </p>
    </div>
  );
};

export default RangeEquityInfo;
