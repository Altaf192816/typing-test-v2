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
        className={`text-white text-center absolute bg-[#696969] w-[100vw] z-10 ${openAbout ? "block opacity-100" : "opacity-0 hidden"} transition-opacity duration-500 ease-in`}
      >
        This WebApp is created by Altaf using React and Tailwindcss
      </div>
      <div
        className={`text-white text-center absolute bg-[#696969] w-[100vw] z-10 ${openInstruc ? "opacity-100 block" : "opacity-0 hidden"} transition-opacity duration-500 ease-in`}
      >
        <p>1:-Enter you name, select difficulty, click on "Start" button and type.</p>
        <p>2:-If you unable to type tap on the content on the screen.</p>
        <p>3:-After time up you can see your result.</p>
        <p>4:-If you want to save your score click on "Save Score" and reload to skip saving score.</p>
        <p>5:-Click on X to delete score permantly.</p>
      </div>
    </div>
  );
}
