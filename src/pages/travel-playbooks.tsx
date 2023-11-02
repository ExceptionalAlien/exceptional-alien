import { useContext, useEffect } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { PlaybooksContext, PlaybooksContextType } from "@/context/PlaybooksContext";
import Featured from "@/components/playbooks/Featured";
import All from "@/components/playbooks/All";
import Overview from "@/components/shared/Overview";
import Loading from "@/components/shared/Loading";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbooks({ page, search }: PageProps) {
  const { playbooks, setPlaybooks } = useContext<PlaybooksContextType>(PlaybooksContext);

  const loadPlaybooks = async () => {
    const data = await getData();
    setPlaybooks(data); // Store in context
  };

  useEffect(() => {
    // Only get data once
    if (!playbooks.length) {
      loadPlaybooks();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Travel Playbooks"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/travel-playbooks" />

        <meta
          property="og:title"
          content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Travel Playbooks"}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="">
        <Featured playbooks={page.data.featured} />
        <Overview text={page.data.overview} />

        {playbooks.length !== 0 ? (
          <All playbooks={playbooks} />
        ) : (
          <section>
            <Loading text="Loading playbooks" />
          </section>
        )}
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("playbooks", {
    fetchLinks:
      "playbook.title,playbook.image,playbook.destination,playbook.description,playbook.creator,destination.title,creator.first_name,creator.last_name,creator.profile_image",
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

  const data = await client.getAllByType("playbook", {
    fetch: "playbook.title,playbook.image,playbook.creator,playbook.destination",
    fetchLinks: "destination.title,creator.first_name,creator.last_name",
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "desc",
      },
    ],
  });

  return data;
};
