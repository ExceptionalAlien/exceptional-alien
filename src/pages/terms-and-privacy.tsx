import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import TabHeading from "@/components/TabHeading";
import Spacer from "@/components/Spacer";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function TermsAndPrivacy({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Terms & Privacy"}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : "Terms & Privacy"}`}
        />

        <meta property="og:description" content={page.data.meta_description ?? ""} />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <div className="bg-white">
        <main className="p-4 md:p-6 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>[data-slice-type=text\_with\_heading]]:mt-5">
          <Spacer />

          <TabHeading classes="!mt-12 md:!mt-24 uppercase">
            <PrismicRichText field={page.data.page_heading} />
          </TabHeading>

          <SliceZone slices={page.data.slices} components={components} />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("terms_and_privacy");

  return {
    props: {
      page,
    },
  };
}
