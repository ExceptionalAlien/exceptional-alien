import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from "next";
import Image from "next/image";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import TabHeading from "@/components/TabHeading";
import { shimmer, toBase64 } from "@/utils/shimmer";

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

      <main className="min-h-full pt-12 md:pt-20 pb-12 md:pb-20 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl m-auto [&>section]:mt-8 [&>section]:md:mt-12 [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6">
        {/* Heading */}
        <section>
          <h2 className="font-bold text-4xl md:text-6xl">
            {page.data.first_name} {page.data.last_name?.toUpperCase()}
          </h2>
        </section>

        {/* Image */}
        <section className="!pl-0 !pr-0 md:!pl-6 md:!pr-6">
          <Image
            src={page.data.image.url as string}
            alt={page.data.image.alt as string}
            width={page.data.image.dimensions?.width as number}
            height={page.data.image.dimensions?.height as number}
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(page.data.image.dimensions?.width as number, page.data.image.dimensions?.height as number)
            )}`}
          />
        </section>

        {/* Description */}
        <section
          className={`text-ex-grey [&>p]:mt-4 [&>p]:md:float-right [&>p]:md:w-3/4 [&_a]:underline hover:[&_a]:text-ex-light-grey [&_a]:transition-[color] [&_a]:duration-300 [&>*:nth-child(2)]:md:mt-0 ${
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
