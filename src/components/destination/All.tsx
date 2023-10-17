import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import GemThumb from "./GemThumb";
import Filter from "../shared/Filter";

export default function All({ gems }: { gems: Content.GemDocument[] }) {
  const [query, setQuery] = useState("");
  const [noResults, setNoresults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoresults(ref.current!.children.length > 0 ? false : true);
  }, [query]);

  return (
    <section className="relative">
      <h3 className="!mb-0 md:!mb-3">
        All Gems <span className={`text-base md:text-xl ${query && "hidden"}`}>({gems.length})</span>
      </h3>

      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {gems.map((item, i) => {
          if (query.length <= 1 || (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null)) {
            return <GemThumb key={i} gem={item as Content.GemDocument} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${!noResults && "hidden"}`}>No results found</p>
    </section>
  );
}
