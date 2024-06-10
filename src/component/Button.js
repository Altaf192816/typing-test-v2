export function Button({ onClick, children }) {
  return (
    <button
      className="h-min px-8 bg-[#696969] hover:bg-slate-700 transition-all duration-500 ease-in-out text-white py-[1px] rounded-xl hover:shadow-lg hover:drop-shadow-xl w-min m-auto hover:-translate-y-[2px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
