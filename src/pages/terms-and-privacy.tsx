import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function TermsAndPrivacy({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ?? ""}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content="https://exceptionalalien.com/terms-and-privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Exceptional ALIEN - ${page.data.meta_title ?? ""}`} />
        <meta property="og:description" content={page.data.meta_description ?? ""} />
        <meta property="og:image" content="https://exceptionalalien.com/img/og.png" />
        <meta name="theme-color" content="#2220C1" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-full box-content p-4 md:p-6 pt-12 md:pt-20 pb-12 md:pb-20 md:max-w-3xl 2xl:max-w-4xl m-auto mt-0 md:mt-4 [&>[data-slice-type=highlight]]:mt-12 [&>[data-slice-type=single\_heading]]:mt-12 [&>[data-slice-type=text\_with\_heading]]:mt-6">
        <SliceZone slices={page.data.slices} components={components} />
      </main>
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
