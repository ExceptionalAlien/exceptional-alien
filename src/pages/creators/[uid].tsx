import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { Content, asLink } from "@prismicio/client";
import Hero from "@/components/creator/Hero";
import Title from "@/components/creator/Title";
import Nomination from "@/components/creator/Nomination";
import Heading from "@/components/creator/Heading";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Creator({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>{`Exceptional ALIEN${
          page.data.meta_title
            ? " - " + page.data.meta_title
            : page.data.first_name && page.data.last_name
            ? ` - ${page.data.first_name} ${page.data.last_name}`
            : page.data.first_name
            ? " - " + page.data.first_name
            : ""
        }`}</title>

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
          content={`Exceptional ALIEN${
            page.data.meta_title
              ? " - " + page.data.meta_title
              : page.data.first_name && page.data.last_name
              ? ` - ${page.data.first_name} ${page.data.last_name}`
              : page.data.first_name
              ? " - " + page.data.first_name
              : ""
          }`}
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

        {/* About */}
        <section
          className={`text-ex-grey [&>p]:mt-4 [&>p]:md:float-right [&>p]:md:w-3/4 [&>p>a]:underline hover:[&>p>a]:text-ex-light-grey [&>p>a]:transition-[color] [&>p>a]:ease-in-out [&>p>a]:duration-300 [&>*:nth-child(2)]:md:mt-0 ${
            !page.data.description[0] && "hidden"
          }`}
        >
          <h4 className="font-bold text-xl md:text-2xl md:float-left md:w-1/4 md:pr-6">About</h4>
          <PrismicRichText field={page.data.description} />
          <div className="clear-both"></div>
        </section>
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
