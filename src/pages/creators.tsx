import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Featured from "../components/creators/Featured";
import All from "../components/creators/All";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creators({ page, creators }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN${page.data.meta_title ? " - " + page.data.meta_title : ""}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/creators" />
        <meta
          property="og:title"
          content={`Exceptional ALIEN${page.data.meta_title ? " - " + page.data.meta_title : ""}`}
        />
        <meta property="og:description" content={page.data.meta_description ?? ""} />
        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="min-h-full pt-12 md:pt-20 pb-12 md:pb-20 [&>section]:mt-8 [&>section]:md:mt-12 [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&_h3]:font-bold [&_h3]:text-2xl [&_h3]:md:text-4xl [&_h3]:mb-2 [&_h3]:md:mb-3">
        <section className="text-ex-blue font-bold text-xl md:text-3xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl m-auto [&>p]:mt-4 [&>p]:md:mt-6">
          <PrismicRichText field={page.data.overview} />
        </section>

        <Featured featured={page.data.featured} />
        <All creators={creators} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("creators", {
    fetchLinks:
      "creator.first_name,creator.last_name,creator.uid,creator.hero_image,creator.profile_image,creator.title,creator.home_city,creator.current_city,creator.home_country",
  });

  const creators = await client.getAllByType("creator", {
    orderings: [
      {
        field: "my.creator.first_name",
        direction: "asc",
      },
    ],
  });

  return {
    props: {
      page,
      creators,
    },
  };
}