import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import Trending from "@/components/destinations/Trending";
import All from "@/components/destinations/All";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Destinations({ page, destinations }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Destinations"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/destinations" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Destinations"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="box-content p-4 md:p-6 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <Trending destinations={page.data.trending} />
        <All destinations={destinations} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("destinations", {
    fetchLinks: "destination.title",
  });

  const destinations = await client.getAllByType("destination", {
    fetchLinks: "",
    orderings: [
      {
        field: "my.destination.title",
        direction: "asc",
      },
    ],
  });

  return {
    props: {
      page,
      destinations,
    },
  };
}
