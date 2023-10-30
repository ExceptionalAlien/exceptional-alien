import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/shared/TabHeading";
import Socials from "@/components/shared/Socials";
import Logo from "@/img/logo-alt-x.svg";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Contact({ page }: PageProps) {
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

      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <TabHeading classes="uppercase relative mt-12 md:mt-24 ml-4 mr-4 md:ml-6 md:mr-6">
          <PrismicRichText field={page.data.page_heading} />
          <Socials classes="absolute top-0 right-0 [&>a]:text-black" />
        </TabHeading>

        <SliceZone slices={page.data.slices} components={components} />

        {/* Alt logo */}
        <section className="pb-8 pt-8 md:pb-16 md:pt-16">
          <Logo className="m-auto w-3/4 fill-ex-blue" />
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("contact");

  return {
    props: {
      page,
    },
  };
}
