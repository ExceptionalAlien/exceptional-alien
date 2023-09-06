import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Featured from "../components/people/Featured";
import All from "../components/people/All";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function People({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>Exceptional ALIEN - People</title>
        <meta name="description" content="" />
        <meta property="og:url" content="https://exceptionalalien.com/people" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Exceptional ALIEN - People" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://exceptionalalien.com/img/og.png" />
        <meta name="theme-color" content="#2220C1" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-full pt-12 md:pt-20 pb-12 md:pb-20 [&>section]:mt-8 [&>section]:md:mt-12 [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&_h3]:font-bold [&_h3]:text-2xl [&_h3]:md:text-4xl [&_h3]:mb-2 [&_h3]:md:mb-3">
        <section className="text-ex-blue font-bold text-xl md:text-3xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl m-auto [&>p]:mt-4 [&>p]:md:mt-6">
          <PrismicRichText field={page.data.overview} />
        </section>

        <Featured featured={page.data.featured} />
        <All featured={page.data.featured} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("people", {
    fetchLinks:
      "creator.first_name,creator.last_name,creator.uid,creator.image,creator.title,creator.home_city,creator.current_city,creator.home_country",
  });

  return {
    props: {
      page,
    },
  };
}
