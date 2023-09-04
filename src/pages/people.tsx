import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import Creator, { DataProps } from "@/components/people/Creator";

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

      <main className="min-h-full pt-12 md:pt-20 pb-12 md:pb-20 [&>section]:mt-8 [&>section]:md:mt-12 [&>section]:pl-4 [&>section]:md:pl-6 [&>section]:pr-4 [&>section]:md:pr-6">
        <section className="">
          <h3 className="font-bold text-xl md:text-3xl">Featured People</h3>

          <div className="mt-2 md:mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {page.data.featured.map((item, i) => (
              <Creator key={i} data={(item.creator as FetchLinks).data} />
            ))}
          </div>
        </section>
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
