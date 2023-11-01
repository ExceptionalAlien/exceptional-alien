import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ page, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com" />
        <meta property="og:title" content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN"} />
        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <SearchBox description={search.data.description} recommended={search.data.recommended} />

      <main className="!pt-0 [&>*:nth-child(1)]:!mt-0">
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home", {
    fetchLinks:
      "playbook.title,playbook.image,playbook.destination,playbook.description,playbook.creator,playbook.slices,destination.title,creator.first_name,creator.last_name,creator.profile_image,gem.title,gem.image,gem.category",
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
