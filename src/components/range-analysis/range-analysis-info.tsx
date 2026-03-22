import React from "react";

const RangeAnalysisInfo = () => {
  return (
    <div className="info my-5 container mx-auto" style={{ maxWidth: "1140px" }}>
      <h4>
        <span data-nosnippet>Range Analysis Tool</span>
      </h4>
      <p className="ml-1">
        This tool allows the user to explore the dynamics of different ranges and board textures.
        Create a range — whether your own or an opponent's — and explore how it interacts with
        different boards. Filter combos through the flop, turn, and river to identify the most
        vulnerable spot to strike.
      </p>
      <p className="ml-1">
        The typical workflow is: (1) define a range using the range panel, (2) set a board to
        examine, then (3) use the statistics panel to see how the range interacts with the board.
        From there, use the checkboxes on the flop, turn, and river tabs to model which hands
        continue at each street, narrowing the range progressively.
      </p>
      <p className="ml-1">
        The following sections describe the various features of the tools and how to use them.
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
      <h5>Board</h5>
      <p className="ml-1">
        The board allows you to define a specific board to examine. Click on the cards and select
        the cards you want from the popup. Alternatively, use the random board button to generate a
        random board.
      </p>
      <h5>Statistics</h5>
      <p className="ml-1">
        The statistics panel reports how different combos in the defined range will interact with
        the board.
      </p>
      <h6>Pre-flop</h6>
      <p className="ml-1">
        The pre-flop tab displays how often the defined range is expected to hit the flop in
        different ways (e.g. hitting a pair, or a flush draw), averaged across all possible flops.
      </p>
      <h6>Flop, Turn, River</h6>
      <p className="ml-1">
        The flop, turn, and river tabs display how the preflop range interacts with the defined
        board. Additionally, each descriptor has a checkbox which can be used to indicate whether
        the combos described should be kept to the next phase of play. For example, if you have
        reason to believe that someone would never keep weak pairs to a flop bet, you should uncheck
        the corresponding box, and the analysis will proceed with all weak pairs being dropped on
        the flop. The turn analysis will then only include combos which were not dropped on the
        flop.
      </p>
      <p className="ml-1">
        The number of combos kept at each phase of play is also displayed. And the exact list of
        combos can be displayed by clicking the <i>show</i> button at the bottom of the panel.
      </p>
    </div>
  );
};

export default RangeAnalysisInfo;
