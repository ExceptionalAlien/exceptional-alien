import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import Filter from "../shared/Filter";
import StoryThumb from "@/components/shared/StoryThumb";

export default function All({ stories }: { stories: Content.StoryDocument[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(ref.current!.children.length); // Count results
  }, [query]);

  return (
    <section className="relative">
      <h3 className="!mb-0 md:!mb-4">
        All Stories{" "}
        <span className="text-base md:text-xl">({query.length > 1 ? results : stories.length})</span>
      </h3>

      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {stories.map((item, i) => {
          if (
            query.length <= 1 ||
            (query.length > 1 && item.data.title?.match(new RegExp(query, "gi")) !== null) ||
            (query.length > 1 &&
              (item.data.destination as unknown as Content.DestinationDocument).data?.title?.match(
                new RegExp(query, "gi")
              ) !== null) ||
            (query.length > 1 &&
              `${(item.data.creator as unknown as Content.CreatorDocument).data.first_name} ${
                (item.data.creator as unknown as Content.CreatorDocument).data.last_name
              }`.match(new RegExp(query, "gi")) !== null)
          ) {
            return <StoryThumb key={i} story={item as Content.StoryDocument} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${(query.length <= 1 || results) && "hidden"}`}>No results found</p>
    </section>
  );
}
