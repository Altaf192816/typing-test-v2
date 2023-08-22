export function Timer({ timer }) {
  return (
    <div className="bg-[#696969] w-24 py-1 rounded-lg shadow-xl m-auto">
      <p className={`${timer <= 10 ? "text-red-500" : "text-white"}`}>
        {timer === 0 ? "Time UP⏳" : `${timer} Sec⏰`}
      </p>
    </div>
  );
}
