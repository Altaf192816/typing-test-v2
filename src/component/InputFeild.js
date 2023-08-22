export function InputFeild({ isDisable, input, handleInput }) {
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
        onChange={handleInput} />
    </div>
  );
}
