export function InputFeild({ isDisable, input, handleInput ,inputEl}) {
  return (
    <div className="text-black">
      <input
        onPaste={(e) => e.preventDefault()}
        disabled={isDisable}
        autoFocus
        type="text"
        placeholder="Write here..."
        className="opacity-0"
        value={input}
        onChange={handleInput}
        ref={inputEl} />
    </div>
  );
}
