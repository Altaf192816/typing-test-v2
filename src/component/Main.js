import { useEffect, useReducer, useRef, useState } from "react";
import { Heading } from "./Heading";
import { Result } from "./Result";
import { Timer } from "./Timer";
import { Content } from "./Content";
import { InputFeild } from "./InputFeild";
import { Button } from "./Button";

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

export function Main({
  content,
  setISOpen,
  setScore,
  time,
  user,
  difficulty,
  setScoreList,
  score,
}) {
  const [newContent, setNewContent] = useState("");
  const inputEl = useRef(null);
  const [{ input, timer, correctWordArr, isDisable }, dispatch] = useReducer(
    reducer,
    {
      input: "",
      timer: time,
      correctWordArr: [],
      isDisable: false,
    }
  );

  const handleInput = function (e) {
    dispatch({ type: "input", payload: e.target.value.toLowerCase() });
    setNewContent(e.target.value.toLowerCase());
  };

  const handleAddScore = function () {
    setISOpen((is) => !is);
    setScoreList((arr) => [...arr, score]);
    setScore({});
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
      <Result
        correctWordArr={correctWordArr}
        input={input}
        setScore={setScore}
        user={user}
        difficulty={difficulty}
        time={time}
      />
      <Timer timer={timer} />
      <Content newContent={newContent} content={content} inputEl = {inputEl}/>
      {timer === 0 && <Button onClick={handleAddScore}>⬅️Save Score</Button>}
      <InputFeild
        isDisable={isDisable}
        handleInput={handleInput}
        input={input}
        inputEl = {inputEl}
      />
    </div>
  );
}
