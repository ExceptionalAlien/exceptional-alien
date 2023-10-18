import { useEffect, useContext } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { GemsContext, GemsContextType } from "@/context/GemsContext";
import { asText, filter } from "@prismicio/client";
import Featured from "@/components/destination/Featured";
import All from "@/components/destination/All";
import Title from "@/components/destination/Title";
import Overview from "@/components/shared/Overview";
import Loading from "@/components/shared/Loading";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  const { gems, setGems } = useContext<GemsContextType>(GemsContext);

  const loadGems = async () => {
    const data = await getData(page.id);
    setGems({ ...gems, [page.uid as string]: data }); // Store in context with destination as key name
  };

  useEffect(() => {
    // Only get data once for destination
    if (!gems[page.uid]) {
      loadGems();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta property="og:url" content={`https://exceptionalalien.com/gems/${page.uid}`} />

        <meta
          property="og:title"
          content={`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="[&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&>section>h3]:font-bold [&>section>h3]:text-2xl [&>section>h3]:md:text-4xl [&>section>h3]:mb-2 [&>section>h3]:md:mb-3">
        <Title text={page.data.title as string} latLng={page.data.location} />
        {page.data.featured.length > 0 && <Featured playbooks={page.data.featured} />}
        <Overview text={page.data.about} />

        {gems[page.uid] ? (
          <All gems={gems[page.uid]} />
        ) : (
          <section>
            <Loading text="Loading gems" />
          </section>
        )}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps({ params, previewData }: GetStaticPropsContext) {
  try {
    const client = createClient({ previewData });
    const page = await client.getByUID("destination", params?.uid as string, {
      fetchLinks:
        "playbook.title,playbook.image,playbook.destination,playbook.description,playbook.creator,creator.first_name,creator.last_name,creator.profile_image",
    });

    return {
      props: {
        page,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

const getData = async (id: string) => {
  const client = createClient();

  const data = await client.getAllByType("gem", {
    fetch: "gem.title,gem.image,gem.category",
    filters: [filter.at("my.gem.destination", id)],
    orderings: [
      {
        field: "my.gem.title",
        direction: "asc",
      },
    ],
  });

  return data;
};
