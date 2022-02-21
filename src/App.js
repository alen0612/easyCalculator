import { useEffect, useState } from "react";
import "./App.css";
import Content from "./Components/Content";
import Operator from "./Components/Operator";
import Number from "./Components/Number";

function App() {
  let [content, setContent] = useState("0");

  useEffect(() => {
    checkOverFlow();
  }, [content]);

  function chooseOperator(text) {
    // Reset everything if text is C
    if (text === "C") {
      setContent("0");
      return;
    }

    // do nothing if it's already an error or overflow
    if (
      content[0] === "O" ||
      content[0] === "E" ||
      content[0] === "N" ||
      content[0] === "I"
    )
      return;

    // +, -, x, /
    if (text === "/" || text === "X" || text === "-" || text === "+") {
      // First, check if there's already an operator
      if (checkOperatorExist(content)) return;
      // Then check if the last word is an operator
      if (
        content[content.length - 1] === "/" ||
        content[content.length - 1] === "X" ||
        content[content.length - 1] === "-" ||
        content[content.length - 1] === "+"
      ) {
        setContent(content.slice(0, -1) + text);
        return;
      }
    }

    if (text === "=") {
      console.log(calculate(content));
      setContent(calculate(content));
      return;
    }

    setContent(content + text);
  }

  function chooseNumber(text) {
    // do nothing if it's already an error or overflow or NaN or Infinity
    if (
      content[0] === "O" ||
      content[0] === "E" ||
      content[0] === "N" ||
      content[0] === "I"
    )
      return;

    if (content === "0") {
      setContent(text);
      return;
    }
    setContent(content + text);
  }

  function checkOperatorExist(content) {
    // return true if already exist an operator in content
    for (var i = 0; i < content.length; i++) {
      if (
        content[i] === "/" ||
        content[i] === "X" ||
        content[i] === "-" ||
        content[i] === "+"
      )
        return true;
    }
    return false;
  }

  function calculate(content) {
    // calculate and return output
    // return "ERROR!" if there's no operator in the content

    var indexOfOperator = findOperatorIndex(content);
    if (indexOfOperator === -1) return "ERROR!";

    // left hand side
    let LHS = parseInt(content.slice(0, indexOfOperator));
    // right hand side
    let RHS = parseInt(content.slice(indexOfOperator + 1, content.length));

    switch (content[indexOfOperator]) {
      case "+":
        return LHS + RHS;
      case "-":
        return LHS - RHS;
      case "X":
        return LHS * RHS;
      case "/":
        return LHS / RHS;
      default:
        return "ERROR!";
    }
  }

  function findOperatorIndex(content) {
    // return -1 if there's on operator in content
    for (var i = 0; i < content.length; i++) {
      if (
        content[i] === "/" ||
        content[i] === "X" ||
        content[i] === "-" ||
        content[i] === "+"
      )
        return i;
    }
    return -1;
  }

  const checkOverFlow = () => {
    // a simple const to check if content is overflow
    if (content.length > 17) setContent("Over flow!");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="screen">
          <Content val={content} />
        </div>
        <div className="nodes">
          <div className="numbers">
            <Number val={"7"} chooseNumber={() => chooseNumber("7")} />
            <Number val={"8"} chooseNumber={() => chooseNumber("8")} />
            <Number val={"9"} chooseNumber={() => chooseNumber("9")} />
            <Number val={"4"} chooseNumber={() => chooseNumber("4")} />
            <Number val={"5"} chooseNumber={() => chooseNumber("5")} />
            <Number val={"6"} chooseNumber={() => chooseNumber("6")} />
            <Number val={"1"} chooseNumber={() => chooseNumber("1")} />
            <Number val={"2"} chooseNumber={() => chooseNumber("2")} />
            <Number val={"3"} chooseNumber={() => chooseNumber("3")} />
            <Number val={"0"} chooseNumber={() => chooseNumber("0")} />
            <Operator val={"="} chooseOperator={() => chooseOperator("=")} />
            <Operator val={"AC"} chooseOperator={() => chooseOperator("C")} />
          </div>
          <div className="operators">
            <Operator val={"/"} chooseOperator={() => chooseOperator("/")} />
            <Operator val={"X"} chooseOperator={() => chooseOperator("X")} />
            <Operator val={"-"} chooseOperator={() => chooseOperator("-")} />
            <Operator val={"+"} chooseOperator={() => chooseOperator("+")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
