import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Field() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const clear = () => {
    setQuery("");
  };

  useEffect(() => {
    // Set search query on load if on search page and URL param exists
    if (router.isReady && router.query.q && router.pathname === "/search") {
      setQuery(router.query.q as string);
    }
  }, [router.isReady]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update router
    if (router.pathname === "/search") {
      // Replace query
      router.replace(
        {
          query: query.length > 1 ? { q: query } : {},
        },
        undefined,
        { shallow: true }
      );
    } else if (query.length > 1) {
      // Route to search page
      router.push({
        pathname: "/search",
        query: { q: query },
      });
    }
  };

  return (
    <form name="searchBox" onSubmit={submit} className="relative text-ex-blue">
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 md:w-6 h-5 md:h-6 inline align-[-3px] md:align-[-1px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Destinations, Playbooks & Creators"
        className="max-[320px]:w-64 w-80 md:w-[480px] ml-1 md:ml-2 border-b border-ex-blue outline-none rounded-none text-xl md:text-3xl pr-5 md:pr-[26px] pb-[2px] md:pb-1 text-ex-blue"
      />

      {/* Clear */}
      {query && (
        <button
          type="button"
          onClick={clear}
          className="bottom-[2px] md:bottom-1 -right-2 md:-right-[10px] absolute p-1 md:p-[6px] hover:opacity-50 duration-300 ease-in-out transition-[opacity]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 md:w-6 h-5 md:h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
