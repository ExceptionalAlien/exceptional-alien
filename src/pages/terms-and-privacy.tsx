import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/shared/TabHeading";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function TermsAndPrivacy({ page, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Terms & Privacy"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />

        <meta
          property="og:title"
          content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Terms & Privacy"}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <TabHeading classes="uppercase mt-12 md:mt-24 ml-4 mr-4 md:ml-6 md:mr-6">
          <PrismicRichText field={page.data.page_heading} />
        </TabHeading>

        <SliceZone slices={page.data.slices} components={components} />
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("terms_and_privacy");

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
