import React from "react";

const CombosDisplay = () => {
  return (
    <div className="col-12">
      <h5 className="mb-2">
        Combos kept to turn
        <button
          type="button"
          className="btn btn-link collapsed showbutton"
          data-toggle="collapse"
          data-target="#flop_combos_all"
          aria-label="Show combos kept to turn"
        ></button>
      </h5>
      <div className="row px-4 collapse" id="flop_combos_all"></div>
      <h5 className="my-2">
        Combos kept to river
        <button
          type="button"
          className="btn btn-link collapsed showbutton"
          data-toggle="collapse"
          data-target="#turn_combos_all"
          aria-label="Show combos kept to river"
        ></button>
      </h5>
      <div className="row px-4 collapse" id="turn_combos_all"></div>
      <h5 className="my-2">
        Combos kept to showdown
        <button
          type="button"
          className="btn btn-link collapsed showbutton"
          data-toggle="collapse"
          data-target="#river_combos_all"
          aria-label="Show combos kept to showdown"
        ></button>
      </h5>
      <div className="row px-4 collapse" id="river_combos_all"></div>
    </div>
  );
};

export default CombosDisplay;
