import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import Link from "next/link";
import Filter from "../shared/Filter";

export default function All({ destinations }: { destinations: Content.DestinationDocument[] }) {
  const [query, setQuery] = useState("");
  const [noResults, setNoresults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoresults(ref.current!.children.length > 0 ? false : true);
  }, [query]);

  return (
    <section className="md:w-1/2 md:float-right md:pl-3">
      <Filter query={query} setQuery={setQuery} classes="md:!static" />

      {/* List */}
      <div ref={ref}>
        {destinations.map((item, i) => {
          if (query.length <= 1 || (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null)) {
            return (
              <Link
                href={"/destinations/" + item.uid}
                key={i}
                className="uppercase font-bold text-2xl md:text-4xl hover:text-ex-blue duration-300 ease-in-out transition-[color] flex items-center"
              >
                {item.data.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 md:w-9 h-6 md:h-9 stroke-[0.75] md:stroke-[0.5]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Link>
            );
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`md:w-[284px] m-8 md:m-16 md:!ml-0 text-center ${!noResults && "hidden"}`}>No results found</p>
    </section>
  );
}
