export default function Filter({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const clear = () => {
    setQuery("");
  };

  return (
    <form className="md:absolute top-0 md:right-6 mb-4">
      {/* Search icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter"
        className="inline-block border-b border-black ml-2 w-[calc(100%-28px)] md:w-64 outline-none rounded-none pr-5"
      />

      {/* Clear */}
      {query && (
        <button
          type="button"
          onClick={clear}
          className="absolute -ml-5 p-1 -mt-[2px] hover:opacity-50 duration-300 ease-in-out transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </form>
  );
}