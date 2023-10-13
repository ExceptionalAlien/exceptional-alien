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
    <section className="relative">
      <h3 className="!mb-0 md:!mb-3">
        All Destinations <span className={`text-base md:text-xl ${query && "hidden"}`}>({destinations.length})</span>
      </h3>

      <Filter query={query} setQuery={setQuery} />

      {/* List */}
      <div className="" ref={ref}>
        {destinations.map((item, i) => {
          if (query.length <= 1 || (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null)) {
            return (
              <Link href={"/destinations/" + item.uid} key={i} className="block">
                {item.data.title}
              </Link>
            );
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${!noResults && "hidden"}`}>No results found</p>
    </section>
  );
}
