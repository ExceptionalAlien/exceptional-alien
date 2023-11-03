import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { Content, asText } from "@prismicio/client";
import Viewer from "@/components/playbook/Viewer";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Playbook({ page, search }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${
          page.data.meta_title
            ? page.data.meta_title
            : `${page.data.title} | ${
                (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                  ? `${(page.data.creator as unknown as Content.CreatorDocument).data.first_name} ${
                      (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                    }`
                  : (page.data.creator as unknown as Content.CreatorDocument).data.first_name
              }`
        } | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.description
              ? asText(page.data.description)
              : ""
          }
        />

        <meta property="og:url" content={`https://exceptionalalien.com/travel-playbooks/${page.uid}`} />

        <meta
          property="og:title"
          content={`${
            page.data.meta_title
              ? page.data.meta_title
              : `${page.data.title} | ${
                  (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                    ? `${(page.data.creator as unknown as Content.CreatorDocument).data.first_name} ${
                        (page.data.creator as unknown as Content.CreatorDocument).data.last_name
                      }`
                    : (page.data.creator as unknown as Content.CreatorDocument).data.first_name
                }`
          } | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.description
              ? asText(page.data.description)
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

      <SearchBox recommended={search.data.recommended} hidden={true} />
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

    const search = await client.getSingle("search", {
      fetch: "search.recommended,search.description",
      fetchLinks: "destination.title",
    });

    return {
      props: {
        page,
        search,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
