import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Content } from "@prismicio/client";
import GemThumb from "../shared/GemThumb";
import Category from "./all/Category";
import Filter from "../shared/Filter";
import NoResults from "../shared/NoResults";
import Gem from "@/img/icon-gem.svg";

type AllProps = {
  gems: Content.GemDocument[];
};

export default function All(props: AllProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const visibleGems: string[] = [];

  // Only show Gems that are not included in a single locked Playbook
  for (let i = 0; i < props.gems.length; i++) {
    let gem = props.gems[i];
    let playbooks = gem.data.playbooks;

    for (let i = 0; i < playbooks.length; i++) {
      if (!(playbooks[i].playbook as unknown as Content.PlaybookDocument).data.locked && !visibleGems.includes(gem.uid))
        visibleGems.push(gem.uid);
    }
  }

  useEffect(() => {
    // Set query on load if URL param exists
    if (router.query.q) {
      setQuery(router.query.q as string);
    }

    // Set categories on load if URL param exists
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
      <h4 className="flex items-center text-2xl font-bold md:pb-1 md:text-4xl">
        <Gem className="mb-1 mr-1 h-5 overflow-visible md:mr-2 md:h-6" />
        All Gems
        <span className="ml-1 text-base md:ml-2 md:text-xl">
          ({query.length > 1 || categories.length ? results : visibleGems.length})
        </span>
      </h4>

      {/* Catgeories */}
      <div className="mb-2 md:mb-6">
        <Category name="Accommodation" categories={categories} setCategories={setCategories} />
        <Category name="Culture" categories={categories} setCategories={setCategories} />
        <Category name="Events" categories={categories} setCategories={setCategories} />
        <Category name="Food & Drink" categories={categories} setCategories={setCategories} />
        <Category name="Nature" categories={categories} setCategories={setCategories} />
        <Category name="Neighbourhoods" categories={categories} setCategories={setCategories} />
        <Category name="Retail" categories={categories} setCategories={setCategories} />
        <Category name="Wellness" categories={categories} setCategories={setCategories} />
      </div>

      <Filter query={query} setQuery={setQuery} classes="md:!absolute md:right-6" />

      {/* Thumbs */}
      <div
        className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 md:gap-x-3 md:gap-y-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        ref={ref}
      >
        {props.gems.map((item, i) => {
          if (
            (query.length <= 1 && !categories.length && visibleGems.includes(item.uid)) ||
            (categories.length &&
              query.length > 1 &&
              item.data.title?.match(new RegExp(query, "gi")) !== null &&
              categories.includes(item.data.category.toLowerCase()) &&
              visibleGems.includes(item.uid)) ||
            (query.length > 1 &&
              !categories.length &&
              item.data.title?.match(new RegExp(query, "gi")) !== null &&
              visibleGems.includes(item.uid)) ||
            (categories.length &&
              query.length <= 1 &&
              categories.includes(item.data.category.toLowerCase()) &&
              visibleGems.includes(item.uid))
          ) {
            return <GemThumb key={i} gem={item as Content.GemDocument} />;
          }
        })}
      </div>

      <NoResults visible={(query.length <= 1 && !categories.length) || results ? false : true} />
    </section>
  );
}
