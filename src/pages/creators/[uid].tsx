import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { Content, asLink } from "@prismicio/client";
import Hero from "@/components/Hero";
import Title from "@/components/creator/Title";
import Nomination from "@/components/creator/Nomination";
import Heading from "@/components/creator/Heading";
import About from "@/components/About";
import PlaybooksGrid from "@/components/PlaybooksGrid";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`${
          page.data.meta_title
            ? page.data.meta_title
            : page.data.first_name && page.data.last_name
            ? `${page.data.first_name} ${page.data.last_name}`
            : page.data.first_name && page.data.first_name
        } | Exceptional ALIEN`}</title>

        <meta
          name="description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.short_description
              ? page.data.short_description
              : ""
          }
        />

        <meta property="og:url" content={`https://exceptionalalien.com/creators/${page.uid}`} />

        <meta
          property="og:title"
          content={`${
            page.data.meta_title
              ? page.data.meta_title
              : page.data.first_name && page.data.last_name
              ? `${page.data.first_name} ${page.data.last_name}`
              : page.data.first_name && page.data.first_name
          } | Exceptional ALIEN`}
        />

        <meta
          property="og:description"
          content={
            page.data.meta_description
              ? page.data.meta_description
              : page.data.short_description
              ? page.data.short_description
              : ""
          }
        />

        <meta
          property="og:image"
          content={
            page.data.meta_image.url
              ? page.data.meta_image.url
              : page.data.hero_image.seo.url
              ? page.data.hero_image.seo.url
              : "https://exceptionalalien.com/img/og.png"
          }
        />
      </Head>

      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6">
        <Title
          firstName={page.data.first_name as string}
          lastName={page.data.last_name as string}
          country={page.data.home_country as string}
        />

        {(page.data.nomination as any).data && (
          <Nomination creator={page.data.nomination as unknown as Content.CreatorDocument} />
        )}

        <Heading
          title={page.data.title as string}
          homeCity={page.data.home_city as string}
          currentCity={page.data.current_city as string}
          ig={page.data.instagram as string}
          other={asLink(page.data.other_social) as string}
          www={asLink(page.data.website) as string}
        />

        <Hero image={page.data.hero_image} />
        <About text={page.data.description} />
        {page.data.slices.length > 0 && <PlaybooksGrid heading="Creator Playbooks" list={page.data.slices} />}
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
    const page = await client.getByUID("creator", params?.uid as string, {
      fetchLinks: "creator.first_name,creator.last_name,creator.profile_image,playbook.title,playbook.image",
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
