import { useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { filter } from "@prismicio/client";
import { SearchContext, SearchContextType } from "@/context/SearchContext";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Search({ page }: PageProps) {
  const router = useRouter();
  const { searchResults, setSearchResults } = useContext<SearchContextType>(SearchContext);

  const loadResults = async (query: string) => {
    // Get data from Prismic
    const destinations = await getData("destination", query);
    const playbooks = await getData("playbook", query);
    const gems = await getData("gem", query);
    const creators = await getData("creator", query);

    setSearchResults({
      ...searchResults,
      destinations: destinations.results as Content.DestinationDocument[],
      playbooks: playbooks.results as Content.PlaybookDocument[],
      gems: gems.results as Content.GemDocument[],
      creators: creators.results as Content.CreatorDocument[],
    });
  };

  useEffect(() => {
    console.log(searchResults); // WIP - remove
  }, [searchResults]);

  useEffect(() => {
    if (router.isReady && router.query.q) {
      loadResults(router.query.q as string);
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Search"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/search" />

        <meta
          property="og:title"
          content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Search"}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <SearchBox classes="h-40" />

      <main className="!pt-0 [&>section>h3]:mb-2 [&>section>h3]:text-2xl [&>section>h3]:font-bold [&>section>h3]:md:mb-4 [&>section>h3]:md:text-4xl"></main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("search", { fetchLinks: "destination.title" });

  return {
    props: {
      page,
    },
  };
}

const getData = async (type: "creator" | "playbook" | "destination" | "gem", query: string) => {
  const client = createClient();

  const data = await client.getByType(type, {
    filters: [filter.fulltext("document", query)],
  });

  return data;
};
