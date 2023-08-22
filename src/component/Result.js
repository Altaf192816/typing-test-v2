export function Result({ correctWordArr, input }) {
  return (
    <div className="flex justify-evenly text-center flex-wrap">
      <div className="bg-[#696969] px-3 py-1 rounded-xl shadow-xl md:px-8 ">
        <p>Word/Min</p>
        <p className="inline">{correctWordArr.length}</p>
        <span> Wpm✍🏼</span>
      </div>
      <div className="bg-[#696969] px-3 py-1 rounded-xl shadow-xl md:px-8 ">
        <p>Char/Min</p>
        <p className="inline">{correctWordArr.join("").length}</p>
        <span> Cpm🔡</span>
      </div>
      <div className="bg-[#696969] px-3 py-1 rounded-xl shadow-xl md:px-8 ">
        <p> Accuracy</p>
        <p className="inline">
          {((correctWordArr.length / input.split(" ").length) * 100).toFixed(2)}
        </p>
        <span>%🎯</span>
      </div>
    </div>
  );
}
