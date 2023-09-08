import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "../slices";
import TabHeading from "../components/TabHeading";

function Hello() {
  return (
    <section className="font-bold text-3xl md:text-5xl [&>*]:mr-3 [&>*]:md:mr-5 [&>*]:inline-block">
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
  );
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function About({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN${page.data.meta_title ? " - " + page.data.meta_title : ""}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />
        <meta
          property="og:title"
          content={`Exceptional ALIEN${page.data.meta_title ? " - " + page.data.meta_title : ""}`}
        />
        <meta property="og:description" content={page.data.meta_description ?? ""} />
        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="min-h-full p-4 md:p-6 pt-12 md:pt-20 pb-12 md:pb-20 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl m-auto [&>section]:mt-8 [&>section]:md:mt-16">
        <TabHeading classes="!mt-16 md:!mt-24 uppercase">
          <PrismicRichText field={page.data.page_heading} />
        </TabHeading>

        <Hello />
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
