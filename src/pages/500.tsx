import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Head from "next/head";
import { createClient } from "@/prismicio";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Error500({ search }: PageProps) {
  return (
    <>
      <Head>
        <title>Exceptional ALIEN - 500 Error</title>
        <meta name="description" content="Internal server error" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-12 md:max-w-3xl md:pt-16 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <section className="!mt-0">
          <h2 className="text-4xl font-bold md:text-6xl">500 Error</h2>
          <h3 className="text-ex-grey">Internal server error</h3>
        </section>
      </main>

      <SearchBox recommended={search.data.recommended} hidden={true} />
    </>
  );
}

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const search = await client.getSingle("search", {
    fetch: "search.recommended,search.description",
    fetchLinks: "destination.title",
  });

  return {
    props: {
      search,
    },
  };
}
