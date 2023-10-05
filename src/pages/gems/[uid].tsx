import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { asLink, asText } from "@prismicio/client";
import Hero from "@/components/Hero";
import Title from "@/components/gem/Title";
import Heading from "@/components/gem/Heading";
import About from "@/components/About";
import Playbooks from "@/components/Playbooks";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Gem({ page }: PageProps) {
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
        <About text={page.data.about} />
        <Playbooks heading="Featured In" list={page.data.slices} />
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
      fetchLinks: "playbook.title,playbook.image",
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
