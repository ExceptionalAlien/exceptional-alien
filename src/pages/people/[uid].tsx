import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Hero from "@/components/creator/Hero";
import Title from "@/components/creator/Title";
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
        <meta name="description" content={page.data.meta_description ?? ""} />
        <meta property="og:url" content={`https://exceptionalalien.com/people/${page.uid}`} />
        <meta
          property="og:title"
          content={`Exceptional ALIEN${page.data.meta_title ? " - " + page.data.meta_title : ""}`}
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
              : page.data.image.seo.url
              ? page.data.image.seo.url
              : "https://exceptionalalien.com/img/og.png"
          }
        />
      </Head>

      <main className="min-h-full pt-12 md:pt-20 pb-12 md:pb-20 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl m-auto [&>section]:mt-8 [&>section]:md:mt-12 [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6">
        <Title firstName={page.data.first_name} lastName={page.data.last_name} country={page.data.home_country} />

        <Heading
          title={page.data.title}
          homeCity={page.data.home_city}
          currentCity={page.data.current_city}
          ig={page.data.instagram}
          other={page.data.other_social}
          www={page.data.website}
        />

        <Hero image={page.data.image} />

        {/* Description */}
        <section
          className={`text-ex-grey [&>p]:mt-4 [&>p]:md:float-right [&>p]:md:w-3/4 [&_a]:underline hover:[&_a]:text-ex-light-grey [&_a]:transition-[color] [&_a]:ease-in-out [&_a]:duration-300 [&>*:nth-child(2)]:md:mt-0 ${
            !page.data.description[0] && "hidden"
          }`}
        >
          <h4 className="font-bold text-2xl md:float-left md:w-1/4 md:pr-6">About</h4>
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
    const page = await client.getByUID("creator", params?.uid as string);

    return {
      props: {
        page,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
