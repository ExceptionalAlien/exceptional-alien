import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import CreatorThumb from "../shared/CreatorThumb";
import Filter from "../shared/Filter";

export default function All({ creators }: { creators: Content.CreatorDocument[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(ref.current!.children.length);
  }, [query]);

  return (
    <section className="relative">
      <h3 className="!mb-0 md:!mb-4">
        All Creators <span className="text-base md:text-xl">({query.length > 1 ? results : creators.length})</span>
      </h3>

      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {creators.map((item, i) => {
          if (
            query.length <= 1 ||
            (query.length > 1 &&
              `${item.data.first_name} ${item.data.last_name}`.match(new RegExp(query, "gi")) !== null)
          ) {
            return <CreatorThumb key={i} creator={item as Content.CreatorDocument} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${(query.length <= 1 || results) && "hidden"}`}>No results found</p>
    </section>
  );
}
