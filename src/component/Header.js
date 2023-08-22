import { useState } from "react";

export function Header() {
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
            className="w-8 inline lg:w-14" />
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
        className={`text-white absolute bg-[#696969] w-[100vw] z-10 ${openAbout ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in`}
      >
        This WebApp is created by Altaf using React and Tailwindcss
      </div>
      <div
        className={`text-white absolute bg-[#696969] w-[100vw] z-10 ${openInstruc ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in`}
      >
        <p>1:-You have 60 sec to type</p>
        <p>2:-Start the game using Start button below</p>
        <p>3:-After 60sec you can see your result</p>
        <p>4:-Click on Reset button to play again</p>
      </div>
    </div>
  );
}
