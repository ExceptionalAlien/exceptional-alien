import { useEffect, useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { Content, filter } from "@prismicio/client";
import { SearchContext, SearchContextType } from "@/context/SearchContext";
import SearchBox from "@/components/shared/SearchBox";
import Loading from "@/components/shared/Loading";
import Playbooks from "@/components/search/Playbooks";
import NoResults from "@/components/shared/NoResults";
import Creators from "@/components/search/Creators";
import Destinations from "@/components/search/Destinations";
import Gems from "@/components/search/Gems";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Search({ page }: PageProps) {
  const router = useRouter();
  const { searchResults, setSearchResults } = useContext<SearchContextType>(SearchContext);
  const [searching, setSearching] = useState(false);

  const loadResults = async (query: string) => {
    // Get data from Prismic
    const destinations = await getData("destination", query);
    const playbooks = await getData("playbook", query);
    const gems = await getData("gem", query);
    const creators = await getData("creator", query);

    // Update context
    setSearchResults({
      ...searchResults,
      destinations: destinations.results as Content.DestinationDocument[],
      playbooks: playbooks.results as Content.PlaybookDocument[],
      gems: gems.results as Content.GemDocument[],
      creators: creators.results as Content.CreatorDocument[],
      query: query,
    });

    setSearching(false);
  };

  useEffect(() => {
    if (router.isReady && router.query.q && router.query.q !== searchResults.query) {
      setSearching(true);
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

      <SearchBox classes="h-44 md:h-60" disabled={searching ? true : false} />

      <main className="!pt-0 [&>*:nth-child(2)]:!mt-0">
        {searching && <Loading text="Searching" />}

        <NoResults
          visible={
            !searchResults.playbooks.length &&
            !searchResults.creators.length &&
            !searchResults.destinations.length &&
            !searchResults.gems.length &&
            router.query.q &&
            !searching
              ? true
              : false
          }
          classes="!p-0"
        />

        {!searching && searchResults.destinations.length ? (
          <Destinations results={searchResults.destinations} />
        ) : (
          <></>
        )}

        {!searching && searchResults.playbooks.length ? <Playbooks results={searchResults.playbooks} /> : <></>}
        {!searching && searchResults.creators.length ? <Creators results={searchResults.creators} /> : <></>}
        {!searching && searchResults.gems.length ? <Gems results={searchResults.gems} /> : <></>}
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("search");

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
    fetchLinks: "destination.title,creator.first_name,creator.last_name,creator.profile_image,playbook.creator",
  });

  return data;
};
