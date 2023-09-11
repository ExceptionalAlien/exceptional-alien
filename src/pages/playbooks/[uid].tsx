import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : page.data.title}`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content={`https://exceptionalalien.com/playbooks/${page.uid}`} />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : page.data.title}`}
        />

        <meta
          property="og:description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.description[0]
              ? (page.data.description[0] as any).text
              : ""
          }
        />

        <meta
          property="og:image"
          content={
            page.data.meta_image.url
              ? page.data.meta_image.url
              : page.data.image.seo.url
              ? page.data.image.seo.url
              : "https://exceptionalalien.com/img/og.png"
          }
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
    const page = await client.getByUID("playbook", params?.uid as string, {
      fetchLinks: "creator.first_name,creator.last_name,creator.profile_image",
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
