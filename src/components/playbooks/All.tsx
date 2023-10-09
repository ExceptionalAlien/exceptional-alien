import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import PlaybookThumb from "../PlaybookThumb";
import Filter from "../Filter";

export default function All({ playbooks }: { playbooks: Content.PlaybookDocument[] }) {
  const [query, setQuery] = useState("");
  const [noResults, setNoresults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoresults(ref.current!.children.length > 0 ? false : true);
  }, [query]);

  return (
    <section className="relative">
      <h3>All Travel Playbooks</h3>
      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {playbooks.map((item, i) => {
          if (query.length <= 1 || (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null)) {
            return <PlaybookThumb key={i} playbook={item as Content.PlaybookDocument} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${!noResults && "hidden"}`}>No results found</p>
    </section>
  );
}
