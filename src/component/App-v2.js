import { useEffect, useState } from "react";

const url = "https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=15";

const time = 60;

function App() {
  const [content, setContent] = useState("");
  const [isOpen, setISOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function dataFecthing() {
        try {
          setIsLoading(true); //!
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "cb224e1b45msh081aabaaf19def7p174252jsn9b238512c4e9",
              "X-RapidAPI-Host": "hargrimm-wikihow-v1.p.rapidapi.com",
            },
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          const sentence = Object.values(data)
            .join("")
            .toLowerCase()
            .replaceAll(".", " ")
            .replaceAll(",", " ")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll('"', "")
            .replaceAll("  ", " ");
            
          setContent(sentence);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err);
          }
        } finally {
          setIsLoading(false);
        }
      }
      dataFecthing();

      return () => controller.abort();
    },
    [setContent, isOpen]
  );

  if (isLoading)
    return (
      <div className="flex h-[100vh] justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-[#808080] to-[#ffffff] h-[100vh] text-white  w-[100vw] sm:text-lg">
      <Header />
      <div className="min-h-[70vh] flex justify-center items-center">
        {isOpen ? (
          <Main content={content} setISOpen={setISOpen} isLoading={isLoading} />
        ) : (
          <Button setISOpen={setISOpen}>Start➡️</Button>
        )}
      </div>
    </div>
  );
}

function Header() {
  const [openAbout, setOpenAbout] = useState(false);
  const [openInstruc, setOpenInstruc] = useState(false);

  return (
    <div className="text-white">
      <ul
        className={`flex justify-between bg-[#696969] items-center lg:h-[10vh] lg:justify-around`}
      >
        <li>
          <img
            src="keyboard.png"
            alt="KeyBoard-logo"
            className="w-8 inline lg:w-14"
          />
          <p className="logo inline lg:text-3xl"> Typing Test</p>
        </li>
        <li
          className="hover:bg-slate-800 hover:cursor-pointer px-2 rounded-lg transition-colors duration-300 ease-in"
          onClick={() => {
            setOpenInstruc(false);
            setOpenAbout((is) => !is);
          }}
        >
          About
        </li>
        <li
          className="hover:bg-slate-800 hover:cursor-pointer px-2 rounded-lg transition-colors duration-300 ease-in"
          onClick={() => {
            setOpenAbout(false);
            setOpenInstruc((is) => !is);
          }}
        >
          Instrution
        </li>
      </ul>
      <div
        className={`text-white absolute bg-[#696969] w-[100vw] z-10 ${
          openAbout ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in`}
      >
        This WebApp is created by Altaf using React and Tailwindcss
      </div>
      <div
        className={`text-white absolute bg-[#696969] w-[100vw] z-10 ${
          openInstruc ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in`}
      >
        <p>1:-You have 60 sec to type</p>
        <p>2:-Start the game using Start button below</p>
        <p>3:-After 60sec you can see your result</p>
        <p>4:-Click on Reset button to play again</p>
      </div>
    </div>
  );
}

function Main({ content, setISOpen }) {
  const [timer, setTimer] = useState(time);
  const [input, setInput] = useState("");
  const [newContent, setNewContent] = useState("");
  const [correctWordArr, setCorrectWordArr] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  const handleInput = function (e) {
    setInput(e.target.value.toLowerCase());
    setNewContent(e.target.value.toLowerCase());
  };
  
//!Causing error
  // useEffect(
  //   function () {
  //     const tick = () => {
  //       setTimer((t) => t - 1);
  //     };
  //     const timerFunc = setInterval(tick, 1000);
  //     if (timer === 0) {
  //       clearInterval(timerFunc);
  //       setCorrectWordArr(
  //         input.split(" ").filter((word, i) => word === content.split(" ")[i])
  //       );
  //       setIsDisable(true);
  //     }
  //     return () => clearInterval(timerFunc);
  //   },
  //   [timer, content]
  // );

  return (
    <div className="text-center w-[100vw] flex flex-col gap-6 mt-4 md:gap-8 md:mt-4 lg:mt-8 xl:gap-16">
      <Heading />
      <Result correctWordArr={correctWordArr} input={input} />
      <Timer timer={timer} />
      <Content newContent={newContent} content={content} />
      <InputFeild
        isDisable={isDisable}
        handleInput={handleInput}
        input={input}
      />
      <Button setISOpen={setISOpen}>⬅️Back</Button>
    </div>
  );
}

function Heading() {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-xl text-[#696969]">
      Test Your Typing 🧑🏼‍💻
    </h1>
  );
}

function Result({ correctWordArr, input }) {
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

function Timer({ timer }) {
  return (
    <div className="bg-[#696969] w-24 py-1 rounded-lg shadow-xl m-auto">
      <p className={`${timer <= 10 ? "text-red-500" : "text-white"}`}>
        {timer === 0 ? "Time UP⏳" : `${timer} Sec⏰`}
      </p>
    </div>
  );
}

function Content({ newContent, content }) {
  return (
    <div>
      <p className="text-left bg-[#696969] px-2 py-1 text-sm drop-shadow-xl rounded-xl max-h-[40vh] overflow-auto md:text-lg lg:w-[90vw] m-auto shadow-xl">
        <span className="bg-green-500 text-white">
          {[...newContent].filter((c, i) => c === content[i])}
        </span>
        <span className="bg-red-500 text-white">
          {[...newContent].map((c, i) => c !== content[i] && content[i])}
        </span>
        <span>{content.slice(newContent.length)}</span>
      </p>
    </div>
  );
}

function InputFeild({ isDisable, input, handleInput }) {
  return (
    <div className="text-black">
      <input
        onPaste={(e) => e.preventDefault()}
        disabled={isDisable}
        autoFocus
        type="text"
        placeholder="Write here..."
        className="border-[#696969] border-[1px] w-[90vw] rounded-lg px-2 shadow-xl lg:opacity-0  xl:py-2"
        value={input}
        onChange={handleInput}
      />
    </div>
  );
}

function Button({ setISOpen, children }) {
  return (
    <button
      className="h-min px-8 bg-[#696969] hover:bg-slate-700 transition-all duration-500 ease-in-out text-white py-[1px] rounded-xl hover:shadow-lg hover:drop-shadow-xl w-min m-auto hover:-translate-y-[2px]"
      onClick={() => setISOpen((is) => !is)}
    >
      {children}
    </button>
  );
}

function LoadingSpinner() {
  return <img src="Infinity-1s-200px.svg" alt="Loading..."/>;
}

export default App;
