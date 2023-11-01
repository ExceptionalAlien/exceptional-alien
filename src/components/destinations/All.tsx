import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import Link from "next/link";
import Filter from "../shared/Filter";
import NoResults from "../shared/NoResults";

interface AllProps {
  destinations: Content.DestinationDocument[];
}

export default function All(props: AllProps) {
  const [query, setQuery] = useState("");
  const [noResults, setNoresults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoresults(ref.current!.children.length > 0 ? false : true);
  }, [query]);

  return (
    <section className="!mt-16 md:float-right md:!mt-24 md:w-1/2 md:!pl-3">
      <Filter query={query} setQuery={setQuery} />

      {/* List */}
      <div ref={ref}>
        {props.destinations.map((item, i) => {
          if (
            query.length <= 1 ||
            (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null) ||
            (query.length > 1 && item.data.country?.match(new RegExp(query, "gi")) !== null)
          ) {
            return (
              <Link
                href={"/destinations/" + item.uid}
                key={i}
                className="flex items-center text-3xl font-bold uppercase transition-[color] duration-300 ease-in-out hover:text-ex-blue md:text-5xl"
              >
                {item.data.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 stroke-[0.5] md:h-12 md:w-12"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Link>
            );
          }
        })}
      </div>

      <NoResults visible={noResults} classes="md:w-72" />
    </section>
  );
}
