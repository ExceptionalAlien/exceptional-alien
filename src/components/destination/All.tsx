import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Content } from "@prismicio/client";
import GemThumb from "./GemThumb";
import Categories from "./all/Categories";
import Filter from "../shared/Filter";
import Gem from "@/img/icon-gem.svg";

export default function All({ gems }: { gems: Content.GemDocument[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set query if URL param exist
    if (router.query.q) {
      setQuery(router.query.q as string);
    }

    // Set categories if URL param exist
    if (router.query.c) {
      setCategories((router.query.c as string).split(","));
    }
  }, []);

  useEffect(() => {
    const params = router.query;

    // Set query param
    if (query.length > 1) {
      params.q = query;
    } else {
      delete params.q;
    }

    // Set categories param
    if (categories.length) {
      params.c = categories.toString();
    } else {
      delete params.c;
    }

    // Update router
    router.replace(
      {
        query: params,
      },
      undefined,
      { shallow: true }
    );

    setResults(ref.current!.children.length); // Count results
  }, [query, categories]);

  return (
    <section className="relative">
      <h3 className="!mb-0 md:!mb-2">
        <Gem className="h-5 md:h-7 inline mr-2 align-[-1px]" />
        All Gems{" "}
        <span className="text-base md:text-xl">({query.length > 1 || categories.length ? results : gems.length})</span>
      </h3>

      <Categories categories={categories} setCategories={setCategories} />
      <Filter query={query} setQuery={setQuery} />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9"
        ref={ref}
      >
        {gems.map((item, i) => {
          if (
            (query.length <= 1 && !categories.length) ||
            (categories.length &&
              query.length > 1 &&
              item.data.title?.match(new RegExp(query, "gi")) !== null &&
              categories.includes(item.data.category.toLowerCase())) ||
            (query.length > 1 && !categories.length && item.data.title?.match(new RegExp(query, "gi")) !== null) ||
            (categories.length && query.length <= 1 && categories.includes(item.data.category.toLowerCase()))
          ) {
            return <GemThumb key={i} gem={item as Content.GemDocument} />;
          }
        })}
      </div>

      {/* No filtered results */}
      <p className={`m-8 md:m-16 text-center ${((query.length <= 1 && !categories.length) || results) && "hidden"}`}>
        No results found
      </p>
    </section>
  );
}
