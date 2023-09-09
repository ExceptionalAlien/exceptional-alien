export default function Filter(props: { query: string; setQuery: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <form className="sm:absolute top-0 sm:right-4 md:right-6 mb-4">
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
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Filter"
        className="inline-block border-b border-black ml-2 w-[calc(100%-28px)] sm:w-64 outline-none rounded-none"
      />
    </form>
  );
}
