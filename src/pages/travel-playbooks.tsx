import { useContext, useEffect } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { PlaybooksContext, PlaybooksContextType } from "@/context/PlaybooksContext";
import Featured from "@/components/playbooks/Featured";
import All from "@/components/playbooks/All";
import Spacer from "@/components/shared/Spacer";
import Overview from "@/components/shared/Overview";
import Loading from "@/components/shared/Loading";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbooks({ page }: PageProps) {
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
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Playbooks"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/playbooks" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Playbooks"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="[&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&>section>h3]:font-bold [&>section>h3]:text-2xl [&>section>h3]:md:text-4xl [&>section>h3]:mb-2 [&>section>h3]:md:mb-4">
        <Featured playbooks={page.data.featured} />
        <Spacer />
        <Overview text={page.data.overview} />
        <Spacer />

        {playbooks.length !== 0 ? (
          <All playbooks={playbooks} />
        ) : (
          <section>
            <Loading text="Loading playbooks" />
          </section>
        )}
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("playbooks", {
    fetchLinks:
      "playbook.title,playbook.image,playbook.destination,playbook.description,playbook.creator,destination.title,creator.first_name,creator.last_name,creator.profile_image",
  });

  return {
    props: {
      page,
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
