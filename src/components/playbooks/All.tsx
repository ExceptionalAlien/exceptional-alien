import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import PlaybookThumb from "../shared/PlaybookThumb";
import Filter from "../shared/Filter";

export default function All({ playbooks }: { playbooks: Content.PlaybookDocument[] }) {
  const [query, setQuery] = useState("");
  const [noResults, setNoresults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoresults(ref.current!.children.length > 0 ? false : true);
  }, [query]);

  return (
    <section className="relative">
      <h3 className="!mb-0 md:!mb-4">
        All Travel Playbooks <span className={`text-base md:text-xl ${query && "hidden"}`}>({playbooks.length})</span>
      </h3>

      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {playbooks.map((item, i) => {
          if (
            query.length <= 1 ||
            (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null) ||
            (query.length > 1 &&
              (item.data.destination as unknown as Content.DestinationDocument).data.title?.match(
                new RegExp(query, "gi")
              ) !== null) ||
            (query.length > 1 &&
              `${(item.data.creator as unknown as Content.CreatorDocument).data.first_name} ${
                (item.data.creator as unknown as Content.CreatorDocument).data.last_name
              }`.match(new RegExp(query, "gi")) !== null)
          ) {
            return <PlaybookThumb key={i} playbook={item as Content.PlaybookDocument} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${!noResults && "hidden"}`}>No results found</p>
    </section>
  );
}
