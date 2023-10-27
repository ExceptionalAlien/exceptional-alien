import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/shared/TabHeading";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function About({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - About"}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/about" />
        <meta property="og:title" content={page.data.meta_title ? page.data.meta_title : "Exceptional ALIEN - About"} />
        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="pl-4 pr-4 md:max-w-3xl md:pl-6 md:pr-6 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <TabHeading classes="uppercase">
          <PrismicRichText field={page.data.page_heading} />
        </TabHeading>

        <section className="text-2xl font-bold md:text-5xl [&>span]:mr-2 [&>span]:inline-block [&>span]:md:mr-4">
          <span className="text-ex-blue">HELLO</span>
          <span>KIA ORA</span>
          <span>KONNICHIWA</span>
          <span>CIAO</span>
          <span>BONJOUR</span>
          <span>HEI</span>
          <span>SALUT</span>
          <span>GUTEN TAG</span>
          <span>AHLAN</span>
          <span>NI HAO</span>
          <span>SELAM</span>
          <span>HEJ</span>
          <span>YASSOU</span>
          <span>HOI</span>
          <span>ANYOUNG</span>
          <span>HALLO</span>
          <span>AHOJ</span>
          <span>OLA</span>
          <span>NAMASTE</span>
          <span>XIN CHAO</span>
          <span>SHALOM</span>
          <span>HAI</span>
        </section>

        <SliceZone slices={page.data.slices} components={components} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("about");

  return {
    props: {
      page,
    },
  };
}
