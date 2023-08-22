import { useEffect, useReducer, useState } from "react";
import { Heading } from "./Heading";
import { Result } from "./Result";
import { Timer } from "./Timer";
import { Content } from "./Content";
import { InputFeild } from "./InputFeild";
import { Button } from "./Button";

const time = 60;

const initialState = {
  input: "",
  timer: time,
  correctWordArr: [],
  isDisable: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "input":
      return { ...state, input: action.payload };
    case "tick":
      return {
        ...state,
        timer: state.timer > 0 ? state.timer - 1 : state.timer,
        isDisable: state.timer === 0 ? true : false,
        correctWordArr:
          state.timer === 0
            ? state.input
                .split(" ")
                .filter((word, i) => word === action.payload.split(" ")[i])
            : [],
      };

    default:
      break;
  }
}

export function Main({ content, setISOpen }) {
  const [newContent, setNewContent] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { input, timer, correctWordArr, isDisable } = state;

  const handleInput = function (e) {
    dispatch({ type: "input", payload: e.target.value.toLowerCase() });
    setNewContent(e.target.value.toLowerCase());
  };

  useEffect(
    function () {
      const timerFunc = setInterval(() => {
        dispatch({
          type: "tick",
          payload: content,
        });
      }, 1000);
      return () => {
        clearInterval(timerFunc);
      };
    },
    [content]
  );

  return (
    <div className="text-center w-[100vw] flex flex-col gap-6 mt-4 md:gap-8 md:mt-4 lg:mt-8 xl:gap-16">
      <Heading />
      <Result correctWordArr={correctWordArr} input={input} />
      <Timer timer={timer} />
      <Content newContent={newContent} content={content} />
      <InputFeild
        isDisable={isDisable}
        handleInput={handleInput}
        input={input} />
      <Button setISOpen={setISOpen}>⬅️Back</Button>
    </div>
  );
}
