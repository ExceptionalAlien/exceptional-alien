import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/shared/TabHeading";
import Spacer from "@/components/shared/Spacer";

function Hello() {
  return (
    <section className="font-bold text-3xl md:text-5xl [&>p]:mr-3 [&>p]:md:mr-5 [&>p]:inline-block">
      <p className="text-ex-blue">HELLO</p>
      <p>KIA ORA</p>
      <p>KONNICHIWA</p>
      <p>CIAO</p>
      <p>BONJOUR</p>
      <p>HEI</p>
      <p>SALUT</p>
      <p>GUTEN TAG</p>
      <p>AHLAN</p>
      <p>NI HAO</p>
      <p>SELAM</p>
      <p>HEJ</p>
      <p>YASSOU</p>
      <p>HOI</p>
      <p>ANYOUNG</p>
      <p>HALLO</p>
      <p>AHOJ</p>
      <p>OLA</p>
      <p>NAMASTE</p>
      <p>XIN CHAO</p>
      <p>SHALOM</p>
      <p>HAI</p>
    </section>
  );
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function About({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "About"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "About"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="box-content p-4 md:p-6 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <Spacer />

        <TabHeading classes="uppercase">
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
