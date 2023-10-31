import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { GroupField, KeyTextField } from "@prismicio/client";
import Field from "./search-box/Field";
import Recommended from "./search-box/Recommended";

interface Props {
  description: KeyTextField;
  recommended?: GroupField;
  classes?: string;
}

export default function SearchBox(props: Props) {
  const router = useRouter();
  const [query, setQuery] = useState<string | string[]>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update router
    if (router.pathname === "/search") {
      // Replace query
      router.replace(
        {
          query: query.length > 1 ? { q: query } : {},
        },
        undefined,
        { shallow: true }
      );
    } else if (query.length > 1) {
      // Route to search page
      router.push({
        pathname: "/search",
        query: { q: query },
      });
    }
  };

  useEffect(() => {
    // Set search query on load if on search page and query URL param exists
    if (router.isReady && router.pathname === "/search" && router.query.q) {
      setQuery(router.query.q);
    }
  }, [router.isReady]);

  return (
    <form
      name="searchBox"
      onSubmit={submit}
      className={`m-auto box-content flex h-96 max-w-lg flex-col items-center justify-center pl-4 pr-4 md:max-w-xl md:pl-6 md:pr-6 ${props.classes}`}
    >
      <h2 className="w-3/4 text-center text-lg font-bold text-ex-blue">{props.description}</h2>
      <Field query={query} setQuery={setQuery} />
      {props.recommended && <Recommended destinations={props.recommended} />}
    </form>
  );
}
