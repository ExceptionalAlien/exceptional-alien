import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import Featured from "@/components/creators/Featured";
import All from "@/components/creators/All";
import Spacer from "@/components/shared/Spacer";
import Overview from "@/components/shared/Overview";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creators({ page, creators }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Creators"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/creators" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Creators"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="[&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&>section>h3]:font-bold [&>section>h3]:text-2xl [&>section>h3]:md:text-4xl [&>section>h3]:mb-2 [&>section>h3]:md:mb-3">
        <Featured creators={page.data.featured} />
        <Spacer />
        <Overview text={page.data.overview} />
        <Spacer />
        <All creators={creators} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("creators", {
    fetchLinks:
      "creator.first_name,creator.last_name,creator.uid,creator.hero_image,creator.profile_image,creator.title,creator.home_city,creator.current_city,creator.home_country,creator.short_description",
  });

  const creators = await client.getAllByType("creator", {
    orderings: [
      {
        field: "my.creator.uid",
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
