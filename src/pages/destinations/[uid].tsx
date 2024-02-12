import { useEffect, useContext } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { GemsContext, GemsContextType } from "@/context/GemsContext";
import { asText, filter, Content } from "@prismicio/client";
import Featured from "@/components/destination/Featured";
import All from "@/components/destination/All";
import Overview from "@/components/shared/Overview";
import Loading from "@/components/shared/Loading";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page, search }: PageProps) {
  const { gems, setGems } = useContext<GemsContextType>(GemsContext);

  const loadGems = async () => {
    const data = await getData(page.id);
    setGems({ ...gems, [page.uid]: data }); // Store in context with destination as key
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

      <main className="pt-8 md:pt-12">
        {/* Title */}
        <section className="!mt-0">
          <hgroup className="float-left w-3/5 pr-2 md:pr-3">
            <h2 className="text-3xl font-bold uppercase md:text-6xl">{page.data.title}</h2>
            <h3 className="text-lg text-ex-grey md:text-2xl">{page.data.country}</h3>
          </hgroup>

          <p className="float-right w-2/5 text-right font-mono text-xs md:text-sm">
            {Math.abs(page.data.location.latitude).toFixed(5)}°{page.data.location.latitude < 0 ? "S" : "N"}
            <br />
            {Math.abs(page.data.location.longitude).toFixed(5)}°{page.data.location.longitude < 0 ? "W" : "E"}
          </p>

          <div className="clear-both"></div>
        </section>

        {page.data.featured.length > 0 &&
          (page.data.featured[0]?.playbook as unknown as Content.PlaybookDocument).data && (
            <Featured playbooks={page.data.featured} />
          )}

        <Overview text={page.data.about} />

        {gems[page.uid] ? (
          <All gems={gems[page.uid]} />
        ) : (
          <section>
            <Loading text="Loading Gems" />
          </section>
        )}
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
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
  } catch (error) {
    return { notFound: true };
  }
}

const getData = async (id: string) => {
  const client = createClient();

  const data = await client.getAllByType("gem", {
    fetch: "gem.title,gem.image,gem.category,gem.playbooks",
    filters: [filter.at("my.gem.destination", id)],
    fetchLinks: "playbook.creator,creator.profile_image",
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "desc",
      },
    ],
  });

  return data;
};
