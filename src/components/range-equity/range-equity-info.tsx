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
      <p className="ml-1">
        The typical workflow is: (1) define a range for each player using the range panels, (2)
        optionally fix specific hole cards or board cards, then (3) click <i>simulate</i> to run the
        equity calculation. Results update continuously until you click <i>stop</i>.
      </p>
      <h5>Range</h5>
      <p className="ml-1">
        The range panel allows the creation of a range. The range can then be examined using the
        tools on this page. The range can be created in three ways.
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
        necessarily correspond to the hands which you or your opponents are opening, and it is
        recommended you make adjustments based on your experience.
      </p>
      <h6>Grid</h6>
      <p className="ml-1">
        The grid allows the addition and removal of individual hands from the defined range. Add and
        remove hands by clicking on them.
      </p>
      <h6>Color annotation</h6>
      <p className="ml-1">
        It is possible to annotate the hands in the grid with colors. This can be used for study
        purposes to differentiate between groups of hands. To create an annotation simply right
        click on the desired cell and select a color, or click on the paintbrush below the range and
        select a color. To undo the selection press <strong>ESC</strong>.
      </p>
      <h6>Suit selection</h6>
      <p className="ml-1">
        It is also possible to specify which suit combinations of a hand to include in the range.
        For example, you can include AhKs but exclude other AK combos. To do this, right click on
        the desired cell and select a suit combo, or click on the paintbrush below the range and
        select a suit combo. To undo the selection press <strong>ESC</strong>.
      </p>
      <h5>Simulation</h5>
      <p className="ml-1">
        When the <i>simulate</i> button is clicked, the program runs a Monte Carlo simulation,
        repeatedly sampling random matchups between combos from each player's range. Results update
        continuously as more samples are collected, converging toward the true equity over time.
        Click <i>stop</i> to end the simulation. The output includes the equity of each player, the
        probability of tying (splitting the pot), and the minimum pot odds required to make a call
        profitable.
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
