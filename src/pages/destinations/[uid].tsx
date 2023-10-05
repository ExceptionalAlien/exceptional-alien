import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta property="og:url" content={`https://exceptionalalien.com/gems/${page.uid}`} />

        <meta
          property="og:title"
          content={`${page.data.meta_title ? page.data.meta_title : page.data.title} | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta
          property="og:image"
          content={page.data.meta_image.url ? page.data.meta_image.url : "https://exceptionalalien.com/img/og.png"}
        />
      </Head>

      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6"></main>
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
    const page = await client.getByUID("destination", params?.uid as string, {
      fetchLinks: "",
    });

    return {
      props: {
        page,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
