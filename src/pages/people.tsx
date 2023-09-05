import { Key } from "react";
import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import Creator, { DataProps } from "@/components/people/Creator";

function FeaturedPeople(props: { featured: any }) {
  return (
    <section className="!pl-0 !pr-0">
      <h3 className="ml-4 md:ml-6">Featured People</h3>

      <div className="slider flex overflow-x-scroll scrolling-touch no-scrollbar snap-x snap-mandatory pr-4 md:pr-6 [&>a]:flex-none [&>a]:snap-start [&>a]:snap-always [&>a]:pl-4 [&>a]:md:pl-6 [&_img]:h-60 [&_img]:md:h-96 [&_img]:w-auto">
        {props.featured.map((item: { creator: FetchLinks }, i: Key) => (
          <Creator key={i} data={item.creator.data} size="mobile" />
        ))}
      </div>
    </section>
  );
}

function AllPeople(props: { featured: any }) {
  return (
    <section>
      <h3>All People</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
        {props.featured.map((item: { creator: FetchLinks }, i: Key) => (
          <Creator key={i} data={item.creator.data} size="thumb" />
        ))}
      </div>
    </section>
  );
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

// Needed to reslove Prismic issue where data type is missing
interface FetchLinks {
  data: DataProps;
}

export default function People({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>Exceptional ALIEN - People</title>
        <meta name="description" content="" />
        <meta property="og:url" content="https://exceptionalalien.com/people" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Exceptional ALIEN - People" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://exceptionalalien.com/img/og.png" />
        <meta name="theme-color" content="#2220C1" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-full pt-12 md:pt-20 pb-12 md:pb-20 [&>section]:mt-8 [&>section]:md:mt-12 [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6 [&_h3]:font-bold [&_h3]:text-xl [&_h3]:md:text-3xl [&_h3]:mb-2 [&_h3]:md:mb-3">
        <FeaturedPeople featured={page.data.featured} />
        <AllPeople featured={page.data.featured} />
      </main>
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page = await client.getSingle("people", {
    fetchLinks: "creator.first_name,creator.last_name,creator.uid,creator.image",
  });

  return {
    props: {
      page,
    },
  };
}
