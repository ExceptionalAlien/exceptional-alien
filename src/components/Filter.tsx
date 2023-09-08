export default function Filter(props: { classes?: string }) {
  return (
    <form className={`${props.classes}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>

      <input
        type="text"
        placeholder="Filter"
        className="inline-block border-b border-black ml-1 md:ml-2 w-32 md:w-48"
      />
    </form>
  );
}
