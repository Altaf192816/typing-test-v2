import { Button } from "./Button";

function HomePage({
  setISOpen,
  setUser,
  setTime,
  time,
  user,
  scoreList,
  setScoreList,
}) {
  return (
    <div className="w-[100%] h-[100%] flex flex-col gap-10 ">
      <div className="flex flex-col gap-6 items-center lg:gap-8">
        <input
          name="name"
          placeholder="Name"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="text-black px-2 py-1 rounded-lg shadow-lg"
        />
        <div className="flex gap-2 items-center">
          <p className="font-bold drop-shadow-lg">Difficulty</p>
          <select
            value={time}
            onChange={(e) => setTime(+e.target.value)}
            className="text-black px-2 py-1 rounded-lg shadow-lg"
          >
            <option value="60">Easy(60min)</option>
            <option value="120">Medium(120min)</option>
            <option value="180">Hard(180min)</option>
          </select>
        </div>
      {user ? (
        <Button onClick={() => setISOpen((is) => !is)}>Start➡️</Button>
      ) : (
        <Button>Start➡️</Button>
      )}
      </div>

      <div className="bg-[#696969] h-[30vh] overflow-auto rounded-lg">
        <ul className="flex flex-col gap-4 items-center py-4">
          <p className="font-bold text-xl drop-shadow-lg font-mono md:text-3xl">
            ScoreBoard
          </p>
          {scoreList.map((el) => (
            <Item el={el} key={el.id} setScoreList={setScoreList} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Item({ el, setScoreList }) {
  return (
    <li className="bg-slate-800 text-white flex gap-4 px-2 py-[1px] rounded-lg shadow-lg md:gap-10 lg:gap-14 lg:px-4">
      <span>{el.user}</span>
      <span>Difficulty : {el.difficulty}</span>
      <span>Char/Min: {el.char_per_min}</span>
      <button
        onClick={() =>
          setScoreList((scoreList) =>
            scoreList.filter((score) => score.id !== el.id)
          )
        }
        className="hover:bg-slate-300 transition-colors duration-300 ease-linear rounded-md"
      >
        ✖️
      </button>
    </li>
  );
}
export default HomePage;
