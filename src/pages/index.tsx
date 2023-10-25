import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN${" - " + page.data.meta_title ?? ""}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com" />
        <meta property="og:title" content={`Exceptional ALIEN${" - " + page.data.meta_title ?? ""}`} />
        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="[&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&>section>h3]:font-bold [&>section>h3]:text-2xl [&>section>h3]:md:text-4xl [&>section>h3]:mb-2 [&>section>h3]:md:mb-4 [&>[data-slice-type=highlight]]:md:text-4xl [&>[data-slice-type=highlight]]:pt-4 [&>[data-slice-type=highlight]]:md:pt-8 [&>[data-slice-type=highlight]]:pb-4 [&>[data-slice-type=highlight]]:md:pb-8 [&>*:nth-child(2)]:!mt-0">
        <SearchBox />
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

  return {
    props: {
      page,
    },
  };
}
