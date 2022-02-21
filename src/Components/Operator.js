import React from "react";
import "../App.css";

function Operator({ val, chooseOperator }) {
  return (
    <div className="node" onClick={chooseOperator}>
      {val}
    </div>
  );
}

export default Operator;
