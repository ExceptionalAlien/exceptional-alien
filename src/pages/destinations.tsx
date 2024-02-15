import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import Trending from "@/components/destinations/Trending";
import All from "@/components/destinations/All";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Destinations({ page, destinations, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Destinations"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/destinations" />

        <meta
          property="og:title"
          content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Destinations"}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="pt-16 md:pt-24 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <Trending destinations={page.data.trending} />
        <All destinations={destinations} />
        <div className="clear-both"></div>
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("destinations", {
    fetchLinks: "destination.title",
  });

  const destinations = await client.getAllByType("destination", {
    fetch: "destination.title,destination.country",
    orderings: [
      {
        field: "my.destination.title",
        direction: "asc",
      },
    ],
  });

  const search = await client.getSingle("search", {
    fetch: "search.recommended,search.description",
    fetchLinks: "destination.title",
  });

  return {
    props: {
      page,
      destinations,
      search,
    },
  };
}
