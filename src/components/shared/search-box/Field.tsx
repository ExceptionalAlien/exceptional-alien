interface Props {
  query: string | string[];
  setQuery: React.Dispatch<React.SetStateAction<string | string[]>>;
}

export default function Field(props: Props) {
  const clear = () => {
    props.setQuery("");
  };

  return (
    <div className="relative mt-4 flex w-full items-center md:mt-6">
      <label htmlFor="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-ex-blue"
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
        className="placeholder-opacity ml-2 w-full rounded-none border-b border-ex-blue pr-6 text-2xl text-ex-blue placeholder-ex-blue outline-none md:text-4xl"
      />

      {/* Clear */}
      {props.query && (
        <button
          type="button"
          onClick={clear}
          className="absolute -right-1 text-ex-blue transition-[color] duration-300 ease-in-out hover:text-ex-light-grey"
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
