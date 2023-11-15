interface Props {
  query: string | string[];
  setQuery: React.Dispatch<React.SetStateAction<string | string[]>>;
  scrollY: number;
  disabled: boolean;
}

export default function Field(props: Props) {
  const clear = () => {
    props.setQuery("");
  };

  return (
    <div className="relative flex w-full items-center">
      <label
        htmlFor="search"
        className={`transition-[color] duration-300 ease-in-out ${props.scrollY > 0 ? "text-white" : "text-ex-blue"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-6 w-6`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </label>

      <input
        type="text"
        value={props.query}
        enterKeyHint="search"
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Search"
        id="search"
        disabled={props.disabled}
        className={`placeholder-opacity ml-2 w-full rounded-none border-b bg-transparent pr-6 text-2xl outline-none transition-[border-color,color] duration-300 ease-in-out md:text-4xl ${
          props.scrollY > 0
            ? "border-white text-white placeholder-white"
            : "border-ex-blue text-ex-blue placeholder-ex-blue"
        }`}
      />

      {/* Clear */}
      {props.query && (
        <button
          type="button"
          onClick={clear}
          className={`absolute -right-2 mt-1 p-1 transition-[color] duration-300 ease-in-out hover:text-ex-light-grey ${
            props.scrollY > 0 ? "text-white" : "text-ex-blue"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
