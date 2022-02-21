import React from "react";
import "../App.css";

function Number({ val, chooseNumber }) {
  return (
    <div className="node" onClick={chooseNumber}>
      {val}
    </div>
  );
}

export default Number;
