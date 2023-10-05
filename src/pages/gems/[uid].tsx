import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { asLink, asText } from "@prismicio/client";
import Hero from "@/components/Hero";
import Title from "@/components/gem/Title";
import Heading from "@/components/gem/Heading";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : page.data.title}`}</title>

        <meta
          name="description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
        />

        <meta property="og:url" content={`https://exceptionalalien.com/gems/${page.uid}`} />

        <meta
          property="og:title"
          content={`Exceptional ALIEN - ${page.data.meta_title ? page.data.meta_title : page.data.title}`}
        />

        <meta
          property="og:description"
          content={page.data.meta_description ? page.data.meta_description : asText(page.data.about)}
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

      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6">
        <Title text={page.data.title as string} latLng={page.data.location} />

        <Heading
          title={page.data.title as string}
          placesID={page.data.google_maps_id as string}
          address={page.data.address as string}
          category={page.data.category}
          www={asLink(page.data.website) as string}
        />

        <Hero image={page.data.image} />
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
    const page = await client.getByUID("gem", params?.uid as string, {
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
