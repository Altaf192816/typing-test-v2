export function Content({ newContent, content, inputEl }) {
  return (
    <div onClick={() => inputEl.current.focus()}>
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
