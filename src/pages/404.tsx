import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { createClient } from "@/prismicio";
import SearchBox from "@/components/shared/SearchBox";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Error404({ search }: PageProps) {
  return (
    <>
      <main className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <section>
          <h2 className="text-3xl font-bold md:text-6xl">404 Error</h2>
          <h3 className="text-ex-grey">Page not found</h3>
        </section>
      </main>

      <SearchBox description={search.data.description} recommended={search.data.recommended} hidden={true} />
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
