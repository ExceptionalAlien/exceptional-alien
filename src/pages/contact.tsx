import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/shared/TabHeading";
import Socials from "@/components/shared/Socials";
import SearchBox from "@/components/shared/SearchBox";
import Logo from "@/img/logo-alt-x.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Contact({ page, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Contact"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />

        <meta
          property="og:title"
          content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - Contact"}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="pt-16 md:max-w-3xl md:pt-24 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <TabHeading classes="uppercase relative ml-4 mr-4 md:ml-6 md:mr-6">
          <PrismicRichText field={page.data.page_heading} />
          <Socials classes="absolute top-0 right-0 [&>a]:!text-black" />
        </TabHeading>

        <SliceZone slices={page.data.slices} components={components} />

        {/* Alt logo */}
        <section className="pb-8 pt-8 md:pb-12 md:pt-12">
          <Logo className="m-auto w-3/4 fill-ex-blue" />
        </section>
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("contact");

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
