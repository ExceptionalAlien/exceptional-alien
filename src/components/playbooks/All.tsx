import { useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import PlaybookThumb from "../shared/PlaybookThumb";
import Filter from "../shared/Filter";
import NoResults from "../shared/NoResults";

type AllProps = {
  playbooks: Content.PlaybookDocument[];
};

export default function All(props: AllProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(ref.current!.children.length); // Count results
  }, [query]);

  return (
    <section className="relative">
      <h3 className="text-2xl font-bold md:pb-3 md:text-4xl">
        All Travel Playbooks
        <span className="ml-1 text-base md:ml-2 md:text-xl">
          ({query.length > 1 ? results : props.playbooks.length})
        </span>
      </h3>

      <Filter query={query} setQuery={setQuery} classes="md:!absolute md:right-6" />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        ref={ref}
      >
        {props.playbooks.map((item, i) => {
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
            return <PlaybookThumb key={i} playbook={item as Content.PlaybookDocument} />;
          }
        })}
      </div>

      <NoResults visible={query.length <= 1 || results ? false : true} />
    </section>
  );
}
