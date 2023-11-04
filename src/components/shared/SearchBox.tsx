import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import type { GroupField, KeyTextField } from "@prismicio/client";
import Field from "./search-box/Field";
import Recommended from "./search-box/Recommended";
import { SearchBoxContext, SearchBoxContextType } from "@/context/SearchBoxContext";

interface Props {
  description?: KeyTextField;
  recommended?: GroupField;
  hidden?: boolean;
  classes?: string;
}

export default function SearchBox(props: Props) {
  const router = useRouter();
  const { showingSearchBox, setShowingSearchBox } = useContext<SearchBoxContextType>(SearchBoxContext);
  const [query, setQuery] = useState<string | string[]>("");
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    // Set search query on load if on search page and query URL param exists
    if (router.isReady && router.pathname === "/search" && router.query.q) {
      setQuery(router.query.q);
    }
  }, [router.isReady]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(!props.hidden ? 0 : window.scrollY);
    };

    setShowingSearchBox(false); // Reset on page load

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`z-10 mt-12 flex flex-col items-center justify-center pl-4 pr-4 transition-[height] duration-300 ease-in-out md:mt-20 md:pl-6 md:pr-6 md:transition-[background-color,height] ${
        scrollY > 0 ? "bg-ex-blue" : "bg-white"
      } ${!showingSearchBox && props.hidden && "!h-0"} ${
        props.hidden ? "fixed top-0 h-80 w-full overflow-hidden shadow-md md:h-72" : "h-96 md:h-80"
      } ${props.classes}`}
    >
      <form name="searchBox" onSubmit={submit} className="max-w-lg md:max-w-xl">
        {props.description && (
          <h2
            className={`m-auto mb-4 w-4/5 text-center text-xl font-bold transition-[color] duration-300 ease-in-out md:mb-6 md:w-3/5 ${
              scrollY > 0 ? "text-white" : "text-ex-blue"
            }`}
          >
            {props.description}
          </h2>
        )}

        <Field query={query} setQuery={setQuery} scrollY={scrollY} />
        {props.recommended && <Recommended destinations={props.recommended} scrollY={scrollY} />}
      </form>
    </div>
  );
}
