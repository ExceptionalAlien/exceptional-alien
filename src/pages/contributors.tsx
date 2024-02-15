import { useEffect, useContext } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { CreatorsContext, CreatorsContextType } from "@/context/CreatorsContext";
import Featured from "@/components/creators/Featured";
import All from "@/components/creators/All";
import Overview from "@/components/shared/Overview";
import Loading from "@/components/shared/Loading";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creators({ page, search }: PageProps) {
  const { creators, setCreators } = useContext<CreatorsContextType>(CreatorsContext);

  const loadCreators = async () => {
    const data = await getData();
    setCreators(data); // Store in context
  };

  useEffect(() => {
    // Only get data once
    if (!creators.length) {
      loadCreators();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Contributors"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/contributors" />

        <meta
          property="og:title"
          content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Contributors"}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="pt-8 md:pt-12">
        <Featured creators={page.data.featured} />
        <Overview text={page.data.overview} />

        {creators.length !== 0 ? (
          <All creators={creators} />
        ) : (
          <section>
            <Loading text="Loading contributors" />
          </section>
        )}
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("creators", {
    fetchLinks:
      "creator.first_name,creator.last_name,creator.uid,creator.hero_image,creator.profile_image,creator.title,creator.home_city,creator.current_city,creator.home_country,creator.short_description",
  });

  const search = await client.getSingle("search", {
    fetch: "search.recommended,search.description",
    fetchLinks: "destination.title",
  });

  return {
    props: {
      page,
      search,
    },
  };
}

const getData = async () => {
  const client = createClient();

  const data = await client.getAllByType("creator", {
    fetch: "creator.first_name,creator.last_name,creator.profile_image,creator.title,creator.current_city",
    orderings: [
      {
        field: "my.creator.first_name",
        direction: "asc",
      },
    ],
  });

  return data;
};
