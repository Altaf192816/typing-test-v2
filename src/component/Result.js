import { useEffect } from "react";

export function Result({
  correctWordArr,
  input,
  setScore,
  user,
  difficulty,
  time,
}) {
  const perMin = time / 60;
  useEffect(
    function () {
      if (correctWordArr?.[0])
        setScore({
          user,
          difficulty,
          char_per_min: correctWordArr.join("").length / perMin,
          id: Date.now(),
        });
    },
    [correctWordArr, setScore, user, difficulty, perMin]
  );
  return (
    <div className="flex justify-evenly text-center flex-wrap">
      <div className="bg-[#696969] px-3 py-1 rounded-xl shadow-xl md:px-8 ">
        <p>Word/Min</p>
        {correctWordArr?.[0] ? (
          <>
            <p className="inline">{Math.floor(correctWordArr.length / perMin)}</p>
            <span> Wpm✍🏼</span>
          </>
        ) : (
          <p>Calculating...</p>
        )}
      </div>
      <div className="bg-[#696969] px-3 py-1 rounded-xl shadow-xl md:px-8 ">
        <p>Char/Min</p>
        {correctWordArr?.[0] ? (
          <>
            <p className="inline">{Math.floor(correctWordArr.join("").length / perMin)}</p>
            <span> Cpm🔡</span>
          </>
        ) : (
          <p>Calculating...</p>
        )}
      </div>
      <div className="bg-[#696969] px-3 py-1 rounded-xl shadow-xl md:px-8 ">
        <p> Accuracy</p>
        {correctWordArr?.[0] ? (
          <>
            <p className="inline">
              {(
                (correctWordArr.length / input.split(" ").length) *
                100
              ).toFixed(2)}
            </p>
            <span>%🎯</span>
          </>
        ) : (
          <p>Calculating...</p>
        )}
      </div>
    </div>
  );
}
