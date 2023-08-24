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

      <main className="min-h-full mt-12 md:mt-20">
        <section>
          <p>{page.data.overview}</p>
        </section>
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
