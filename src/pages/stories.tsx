import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";
import Head from "next/head";
import Featured from "@/components/stories/Featured";
import Spacer from "@/components/shared/Spacer";
import Overview from "@/components/shared/Overview";
import All from "@/components/stories/All";
import Loading from "@/components/shared/Loading";
import { useContext, useEffect } from "react";
import { StoriesContext, StoriesContextType } from "@/context/StoriesContext";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Playbooks({ page }: PageProps) {
  const { stories, setStories } = useContext<StoriesContextType>(StoriesContext);

  const loadStories = async () => {
    const data = await getData();
    setStories(data); // Store in context
  };

  useEffect(() => {
    // Only get data once
    if (!stories.length) {
      loadStories();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Stories"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/stories" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Stories"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>
      <main className="[&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&>section>h3]:font-bold [&>section>h3]:text-2xl [&>section>h3]:md:text-4xl [&>section>h3]:mb-2 [&>section>h3]:md:mb-4">
        <Featured stories={page.data.featured} />
        <Spacer />
        <Overview text={page.data.overview} />
        <Spacer />

        {stories.length !== 0 ? (
          <All stories={stories} />
        ) : (
          <section>
            <Loading text="Loading stories" />
          </section>
        )}
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("stories", {
    fetchLinks:
      "story.title",
  });

  return {
    props: {
      page,
    },
  };
}

const getData = async () => {
  const client = createClient();

  const data = await client.getAllByType("story", {
    fetch: "story.title,story.image,story.creator,story.destination",
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
