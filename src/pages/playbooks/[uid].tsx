import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import Viewer from "@/components/playbook/Viewer";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbook({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${
          page.data.meta_title
            ? page.data.meta_title
            : `${page.data.title} | ${(page.data.creator as any).data.first_name} ${
                (page.data.creator as any).data.last_name
              }`
        } | Exceptional ALIEN`}</title>
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content={`https://exceptionalalien.com/playbooks/${page.uid}`} />

        <meta
          property="og:title"
          content={`${
            page.data.meta_title
              ? page.data.meta_title
              : `${page.data.title} | ${(page.data.creator as any).data.first_name} ${
                  (page.data.creator as any).data.last_name
                }`
          } | Exceptional ALIEN`}
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
              : page.data.image.url
              ? page.data.image.url
              : "https://exceptionalalien.com/img/og.png"
          }
        />
      </Head>

      <main className="!pb-0">
        <Viewer data={page.data} />
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

    const page = await client.getByUID("playbook", params?.uid as string, {
      fetchLinks:
        "creator.first_name,creator.last_name,creator.profile_image,creator.uid,gem.title,gem.image,gem.category,gem.address,gem.location,gem.google_maps_id,gem.description,destination.title",
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
