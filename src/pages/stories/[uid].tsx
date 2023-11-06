import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createClient } from "@/prismicio";
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Story({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={page.data.meta_description ? page.data.meta_description : page.data.title as string}
        />

        <meta property="og:url" content={`https://exceptionalalien.com/stories/${page.uid}`} />

        <meta
          property="og:title"
          content={`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={page.data.meta_description ? page.data.meta_description : page.data.title as string}
        />

        <meta
          property="og:image"
          content={
            page.data.meta_image.url
              ? page.data.meta_image.url
              : page.data.image.url
                ? page.data.image.url
                : "https://exceptionalalien.com/img/og.png"
          }
        />
      </Head>
      <main>
        <SliceZone slices={page.data.slices} components={components} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps({ params, previewData }: GetStaticPropsContext) {
  try {
    const client = createClient({ previewData });

    const page = await client.getByUID("story", params?.uid as string);

    return {
      props: {
        page,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
