import { useRef, useState, useEffect } from "react";
import { PrismicDocument } from "@prismicio/client";
import CreatorThumb from "../CreatorThumb";
import Filter from "../Filter";

export default function All({ creators }: { creators: PrismicDocument[] }) {
  const [query, setQuery] = useState("");
  const [noResults, setNoresults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoresults(ref.current!.children.length > 0 ? false : true);
  }, [query]);

  return (
    <section className="relative">
      <h3>All Creators</h3>
      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {creators.map((item, i) => {
          if (
            query.length <= 1 ||
            (query.length > 1 &&
              `${item.data.first_name} ${item.data.last_name}`.match(new RegExp(query, "gi")) !== null)
          ) {
            return <CreatorThumb key={i} data={item.data} uid={item.uid as string} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-6 md:m-12 text-center ${!noResults && "hidden"}`}>No results found</p>
    </section>
  );
}
