import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbooks({ page, playbooks }: PageProps) {
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

      <main className="min-h-full"></main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("playbooks", {
    fetchLinks: "playbook.title",
  });

  const playbooks = await client.getAllByType("playbook", {
    orderings: [
      {
        field: "my.playbook.title",
        direction: "asc",
      },
    ],
  });

  return {
    props: {
      page,
      playbooks,
    },
  };
}
