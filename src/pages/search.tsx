import { useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { filter } from "@prismicio/client";
import { SearchContext, SearchContextType } from "@/context/SearchContext";
import SearchBox from "@/components/shared/SearchBox";

export default function Search() {
  const router = useRouter();
  const { search, setSearch } = useContext<SearchContextType>(SearchContext);

  const loadResults = async (query: string) => {
    // Get data from Prismic
    const destinations = await getData("destination", query);
    const playbooks = await getData("playbook", query);
    const gems = await getData("gem", query);
    const creators = await getData("creator", query);

    setSearch({
      ...search,
      destinations: destinations.results as Content.DestinationDocument[],
      playbooks: playbooks.results as Content.PlaybookDocument[],
      gems: gems.results as Content.GemDocument[],
      creators: creators.results as Content.CreatorDocument[],
    });
  };

  useEffect(() => {
    console.log(search); // WIP - remove
  }, [search]);

  useEffect(() => {
    if (router.isReady && router.query.q) {
      loadResults(router.query.q as string);
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Exceptional ALIEN - Search</title>
        <meta name="description" content="Search exceptional Destinations, Travel Playbooks, Gems and Creators." />
        <meta property="og:url" content="https://exceptionalalien.com/search" />
        <meta property="og:title" content="Exceptional ALIEN - Search" />
        <meta
          property="og:description"
          content="Search exceptional Destinations, Travel Playbooks, Gems and Creators."
        />
        <meta property="og:image" content="https://exceptionalalien.com/img/og.png" />
      </Head>

      <main className="[&>section>h3]:mb-2 [&>section>h3]:text-2xl [&>section>h3]:font-bold [&>section>h3]:md:mb-4 [&>section>h3]:md:text-4xl [&>section]:pl-4 [&>section]:pr-4 [&>section]:md:pl-6 [&>section]:md:pr-6"></main>
    </>
  );
}

const getData = async (type: any, query: string) => {
  const client = createClient();

  const data = await client.getByType(type, {
    filters: [filter.fulltext("document", query)],
  });

  return data;
};
