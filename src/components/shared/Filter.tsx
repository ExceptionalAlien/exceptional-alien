interface FilterProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  classes?: string;
}

export default function Filter(props: FilterProps) {
  const clear = () => {
    props.setQuery("");
  };

  return (
    <form
      name="filter"
      className={`sticky top-12 z-10 flex items-center bg-white pb-4 pt-2 md:relative md:top-0 md:z-auto md:w-72 md:pb-6 md:pt-0 ${props.classes}`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* Search icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>

      <input
        type="text"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Filter"
        className="ml-1 w-full rounded-none border-b border-black pr-5 outline-none"
      />

      {/* Clear */}
      {props.query && (
        <button
          type="button"
          onClick={clear}
          className="absolute -right-2 p-1 transition-[color] duration-300 ease-in-out hover:text-ex-light-grey"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </form>
  );
}
